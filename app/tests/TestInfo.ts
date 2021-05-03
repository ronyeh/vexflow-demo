export default class TestInfo {
    numTests: number;
    title: string;
    descriptions?: string[];

    getTitle() {
        return this.title;
    }

    getDescription(testNum: number) {
        if (this.descriptions && this.descriptions.length > testNum && testNum >= 0) {
            return this.descriptions[testNum];
        } else {
            return "";
        }
    }
}
