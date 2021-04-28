const NUM_NOTE_GROUPS = 8;

//////////////////////////////////////////////////////////////////////////////////////////////////
// Handle the query params.
const urlParams = new URLSearchParams(window.location.search);
let vexVersion = urlParams.get("vex_version"); // vexflow.version.number || current
let scriptSRC = "";
if (vexVersion === null || vexVersion.startsWith("3")) {
    vexVersion = VEX_RELEASE_VERSION;
    scriptSRC = `https://unpkg.com/vexflow@${vexVersion}/releases/vexflow-debug.js`;
} else {
    scriptSRC = `/js/vexflow-${vexVersion}.js?` + Math.random();
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
// Allow us to rotate the ordering of notes easily, for visual testing. :-)
let rotateNotesOffset = parseInt(urlParams.get("rot")); // integer >= 0
if (isNaN(rotateNotesOffset) || rotateNotesOffset < 0) {
    rotateNotesOffset = 0;
} else if (rotateNotesOffset >= NUM_NOTE_GROUPS) {
    rotateNotesOffset = 0;
}

let offsetX = Math.floor(parseInt(urlParams.get("offset_x"))); // number >= 0
if (isNaN(offsetX) || offsetX < 0) {
    offsetX = 0;
}
let offsetY = Math.floor(parseInt(urlParams.get("offset_y"))); // number >= 0
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
        window.location.protocol + "//" + window.location.host + window.location.pathname + `?vex_version=${vexVersion}&font=${font}&scale=${scale}&context_type=${backend}&visual_debug=${visualDebug}&rot=${rotateNotesOffset}&offset_x=${offsetX}&offset_y=${offsetY}`
    );
}

// Save the offsetX and offsetY information to the browser's address bar.
// This allows us to transfer the offsetX / offsetY parameters to a different page, so we can align the values properly.
function createDebouncedSaveScrollOffsets() {
    let timeout = null;
    // Call this function as fast as you can! :-)
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;

            offsetX = Math.floor(document.querySelector(".stave-container").scrollLeft);
            offsetY = Math.floor(window.scrollY);
            console.log("Save Scroll Offsets " + offsetX + ", " + offsetY);
            const url = getURLWithCurrentQueryParams();
            window.history.replaceState({ path: url }, "", url);
        }, 500 /* milliseconds */);
    };
}
const debouncedSaveScrollOffsets = createDebouncedSaveScrollOffsets();

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
            vex_release_version: VEX_RELEASE_VERSION,
        };
    },
    mounted() {
        document.title = font + " - " + vexVersion;
        addScriptTag(scriptSRC, onVexFlowLoaded);
        window.addEventListener("scroll", debouncedSaveScrollOffsets);
    },

    beforeUnmount() {
        window.removeEventListener("scroll", debouncedSaveScrollOffsets);
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

        reloadWithVexCurrent() {
            vexVersion = "current";
            reload();
        },

        reloadWithVexRelease() {
            vexVersion = VEX_RELEASE_VERSION;
            reload();
        },

        rotateNotes() {
            rotateNotesOffset++;
            if (rotateNotesOffset >= NUM_NOTE_GROUPS) {
                rotateNotesOffset = 0;
            }
            reload();
        },

        saveScrollOffsets: debouncedSaveScrollOffsets, // See offsets.js
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
    setTimeout(restoreScrollOffsets, 300); // The delay fixes a bug where the window.scroll(...) drifts by 1 pixel vertically upon every refresh! :-|
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

    var target = document.getElementById("stave");
    var renderer = new VF.Renderer(target, getBackendType());
    renderer.resize(500 * scale, 190 * scale);
    var context = renderer.getContext();
    context.scale(scale, scale);

    let n0 = [
        new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "8" }),
        new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "16" }),
        new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "32" }),
        new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "64" }),
        new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "128" }),
        new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "128" }),
        new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "4" }),
        new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "2" }),
    ];

    let n1 = [
        new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "8", stem_direction:-1 }),
        new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "16", stem_direction:-1 }),
        new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "32", stem_direction:-1 }),
        new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "64", stem_direction:-1 }),
        new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "128", stem_direction:-1 }),
        new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "128", stem_direction:-1 }),
        new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "4", stem_direction:-1 }),
        new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "2", stem_direction:-1 }),
    ];

    for (let i=0; i<rotateNotesOffset; i++) {
        let note = n0.shift();
        n0.push(note);
        note = n1.shift();
        n1.push(note);
    }

    const allNotes = [...n0, ...n1 ];

    if (visualDebug) {
        const debugStyle = {
            fillStyle: "rgba(255,0,0,0.5)",
            strokeStyle: "rgba(0,0,255,0.5)",
        };
        allNotes.forEach((staveNote) => {
            staveNote.setStyle(debugStyle);
        });
    }

    let width = 300;
    let stave = new VF.Stave(0,0, width, {space_above_staff_ln: 7});

    let v0 = new VF.Voice({num_beats: 4,  beat_value: 4});
    v0.addTickables(n0);
    v0.setStave(stave);

    let v1 = new VF.Voice({num_beats: 4,  beat_value: 4});
    v1.addTickables(n1);
    v1.setStave(stave);

    let formatter = new VF.Formatter();
    formatter.format([v0, v1], width);

    stave.setStyle({strokeStyle:"rgba(0,0,0,0.1)"});
    stave.setContext(context).draw();
    v0.setContext(context).draw();
    v1.setContext(context).draw();
}
