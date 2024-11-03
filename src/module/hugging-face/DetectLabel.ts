import Makko from "../../Makko";
import HuggingFace from "../HuggingFace";

interface ClassificationResult {
    sequence: string;
    labels: string[];
    scores: number[];
}

class DetectLabel {
    private readonly modelName: string;

    constructor(modelName: string) {
        this.modelName = modelName;
    }

    async detect(input: string | string[], labels?: string[]): Promise<string> {
        // @ts-ignore
        const classificationResults = await HuggingFace.hf.zeroShotClassification({
            model: this.modelName,
            inputs: input,
            parameters: { candidate_labels: labels || [] }
        })

        Makko.getLogger().info(JSON.stringify(classificationResults, null, 4))
        return this.findBestLabel(classificationResults);
    }

    /**
     * Find the best classification results
     * @param results
     * @private
     */
    private findBestLabel(results: ClassificationResult[]): string {
        let bestLabel = "";
        let highestScore = -Infinity;

        for (const result of results) {
            const maxScore = Math.max(...result.scores);
            if (maxScore > highestScore) {
                highestScore = maxScore;
                bestLabel = result.labels[result.scores.indexOf(maxScore)];
            }
        }

        return bestLabel;
    }

}

export default DetectLabel;

