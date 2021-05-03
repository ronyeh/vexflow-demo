import TestInfo from "./TestInfo";
import TestFunction from "./TestFunction";

namespace Tests_Registry {
    let VF;
    let f;
    let e;
    let s;
    let r;
    let onClickHandler;

    export function getInfo(): TestInfo {
        const info = new TestInfo();
        info.title = "Registry";
        const tests = [test0, test1, test2];
        info.numTests = tests.length;
        info.pageDescription = <div>Hello</div>;
        info.testDescriptions = tests.map((test) => test.description ?? "");
        return info;
    }

    export function runTest(num: number) {
        VF = Vex.Flow;
        r = new VF.Registry();
        VF.Registry.enableDefaultRegistry(r);
        f = new VF.Factory({ renderer: { elementId: "stave", width: 1100, height: 550 } });
        e = f.EasyScore({ throwOnError: true });
        s = f.System();
        s.context.scale(2, 2);
        switch (num) {
            case 0:
            default:
                test0();
                break;
            case 1:
                test1();
                break;
            case 2:
                test2();
                break;
        }
        f.draw();
    }

    export function cleanup() {
        VF.Registry.disableDefaultRegistry();
    }

    export function onClick() {
        if (onClickHandler) {
            onClickHandler();
        }
    }

    const test0: TestFunction = () => {
        onClickHandler = null;
        let stave = s.addStave({
            voices: [e.voice(e.notes("A4/q, A4[id='note-1']"), { time: "2/4" })],
        });

        const n = r.getElementById("note-1"); // StaveNote!
        n.setStyle({
            strokeStyle: "cyan",
            fillStyle: "purple",
        });

        onClickHandler = () => {
            console.log(n);
        };

        setTimeout(() => {
            // returns a SVG group. only available after factory.draw() is called.
            const svgElement = document.getElementById("vf-note-1");
            console.log(svgElement);
        }, 1000);
    };
    test0.description = "Set the stroke and fill style.";

    const test1: TestFunction = () => {
        s.addStave({
            voices: [e.voice(e.notes("C#5/q, B4, A4, G#4[stem='up',id='note-39412']"))],
        })
            .addClef("treble")
            .addTimeSignature("4/4");

        s.addStave({
            voices: [e.voice(e.notes("C#3/q, B2, A2, G#2", { clef: "bass" }))],
        })
            .addClef("bass")
            .addTimeSignature("4/4");

        onClickHandler = () => {
            const n1 = r.getElementById("note-39412"); // StaveNote!
            n1.setStyle({
                fillStyle: "#F00",
            });
            const n2 = r.getElementById("auto1015"); // StaveNote!
            f.draw();
        };
    };
    test1.description = "Two staves. Set fillStyle.";

    const test2: TestFunction = () => {
        let stave = s.addStave({
            voices: [e.voice(e.notes("C4/q[id='note-0'], A4[stem='up',id='note-1']"), { time: "2/4" })],
        });

        const n0 = r.getElementById("note-0"); // StaveNote!
        n0.setStyle({
            fillStyle: "#FF0000",
        });
        n0.addClass("awesome-note");

        const n1 = r.getElementById("note-1"); // StaveNote!
        n1.setStyle({
            fillStyle: "#00FF00",
        });
        n1.addClass("awesome-note");

        onClickHandler = () => {
            const n = r.getElementById("note-0"); // StaveNote!
            console.log("Same Note?", n === n0);
        };
    };
    test2.description = "addClass and getElementById";
}

export default Tests_Registry;
