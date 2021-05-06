import TestFunction from "./TestFunction";
import TestInfo from "./TestInfo";

namespace Tests_Parser {
    const tests = [test0];

    export function getInfo() {
        const info = new TestInfo();
        info.title = "Parser";
        info.numTests = tests.length;
        info.testDescriptions = tests.map((test) => (test as TestFunction).description ?? "");
        return info;
    }

    function getTest(num: number) {
        if (isNaN(num) || num < 0 || num >= tests.length) {
            return test0;
        } else {
            return tests[num];
        }
    }

    export function runTest(num: number) {
        getTest(num)(); // RUN THE TEST!
    }

    export function getDescriptionForTest(num: number) {
        return getTest(num).description;
    }

    function test0() {
        let VF = Vex.Flow;

        let grammar = new MicroScore();
        let parser = new VF.Parser(grammar);
        let line = "40 42 44 45 47 49 51 52";
        let results = parser.parse(line); // Individual Notes: C Major Scale
        console.log("Line: " + line);
        console.log("Successful Parse? " + results.success);
        console.dir(results);
        console.log("");

        line = "[40.44.47] [45.49.52] [47.51.54] [49.52.56]";
        results = parser.parse(line); // Chord Progression: C-major F-major G-major A-minor
        console.log("Line: " + line);
        console.log("Successful Parse? " + results.success);
        console.dir(results);
        console.log("");

        line = "40 [40.44.47] 45 47 [44.47.51]";
        results = parser.parse(line); // Mixed Notes and Chords: C4 [Cmajor] F4 G4 [Eminor]
        console.log("Line: " + line);
        console.log("Successful Parse? " + results.success);
        console.dir(results);
        console.log("");
    }
    test0.description = `MicroScore Grammar & Flattening Results`;
}

// A series of piano key numbers (Middle C == 40) separated by whitespace.
//   C Major Scale => 40 42 44 45 47 49 51 52
// A chord is 2 or more piano key numbers surrounded by BRACKETS and separated by PERIODS
//   C Major == [40.44.47]
//   C-major F-major G-major A-minor chord progression => [40.44.47] [45.49.52] [47.51.54] [49.52.56]
class MicroScore {
    begin() {
        return this.BEGIN;
    }

    BEGIN() {
        return {
            expect: [this.ITEM, this.MAYBE_MORE_ITEMS, this.EOL],
            run: (state) => console.dir(state.matches),
        };
    }

    ITEM() {
        return { expect: [this.PIANO_KEY_NUMBER, this.CHORD], or: true };
    }

    MAYBE_MORE_ITEMS() {
        return {
            expect: [this.ITEM],
            zeroOrMore: true,
        };
    }

    PIANO_KEY_NUMBER() {
        return { expect: [this.NUM], oneOrMore: true };
    }

    // A chord is 2 or more piano key numbers surrounded by BRACKETS and separated by PERIODS
    // C Major == [40.44.47]
    CHORD() {
        return {
            expect: [this.LEFT_BRACKET, this.PIANO_KEY_NUMBER, this.MORE_CHORD_PARTS, this.RIGHT_BRACKET],
        };
    }

    MORE_CHORD_PARTS() {
        return {
            expect: [this.PERIOD, this.PIANO_KEY_NUMBER],
            oneOrMore: true,
        };
    }

    NUM() {
        return { token: "\\d+" };
    }

    WHITESPACE() {
        return { token: "\\s+" };
    }

    PERIOD() {
        return { token: "\\." };
    }

    LEFT_BRACKET() {
        return { token: "\\[" };
    }

    RIGHT_BRACKET() {
        return { token: "\\]" };
    }

    EOL() {
        return { token: "$" };
    }
}

export default Tests_Parser;
