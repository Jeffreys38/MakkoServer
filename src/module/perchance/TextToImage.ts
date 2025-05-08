import axios from 'axios';
import * as fs from 'fs';
import { sample } from 'lodash';

import { styles } from './module/Styles';
import Makko from "../../../src/Makko";
import KeyFinder from './module/KeyFinder';

interface ImageGenerationResponse {
    filename: string;
    prompt: string;
    negative_prompt: string;
}

class TextToImage {
    private static createUrl = 'https://image-generation.perchance.org/api/generate';
    private static downloadUrl = 'https://image-generation.perchance.org/api/downloadTemporaryImage';

    public static async* generateImage({
                                           baseFilename = '',
                                           amount = 1,
                                           prompt = 'RANDOM',
                                           promptSize = 10,
                                           negativePrompt = '(worst quality, low quality:1.3), , low-quality, deformed, text, poorly drawn, hilariously bad drawing, bad 3D render',
                                           style = 'anime',
                                           resolution = '512x768',
                                           guidanceScale = 7
                                       }: {
        baseFilename?: string;
        amount?: number;
        prompt?: string;
        promptSize?: number;
        negativePrompt?: string;
        style?: string;
        resolution?: string;
        guidanceScale?: number;
    }): AsyncGenerator<ImageGenerationResponse> {
        let styleChoice = style === 'RANDOM' ? sample(Object.keys(styles)) : style;
        if (!styleChoice || !styles[styleChoice]) {
            throw new Error(`Style choice ${styleChoice} was not recognized. Check styles.ts.`);
        }

        let [promptStyle, negativePromptStyle] = styles[styleChoice];
        promptStyle = promptStyle.replace(/{}/, prompt)

        // Check prompt
        Makko.getLogger().info("Prompt: " + promptStyle);
        Makko.getLogger().info("Negative Prompt: " + negativePromptStyle);

        let promptQuery = encodeURIComponent(promptStyle);
        let negativePromptQuery = encodeURIComponent(negativePromptStyle);
        const userKey = await KeyFinder.getKey();

        for (let idx = 1; idx <= amount; idx++) {
            const requestId = Math.random().toString();
            const cacheBust = Math.random().toString();

            const createParams = {
                prompt: promptQuery,
                negativePrompt: negativePromptQuery,
                userKey,
                __cache_bust: cacheBust,
                seed: '-1',
                resolution: resolution,
                guidanceScale: String(guidanceScale),
                channel: 'ai-text-to-image-generator',
                subChannel: 'public',
                requestId
            };

            const createResponse = await axios.get(TextToImage.createUrl, {params: createParams});

            if (createResponse.data && createResponse.data.includes) {
                if (createResponse.data.includes('invalid_key')) {
                    throw new Error('Image could not be generated (invalid key).');
                }
            }

            let imageId: string = "";
            let exitFlag = false;
            while (!exitFlag) {
                try {
                    imageId = createResponse.data.imageId;
                    exitFlag = true;
                } catch (error) {
                    Makko.getLogger().info('Waiting for previous request to finish...');
                    await new Promise(resolve => setTimeout(resolve, 8000));
                    const retryResponse = await axios.get(TextToImage.createUrl, {params: createParams});
                    createResponse.data = retryResponse.data;
                }
            }

            const downloadResponse = await axios.get(TextToImage.downloadUrl, {
                params: {imageId},
                responseType: 'arraybuffer'
            });

            const generatedDir = 'generated-pictures';
            fs.mkdirSync(generatedDir, {recursive: true});

            const filename = baseFilename
                ? `${generatedDir}/${baseFilename}${idx}.jpeg`
                : `${generatedDir}/${imageId}.jpeg`;

            fs.writeFileSync(filename, Buffer.from(downloadResponse.data));

            Makko.getLogger().info(`Created picture {}/{} ({})`, idx, amount, filename);

            // @ts-ignore
            yield {
                filename,
                prompt,
                negative_prompt: negativePrompt
            };
        }
    }
}

export default TextToImage;
