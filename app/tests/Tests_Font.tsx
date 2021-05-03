import App, { Constants } from "../app";
import TestInfo from "./TestInfo";

namespace Tests_Font {
    const allowedFonts = ["bravura", "petaluma", "gonville"];
    export function getInfo(): TestInfo {
        const info = new TestInfo();
        info.title = "Font";
        const testNumbers = [0, 1, 2];
        info.numTests = testNumbers.length;
        info.testDescriptions = testNumbers.map((testNum) => allowedFonts[testNum].toUpperCase());
        return info;
    }

    let currentTestNumber = 0;
    let font;
    let backend;
    let scale;
    let visualDebug;
    let rotateNotesOffset;
    let offsetX;
    let offsetY;
    let vexVersion;
    let debouncedSaveScrollOffsets;

    export function runTest() {
        debouncedSaveScrollOffsets = createDebouncedSaveScrollOffsets();
        window.addEventListener("scroll", debouncedSaveScrollOffsets);
    }

    export function getMessage() {
        return `VexFlow: ${vexVersion}, Font: ${font}, Scale: ${scale}x, Backend: ${backend}`;
    }

    export function processQueryParams(queryParams, vexInfo) {
        if (!queryParams) {
            return;
        }

        vexVersion = vexInfo.vexVersion;

        currentTestNumber = queryParams.test_number;

        // Each test case has a default font that can be overridden by the 'font' query parameter.
        let defaultFont = "bravura";
        switch (currentTestNumber) {
            case 0:
            default:
                defaultFont = "bravura";
                break;
            case 1:
                defaultFont = "petaluma";
                break;
            case 2:
                defaultFont = "gonville";
                break;
        }
        font = queryParams.font ?? defaultFont; // bravura (default) || petaluma || gonville
        // Validate the input.
        if (!allowedFonts.includes(font)) {
            font = "bravura";
        }
        backend = queryParams.backend; // svg (default) | canvas
        if (!isCanvasBackend()) {
            backend = "svg";
        }
        scale = parseInt(queryParams.scale); // 1, 2, 4 (default), 8, 16
        if (isNaN(scale) || scale < 1) {
            scale = 4;
        }
        visualDebug = queryParams.visual_debug; // true || false (default)
        if (visualDebug === "true") {
            visualDebug = true;
        } else {
            visualDebug = false;
        }
        // Allow us to rotate the ordering of notes easily, for visual testing. :-)
        rotateNotesOffset = parseInt(queryParams.rot); // integer >= 0
        if (isNaN(rotateNotesOffset) || rotateNotesOffset < 0) {
            rotateNotesOffset = 0;
        } else if (rotateNotesOffset >= NUM_NOTE_GROUPS) {
            rotateNotesOffset = 0;
        }

        offsetX = Math.floor(parseInt(queryParams.offset_x)); // number >= 0
        if (isNaN(offsetX) || offsetX < 0) {
            offsetX = 0;
        }
        offsetY = Math.floor(parseInt(queryParams.offset_y)); // number >= 0
        if (isNaN(offsetY) || offsetY < 0) {
            offsetY = 0;
        }
    }

    export function getTitle() {
        return font + " - " + vexVersion;
    }

    export function cleanup() {
        window.removeEventListener("scroll", debouncedSaveScrollOffsets);
    }
    export function onClick() {}

    const NUM_NOTE_GROUPS = 8;

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // Support both SVG and Canvas backends for visual testing.

    export function isCanvasBackend() {
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

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // Allow the user to copy or edit the URL parameters to help with debugging.

    function reload() {
        if (typeof window !== "undefined") {
            window.location.href = getURLWithCurrentQueryParams();
        }
    }

    function getURLWithCurrentQueryParams() {
        return (
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            `?vex_version=${vexVersion}&font=${font}&scale=${scale}&backend=${backend}&visual_debug=${visualDebug}&rot=${rotateNotesOffset}&offset_x=${offsetX}&offset_y=${offsetY}`
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

    function restoreScrollOffsets() {
        if (offsetX > 0) {
            document.querySelector(".stave-container").scrollLeft = offsetX;
        }
        if (offsetY > 0) {
            window.scroll(0, offsetY);
        }
    }

    export function saveScrollOffsets() {
        debouncedSaveScrollOffsets();
    }

    export function reloadWithScale(s) {
        scale = s;
        reload();
    }

    export function reloadWithBackend(b) {
        backend = b;
        reload();
    }

    export function reloadWithVisualDebug(flag) {
        visualDebug = flag;
        reload();
    }

    export function reloadWithVexCurrent() {
        vexVersion = "current";
        reload();
    }

    export function reloadWithVexRelease() {
        vexVersion = Constants.VEX_RELEASE_VERSION;
        reload();
    }

    export function rotateNotes() {
        rotateNotesOffset++;
        if (rotateNotesOffset >= NUM_NOTE_GROUPS) {
            rotateNotesOffset = 0;
        }
        reload();
    }

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
            new VF.StaveNote({ clef: "treble", keys: ["c/5"], duration: "8" }),
            new VF.StaveNote({ clef: "treble", keys: ["c/5"], duration: "16" }),
            new VF.StaveNote({ clef: "treble", keys: ["c/5"], duration: "32" }),
            new VF.StaveNote({ clef: "treble", keys: ["c/5"], duration: "64" }),
            new VF.StaveNote({ clef: "treble", keys: ["c/5"], duration: "128" }),
            new VF.StaveNote({ clef: "treble", keys: ["c/5"], duration: "128" }),
            new VF.StaveNote({ clef: "treble", keys: ["c/5"], duration: "4" }),
            new VF.StaveNote({ clef: "treble", keys: ["c/5"], duration: "2" }),
        ];

        let n1 = [
            new VF.StaveNote({ clef: "treble", keys: ["a/4"], duration: "8", stem_direction: -1 }),
            new VF.StaveNote({ clef: "treble", keys: ["a/4"], duration: "16", stem_direction: -1 }),
            new VF.StaveNote({ clef: "treble", keys: ["a/4"], duration: "32", stem_direction: -1 }),
            new VF.StaveNote({ clef: "treble", keys: ["a/4"], duration: "64", stem_direction: -1 }),
            new VF.StaveNote({ clef: "treble", keys: ["a/4"], duration: "128", stem_direction: -1 }),
            new VF.StaveNote({ clef: "treble", keys: ["a/4"], duration: "128", stem_direction: -1 }),
            new VF.StaveNote({ clef: "treble", keys: ["a/4"], duration: "4", stem_direction: -1 }),
            new VF.StaveNote({ clef: "treble", keys: ["a/4"], duration: "2", stem_direction: -1 }),
        ];

        for (let i = 0; i < rotateNotesOffset; i++) {
            let note = n0.shift();
            n0.push(note);
            note = n1.shift();
            n1.push(note);
        }

        const allNotes = [...n0, ...n1];

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
        let stave = new VF.Stave(0, 0, width, { space_above_staff_ln: 7 });

        let v0 = new VF.Voice({ num_beats: 4, beat_value: 4 });
        v0.addTickables(n0);
        v0.setStave(stave);

        let v1 = new VF.Voice({ num_beats: 4, beat_value: 4 });
        v1.addTickables(n1);
        v1.setStave(stave);

        let formatter = new VF.Formatter();
        formatter.format([v0, v1], width);

        stave.setStyle({ strokeStyle: "rgba(0,0,0,0.1)" });
        stave.setContext(context).draw();
        v0.setContext(context).draw();
        v1.setContext(context).draw();
    }
}

export default Tests_Font;
