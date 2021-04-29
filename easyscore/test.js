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

    beforeUnmount() {},

    methods: {},
};

const app = Vue.createApp(AppRoot);

app.mount("#app");

//////////////////////////////////////////////////////////////////////////////////////////////////
// VexFlow - Draw the test notes.

function onVexFlowLoaded() {
    drawStave();
}

let vf;
let score;
let system;

function drawStave() {
    const VF = Vex.Flow;

    // Create an SVG renderer and attach it to the DIV element named "boo".
    vf = new VF.Factory({ renderer: { elementId: "stave", width: 800, height: 400 } });
    score = vf.EasyScore();
    system = vf.System();

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
        case 4:
            test4();
            break;
    }

    // We can change the CSS style of a note!
    // document.getElementById("vf-note-id-39412").style.opacity = 0.3;
    // document.querySelector("#vf-note-id-39412 .vf-stem path").style.stroke = "red"
    // document.querySelector("#vf-note-id-39412 .vf-notehead path").style.fill = "cyan"
    // document.querySelector("#vf-note-id-39412 .vf-modifiers path").style.fill = "magenta"

    vf.draw();
}

function test1() {
    console.log("TEST 1");

    system.addStave({
        voices: [score.voice(score.notes("C5/w"))],
    });
}

function test2() {
    console.log("TEST 2");
    system
        .addStave({
            voices: [score.voice(score.notes("C#5/q, B4, A4, G#4[stem='up',id='note-id-39412']"))],
        })
        .addClef("treble")
        .addTimeSignature("4/4");

    system
        .addStave({
            voices: [score.voice(score.notes("C#3/q, B2, A2, G#2", { clef: "bass" }))],
        })
        .addClef("bass")
        .addTimeSignature("4/4");
}

function test3() {}

function test4() {}
