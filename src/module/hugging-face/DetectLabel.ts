import prodia from '@api/prodia';
import {IDetection, Sentiment} from "../../interfaces/IAI";
import LoggerFactory from "../../util/LoggerFactory";

interface ClassificationResult {
    sequence: string;
    labels: string[];
    scores: number[];
}

class DetectLabel implements IDetection {
    private hf: any;
    private readonly modelName: string;

    constructor(hf: any, modelName: string) {
        this.hf = hf;
        this.modelName = modelName;

        LoggerFactory.info(`DetectLabel initialized with model: ${modelName}`);
    }


    async detect(input: string | string[], labels?: string[]): Promise<Sentiment[] | string> {
        const classificationResults = await this.hf.zeroShotClassification({
            model: this.modelName,
            inputs: input,
            parameters: { candidate_labels: labels }
        })

        LoggerFactory.info(JSON.stringify(classificationResults, null, 4))
        return this.findBestLabel(classificationResults);
    }

    /**
     * Find the best classification results
     * @param results
     * @private
     */
    private findBestLabel(results: ClassificationResult[]): string {
        for (const result of results) {
            const maxScore = Math.max(...result.scores);
            const secondMaxScore = Math.max(...result.scores.filter(score => score !== maxScore));

            return result.labels[result.scores.indexOf(maxScore)];
        }
        throw new Error("No best label found");
    }
}

export default DetectLabel;

