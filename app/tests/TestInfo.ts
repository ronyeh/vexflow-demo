export default class TestInfo {
    title: string;
    numTests: number;

    pageDescription?: JSX.Element;
    testDescriptions?: string[];

    getTitle() {
        return this.title;
    }

    getTestDescription(testNum: number) {
        if (this.testDescriptions && this.testDescriptions.length > testNum && testNum >= 0) {
            return this.testDescriptions[testNum];
        } else {
            return "";
        }
    }
}
