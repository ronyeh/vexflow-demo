//////////////////////////////////////////////////////////////////////////////////////////////////
// Handle the query params.
const urlParams = new URLSearchParams(window.location.search);
let vexVersion = urlParams.get("vex_version"); // vexflow.version.number || patched
if (vexVersion !== "patched") {
    vexVersion = "3.0.9";
}
let font = urlParams.get("font"); // bravura (default) || petaluma || gonville
if (font !== "petaluma" && font !== "gonville") {
    font = "bravura";
}
let backend = urlParams.get("backend"); // svg (default) | canvas
if (!isCanvasBackend()) {
    backend = "svg";
}
let scale = parseInt(urlParams.get("scale")); // 1, 2, 4 (default), 8, 16
if (isNaN(scale) || scale < 1) {
    scale = 4;
}
let visualDebug = urlParams.get("visual_debug"); // true || false (default)
if (visualDebug === "true") {
    visualDebug = true;
} else {
    visualDebug = false;
}
let offsetX = parseInt(urlParams.get("offset_x")); // integer >= 0
if (isNaN(offsetX) || offsetX < 0) {
    offsetX = 0;
}
let offsetY = parseInt(urlParams.get("offset_y")); // integer >= 0
if (isNaN(offsetY) || offsetY < 0) {
    offsetY = 0;
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Support both SVG and Canvas backends for visual testing.

function isCanvasBackend() {
    return backend === "canvas";
}

function getBackendType() {
    const VF = Vex.Flow;
    if (isCanvasBackend()) {
        return VF.Renderer.Backends.CANVAS;
    } else {
        return VF.Renderer.Backends.SVG;
    }
}

function getBackendElement() {
    if (isCanvasBackend()) {
        return `<canvas id="stave"></canvas>`;
    } else {
        return `<div id="stave"></div>`;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Allow the user to copy or edit the URL parameters to help with debugging.

function reload() {
    window.location.href = getURLWithCurrentQueryParams();
}

function getURLWithCurrentQueryParams() {
    return (
        window.location.protocol + "//" + window.location.host + window.location.pathname + `?vex_version=${vexVersion}&font=${font}&scale=${scale}&context_type=${backend}&visual_debug=${visualDebug}&offset_x=${offsetX}&offset_y=${offsetY}`
    );
}

// Save the offsetX and offsetY information to the browser's address bar.
// This allows us to transfer the offsetX / offsetY parameters to a different page, so we can align the values properly.
function saveScrollOffsets() {
    offsetX = document.querySelector(".stave-container").scrollLeft;
    offsetY = window.scrollY;
    const url = getURLWithCurrentQueryParams();
    window.history.replaceState({ path: url }, "", url);
}

function restoreScrollOffsets() {
    if (offsetX > 0) {
        document.querySelector(".stave-container").scrollLeft = offsetX;
    }
    if (offsetY > 0) {
        window.scroll(0, offsetY);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Vue.js :-)

const AppRoot = {
    data() {
        return {
            info: `VexFlow: ${vexVersion}, Font: ${font}, Scale: ${scale}x, Backend: ${backend}`,
        };
    },
    mounted() {
        switch (vexVersion) {
            case "patched":
                addScriptTag("/js/vexflow-patched.js?" + Math.random(), onVexFlowLoaded);
                break;
            default:
                // 3.0.9
                addScriptTag(`https://unpkg.com/vexflow@${vexVersion}/releases/vexflow-debug.js`, onVexFlowLoaded);
                break;
        }

        document.title = "Offsets - " + vexVersion;
    },

    created() {
        window.addEventListener("scroll", saveScrollOffsets);
    },

    beforeUnmount() {
        window.removeEventListener("scroll", saveScrollOffsets);
    },

    methods: {
        reloadWithScale(s) {
            scale = s;
            reload();
        },

        reloadWithBackend(b) {
            backend = b;
            reload();
        },

        reloadWithVisualDebug(flag) {
            visualDebug = flag;
            reload();
        },

        saveScrollOffsets: saveScrollOffsets,
    },
};

const app = Vue.createApp(AppRoot);

app.component("stave", {
    template: getBackendElement(),
});

app.component("spacer", {
    template: `<div style="display:inline-block; width:40px"></div>`,
});

app.mount("#app");

//////////////////////////////////////////////////////////////////////////////////////////////////
// VexFlow - Draw the test notes.

function onVexFlowLoaded() {
    drawStave();
    restoreScrollOffsets();
}

function drawStave() {
    const VF = Vex.Flow;
    switch (font) {
        case "bravura":
        default:
            VF.DEFAULT_FONT_STACK = [VF.Fonts.Bravura, VF.Fonts.Gonville, VF.Fonts.Custom];
            break;
        case "petaluma":
            VF.DEFAULT_FONT_STACK = [VF.Fonts.Petaluma, VF.Fonts.Gonville, VF.Fonts.Custom];
            break;
        case "gonville":
            VF.DEFAULT_FONT_STACK = [VF.Fonts.Gonville, VF.Fonts.Bravura, VF.Fonts.Custom];
            break;
    }
    const f = new VF.Factory({
        renderer: { elementId: "stave", width: 530 * scale, height: 240 * scale, backend: getBackendType() },
    });

    const score = f.EasyScore();
    const system = f.System();

    const n0 = score.notes("E5/16, C5/8, G5/4, C5/2, C5/32, C5", { stem: "up" });
    const n1 = score.notes("F4/16, A4/8, D4/4, A4/2, D4/32, D4", { stem: "down" });
    const n2 = score.notes("C3/4, E3, B3/8, B3/4, E3/8", { clef: "bass", stem: "up" });
    const n3 = score.notes("F2/2, E3/16, E3, C3/32, C3, C3/16, F2, F2, F2, F2", { clef: "bass", stem: "down" });

    const v0 = score.voice(n0);
    const v1 = score.voice(n1);
    const v2 = score.voice(n2);
    const v3 = score.voice(n3);

    system
        .addStave({
            voices: [v0, v1],
        })
        .addClef("treble")
        .addTimeSignature("4/4");

    const allNotes = [...n0, ...n1, ...n2, ...n3];

    if (visualDebug) {
        const debugStyle = {
            fillStyle: "rgba(255,0,0,0.5)",
            strokeStyle: "rgba(0,0,255,0.5)",
        };
        allNotes.forEach((staveNote) => {
            staveNote.setStyle(debugStyle);
        });
    }

    system
        .addStave({
            voices: [v2, v3],
            spaceAbove: -4, // make the grand staff shorter so we can see more while debugging
        })
        .addClef("bass")
        .addTimeSignature("4/4");

    system.addConnector();

    f.context.scale(scale, scale);
    f.draw();
}
