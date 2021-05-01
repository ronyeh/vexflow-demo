//////////////////////////////////////////////////////////////////////////////////////////////////
// Get query params from main.js
let { vexVersion, scriptSRC } = getVexURL();

let testNumber = parseInt(urlParams.get("test_number"));
if (isNaN(testNumber)) {
    testNumber = 0;
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Vue.js :-)
const AppRoot = {
    data() {
        return {
            info: `VexFlow: ${vexVersion}`,
        };
    },
    mounted() {
        document.title = `Test ${testNumber}` + " - " + vexVersion;
        addScriptTag(scriptSRC, onVexFlowLoaded);
    },

    beforeUnmount() {
        VF.Registry.disableDefaultRegistry();
    },

    methods: {
        test_onClick: () => {
            testButtonHandler();
        },
    },
};

const app = Vue.createApp(AppRoot);

app.mount("#app");

//////////////////////////////////////////////////////////////////////////////////////////////////
// VexFlow - Draw the test notes.

function onVexFlowLoaded() {
    drawStave();
}

let VF;
let vf;
let score;
let system;
let n1, n2;
let testButtonHandler;

function drawStave() {
    VF = Vex.Flow;

    switch (testNumber) {
        case 1:
        default:
            test1();
            break;
        case 2:
            test2();
            break;
        case 3:
            test3();
            break;
    }

    vf.draw();

    // returns a SVG group. only available after vf.draw() is called.
    // document.getElementById("vf-note-39412");
}

function test1() {
    console.log("TEST 1");

    var registry = new VF.Registry();
    VF.Registry.enableDefaultRegistry(registry);

    vf = new VF.Factory({ renderer: { elementId: "stave", width: 1100, height: 550 } });
    score = vf.EasyScore({ throwOnError: true });
    system = vf.System();
    system.context.scale(2, 2);
    system
        .addStave({
            voices: [score.voice(score.notes("C#5/q, B4, A4, G#4[stem='up',id='note-39412']"))],
        })
        .addClef("treble")
        .addTimeSignature("4/4");

    system
        .addStave({
            voices: [score.voice(score.notes("C#3/q, B2, A2, G#2", { clef: "bass" }))],
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
        vf.draw();
    };
}

function test2() {
    console.log("TEST 2");

    var registry = new VF.Registry();
    VF.Registry.enableDefaultRegistry(registry);

    vf = new VF.Factory({ renderer: { elementId: "stave", width: 1100, height: 550 } });
    score = vf.EasyScore({ throwOnError: true });
    system = vf.System();
    system.context.scale(2, 2);
    let stave = system.addStave({
        voices: [score.voice(score.notes("C4/q, G4[stem='up',id='note-39412']"), { time: "2/4" })],
    });

    const n1 = registry.getElementById("note-39412"); // StaveNote!
    n1.setStyle({
        fillStyle: "#F00",
    });
    n1.addClass("suck");
    console.log(n1);


    testButtonHandler = () => {
        let n = registry.getElementById("note-39412"); // StaveNote!
        console.log(n.hasClass("suck"));
        n = registry.getElementById("auto1001"); // StaveNote!
        console.log(n);
        console.log(n.hasClass("suck"));
    };
}

// Taken from https://raw.githubusercontent.com/0xfe/vexflow/master/tests/bach_tests.js
function test3() {
    console.log("TEST 3");
}
