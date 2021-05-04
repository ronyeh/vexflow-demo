import TestInfo from "./TestInfo";
import TestFunction from "./TestFunction";

namespace Tests_Registry {
    let VF;
    let f;
    let e;
    let s;
    let registry;
    let onClickHandler;

    export function getInfo(): TestInfo {
        const info = new TestInfo();
        info.title = "Registry";
        const tests = [test0, test1, test2];
        info.numTests = tests.length;
        info.pageDescription = <div></div>;
        info.testDescriptions = tests.map((test) => test.description ?? "");
        return info;
    }

    export function runTest(num: number) {
        VF = Vex.Flow;
        registry = new VF.Registry();
        window["registry"] = registry;
        VF.Registry.enableDefaultRegistry(registry);
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
            voices: [e.voice(e.notes("A4/q[id='note-0'], A4[id='note-1']"), { time: "2/4" })],
        });

        const n0 = registry.getElementsByAttribute("id", "note-0")[0];
        console.log(n0);

        const n1 = registry.getElementById("note-1"); // StaveNote!
        console.log(n1);
        n1.setStyle({
            strokeStyle: "cyan",
            fillStyle: "purple",
        });

        onClickHandler = () => {
            console.log("CLICKED");
        };

        setTimeout(() => {
            // returns a SVG group. only available after factory.draw() is called.
            const svgElement = document.getElementById("vf-note-1");
            // console.log(svgElement);
        }, 1000);
    };

    test0.description = `Set the stroke and fill style.`;

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
            const n1 = registry.getElementById("note-39412"); // StaveNote!
            n1.setStyle({
                fillStyle: "#F00",
            });
            const n2 = registry.getElementById("auto1015"); // StaveNote!
            f.draw();
        };
    };

    test1.description = `Two staves. Set fillStyle.`;

    const test2: TestFunction = () => {
        let stave = s.addStave({
            voices: [e.voice(e.notes("C4/q[id='note-0'], A4[stem='up',id='note-1']"), { time: "2/4" })],
        });

        const n0 = registry.getElementById("note-0"); // StaveNote!
        n0.addClass("awesome-note");

        const n1 = registry.getElementById("note-1"); // StaveNote!
        n1.addClass("awesome-note");
        n1.addClass("funny-note");

        console.dir(registry.index);
        onClickHandler = () => {
            console.log("Same Note?", registry.getElementById("note-0") === n0);
            n0.setAttribute("id", "abc");
            n0.setAttribute("id", "def");
            n0.setAttribute("id", "tuv");
            n0.setAttribute("id", "xyz");
            console.log(registry.getElementById("note-0")); // undefined
            console.dir(registry.index.id);
            console.dir(registry.index.class);
        };
    };

    test2.description = `getElementById. addClass. click to: change element id.`;
}

export default Tests_Registry;
