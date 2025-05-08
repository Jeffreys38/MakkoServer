import TextToImage from '../perchance/TextToImage';

// https://image-generation.perchance.org/api/verifyUser?thread=2&__cacheBust=0.26325166217456586
const prompt = "A cute girl"
describe('Generator Class', () => {

    it('should generate images correctly', async () => {
        const images = [];
        const tmp = TextToImage.generateImage({
            baseFilename: 'test_image',
            amount: 1,
            prompt: prompt,
        });

        for await (const generatedImage of tmp) {
            images.push(generatedImage);
        }

        // Validate the results
        expect(images.length).toBe(1);
        expect(images[0].filename).toBe('generated-pictures/test_image1.jpeg');
        expect(images[0].prompt).toBeDefined();
        expect(images[0].negative_prompt).toBeDefined();
    }, 90000);
});
