namespace Tests {
    export const TITLE = "Registry";
    export const NUM_TESTS = 3;

    let VF;
    let factory;
    let easyscore;
    let system;
    let testButtonHandler;
    let registry;

    export function runTest(num: number) {
        VF = Vex.Flow;
        registry = new VF.Registry();
        VF.Registry.enableDefaultRegistry(registry);
        factory = new VF.Factory({ renderer: { elementId: "stave", width: 1100, height: 550 } });
        easyscore = factory.EasyScore({ throwOnError: true });
        system = factory.System();
        system.context.scale(2, 2);
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
        factory.draw();
    }

    export function cleanup() {
        VF.Registry.disableDefaultRegistry();
    }

    export function onClick() {
        if (testButtonHandler) {
            testButtonHandler();
        }
    }

    function test0() {
        testButtonHandler = null;
        console.log("TEST 0");
        let stave = system.addStave({
            voices: [easyscore.voice(easyscore.notes("A4/q, A4[id='note-1']"), { time: "2/4" })],
        });

        const n = registry.getElementById("note-1"); // StaveNote!
        n.setStyle({
            strokeStyle: "cyan",
            fillStyle: "purple",
        });

        testButtonHandler = () => {
            console.log(n);
        };

        setTimeout(() => {
            // returns a SVG group. only available after factory.draw() is called.
            const svgElement = document.getElementById("vf-note-1");
            console.log(svgElement);
        }, 1000);
    }

    function test1() {
        console.log("TEST 1");
        system
            .addStave({
                voices: [easyscore.voice(easyscore.notes("C#5/q, B4, A4, G#4[stem='up',id='note-39412']"))],
            })
            .addClef("treble")
            .addTimeSignature("4/4");

        system
            .addStave({
                voices: [easyscore.voice(easyscore.notes("C#3/q, B2, A2, G#2", { clef: "bass" }))],
            })
            .addClef("bass")
            .addTimeSignature("4/4");

        testButtonHandler = () => {
            const n1 = registry.getElementById("note-39412"); // StaveNote!
            n1.setStyle({
                fillStyle: "#F00",
            });
            const n2 = registry.getElementById("auto1015"); // StaveNote!
            // {
            //     shadowColor?: string;
            //     shadowBlur?: string;
            //     fillStyle?: string;
            //     strokeStyle?: string;
            //     lineWidth?: number;
            //   }
            factory.draw();
        };
    }

    function test2() {
        console.log("TEST 2");

        let stave = system.addStave({
            voices: [easyscore.voice(easyscore.notes("C4/q[id='note-0'], A4[stem='up',id='note-1']"), { time: "2/4" })],
        });

        const n0 = registry.getElementById("note-0"); // StaveNote!
        n0.setStyle({
            fillStyle: "#FF0000",
        });
        n0.addClass("awesome-note");

        const n1 = registry.getElementById("note-1"); // StaveNote!
        n1.setStyle({
            fillStyle: "#00FF00",
        });
        n1.addClass("awesome-note");

        testButtonHandler = () => {
            const n = registry.getElementById("note-0"); // StaveNote!
            console.log("Same Note?", n === n0);
        };
    }
}

export default Tests;
