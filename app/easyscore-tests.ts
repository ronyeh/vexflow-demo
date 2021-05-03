namespace Tests {
    export const TITLE = "EasyScore";
    export const NUM_TESTS = 3;

    let VF;
    let factory;
    let easyscore;
    let system;
    let testButtonHandler;
    let registry;

    export function runTest(num: number) {
        VF = Vex.Flow;
        factory = new VF.Factory({ renderer: { elementId: "stave", width: 800, height: 400 } });
        easyscore = factory.EasyScore({ throwOnError: true });
        system = factory.System();
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

    // We can change the CSS style of a note!
    // document.getElementById("vf-note-id-39412").style.opacity = 0.3;
    // document.querySelector("#vf-note-id-39412 .vf-stem path").style.stroke = "red"
    // document.querySelector("#vf-note-id-39412 .vf-notehead path").style.fill = "cyan"
    // document.querySelector("#vf-note-id-39412 .vf-modifiers path").style.fill = "magenta"

    function test0() {
        console.log("TEST 0");
        system.addStave({
            voices: [easyscore.voice(easyscore.notes("C5/w"))],
        });
    }

    function test1() {
        console.log("TEST 1");
        system
            .addStave({
                voices: [easyscore.voice(easyscore.notes("C#5/q, B4, A4, G#4[stem='up',id='note-id-39412']"))],
            })
            .addClef("treble")
            .addTimeSignature("4/4");

        system
            .addStave({
                voices: [easyscore.voice(easyscore.notes("C#3/q, B2, A2, G#2", { clef: "bass" }))],
            })
            .addClef("bass")
            .addTimeSignature("4/4");
    }

    // Taken from https://raw.githubusercontent.com/0xfe/vexflow/master/tests/bach_tests.js
    function test2() {
        console.log("TEST 2");
        function concat(a, b) {
            return a.concat(b);
        }

        vf = new VF.Factory({ renderer: { elementId: "stave", width: 1150, height: 800 } });
        easyscore = vf.EasyScore({ throwOnError: true });

        var registry = new VF.Registry();
        VF.Registry.enableDefaultRegistry(registry);

        var v = easyscore.voice.bind(easyscore);
        var n = easyscore.notes.bind(easyscore);
        var b = easyscore.beam.bind(easyscore);

        var x = 100;
        var y = 80;
        function makeSystem(width) {
            var system = vf.System({ x: x, y: y, width: width, spaceBetweenStaves: 10 });
            x += width;
            return system;
        }

        function id(id) {
            return registry.getElementById(id);
        }

        easyscore.set({ time: "3/4" });

        /*  Measure 1 */
        var system = makeSystem(220);
        system
            .addStave({
                voices: [v([n('D5/q[id="m1a"]'), b(n("G4/8, A4, B4, C5", { stem: "up" }))].reduce(concat)), v([vf.TextDynamics({ text: "p", duration: "h", dots: 1, line: 9 })])],
            })
            .addClef("treble")
            .addKeySignature("G")
            .addTimeSignature("3/4")
            .setTempo({ name: "Allegretto", duration: "h", dots: 1, bpm: 66 }, -30);

        system
            .addStave({ voices: [v(n("(G3 B3 D4)/h, A3/q", { clef: "bass" }))] })
            .addClef("bass")
            .addKeySignature("G")
            .addTimeSignature("3/4");
        system.addConnector("brace");
        system.addConnector("singleRight");
        system.addConnector("singleLeft");

        // Fingering
        id("m1a").addModifier(vf.Fingering({ number: "5" }), 0);

        /*  Measure 2 */
        system = makeSystem(150);
        system.addStave({ voices: [v(n('D5/q[id="m2a"], G4[id="m2b"], G4[id="m2c"]'))] });
        system.addStave({ voices: [v(n("B3/h.", { clef: "bass" }))] });
        system.addConnector("singleRight");

        id("m2a").addModifier(vf.Articulation({ type: "a.", position: "above" }), 0);
        id("m2b").addModifier(vf.Articulation({ type: "a.", position: "below" }), 0);
        id("m2c").addModifier(vf.Articulation({ type: "a.", position: "below" }), 0);

        vf.Curve({
            from: id("m1a"),
            to: id("m2a"),
            options: {
                cps: [
                    { x: 0, y: 40 },
                    { x: 0, y: 40 },
                ],
            },
        });

        /*  Measure 3 */
        system = makeSystem(150);
        system.addStave({
            voices: [v([n('E5/q[id="m3a"]'), b(n("C5/8, D5, E5, F5", { stem: "down" }))].reduce(concat))],
        });
        id("m3a").addModifier(vf.Fingering({ number: "3", position: "above" }), 0);

        system.addStave({ voices: [v(n("C4/h.", { clef: "bass" }))] });
        system.addConnector("singleRight");

        /*  Measure 4 */
        system = makeSystem(150);
        system.addStave({ voices: [v(n('G5/q[id="m4a"], G4[id="m4b"], G4[id="m4c"]'))] });

        system.addStave({ voices: [v(n("B3/h.", { clef: "bass" }))] });
        system.addConnector("singleRight");

        id("m4a").addModifier(vf.Articulation({ type: "a.", position: "above" }), 0);
        id("m4b").addModifier(vf.Articulation({ type: "a.", position: "below" }), 0);
        id("m4c").addModifier(vf.Articulation({ type: "a.", position: "below" }), 0);

        vf.Curve({
            from: id("m3a"),
            to: id("m4a"),
            options: {
                cps: [
                    { x: 0, y: 20 },
                    { x: 0, y: 20 },
                ],
            },
        });

        /*  Measure 5 */
        system = makeSystem(150);
        system.addStave({
            voices: [v([n('C5/q[id="m5a"]'), b(n("D5/8, C5, B4, A4", { stem: "down" }))].reduce(concat))],
        });
        id("m5a").addModifier(vf.Fingering({ number: "4", position: "above" }), 0);

        system.addStave({ voices: [v(n("A3/h.", { clef: "bass" }))] });
        system.addConnector("singleRight");

        /*  Measure 6 */
        system = makeSystem(150);
        system.addStave({
            voices: [v([n("B4/q"), b(n('C5/8, B4, A4, G4[id="m6a"]', { stem: "up" }))].reduce(concat))],
        });

        system.addStave({ voices: [v(n("G3/h.", { clef: "bass" }))] });
        system.addConnector("singleRight");

        vf.Curve({
            from: id("m5a"),
            to: id("m6a"),
            options: {
                cps: [
                    { x: 0, y: 20 },
                    { x: 0, y: 20 },
                ],
                invert: true,
                position_end: "nearTop",
                y_shift: 20,
            },
        });

        /*  Measure 7 (New system) */
        x = 40;
        y += 230;

        system = makeSystem(220);
        system
            .addStave({
                voices: [v([n('F4/q[id="m7a"]'), b(n('G4/8[id="m7b"], A4, B4, G4', { stem: "up" }))].reduce(concat))],
            })
            .addClef("treble")
            .addKeySignature("G");

        system
            .addStave({ voices: [v(n('D4/q, B3[id="m7c"], G3', { clef: "bass" }))] })
            .addClef("bass")
            .addKeySignature("G");
        system.addConnector("brace");
        system.addConnector("singleRight");
        system.addConnector("singleLeft");

        id("m7a").addModifier(vf.Fingering({ number: "2", position: "below" }), 0);
        id("m7b").addModifier(vf.Fingering({ number: "1" }), 0);
        id("m7c").addModifier(vf.Fingering({ number: "3", position: "above" }), 0);

        /*  Measure 8 */
        system = makeSystem(180);
        var grace = vf.GraceNote({ keys: ["d/3"], clef: "bass", duration: "8", slash: true });

        system.addStave({ voices: [v(n('A4/h.[id="m8c"]'))] });
        system.addStave({
            voices: [easyscore.set({ clef: "bass" }).voice([n('D4/q[id="m8a"]'), b(n('D3/8, C4, B3[id="m8b"], A3', { stem: "down" }))].reduce(concat))],
        });
        system.addConnector("singleRight");

        id("m8b").addModifier(vf.Fingering({ number: "1", position: "above" }), 0);
        id("m8c").addModifier(vf.GraceNoteGroup({ notes: [grace] }), 0);

        vf.Curve({
            from: id("m7a"),
            to: id("m8c"),
            options: {
                cps: [
                    { x: 0, y: 20 },
                    { x: 0, y: 20 },
                ],
                invert: true,
                position: "nearTop",
                position_end: "nearTop",
            },
        });

        vf.StaveTie({ from: grace, to: id("m8c") });

        /*  Measure 9 */
        system = makeSystem(180);
        system.addStave({
            voices: [easyscore.set({ clef: "treble" }).voice([n('D5/q[id="m9a"]'), b(n("G4/8, A4, B4, C5", { stem: "up" }))].reduce(concat))],
        });

        system.addStave({ voices: [v(n("B3/h, A3/q", { clef: "bass" }))] });
        system.addConnector("singleRight");

        id("m9a").addModifier(vf.Fingering({ number: "5" }), 0);

        /*  Measure 10 */
        system = makeSystem(170);
        system.addStave({ voices: [v(n('D5/q[id="m10a"], G4[id="m10b"], G4[id="m10c"]'))] });
        system.addStave({ voices: [v(n('G3/q[id="m10d"], B3, G3', { clef: "bass" }))] });
        system.addConnector("singleRight");

        id("m10a").addModifier(vf.Articulation({ type: "a.", position: "above" }), 0);
        id("m10b").addModifier(vf.Articulation({ type: "a.", position: "below" }), 0);
        id("m10c").addModifier(vf.Articulation({ type: "a.", position: "below" }), 0);
        id("m10d").addModifier(vf.Fingering({ number: "4" }), 0);

        vf.Curve({
            from: id("m9a"),
            to: id("m10a"),
            options: {
                cps: [
                    { x: 0, y: 40 },
                    { x: 0, y: 40 },
                ],
            },
        });

        /*  Measure 11 */
        system = makeSystem(150);
        system.addStave({
            voices: [v([n('E5/q[id="m11a"]'), b(n("C5/8, D5, E5, F5", { stem: "down" }))].reduce(concat))],
        });
        id("m11a").addModifier(vf.Fingering({ number: "3", position: "above" }), 0);

        system.addStave({ voices: [v(n("C4/h.", { clef: "bass" }))] });
        system.addConnector("singleRight");

        /*  Measure 12 */
        system = makeSystem(170);
        system.addStave({ voices: [v(n('G5/q[id="m12a"], G4[id="m12b"], G4[id="m12c"]'))] });

        system.addStave({
            voices: [easyscore.set({ clef: "bass" }).voice([n('B3/q[id="m12d"]'), b(n('C4/8, B3, A3, G3[id="m12e"]', { stem: "down" }))].reduce(concat))],
        });
        system.addConnector("singleRight");

        id("m12a").addModifier(vf.Articulation({ type: "a.", position: "above" }), 0);
        id("m12b").addModifier(vf.Articulation({ type: "a.", position: "below" }), 0);
        id("m12c").addModifier(vf.Articulation({ type: "a.", position: "below" }), 0);

        id("m12d").addModifier(vf.Fingering({ number: "2", position: "above" }), 0);
        id("m12e").addModifier(vf.Fingering({ number: "4", position: "above" }), 0);

        vf.Curve({
            from: id("m11a"),
            to: id("m12a"),
            options: {
                cps: [
                    { x: 0, y: 20 },
                    { x: 0, y: 20 },
                ],
            },
        });

        /*  Measure 13 */
        x = 40;
        y += 230;

        system = makeSystem(220);
        system
            .addStave({
                voices: [easyscore.set({ clef: "treble" }).voice([n('c5/q[id="m13a"]'), b(n("d5/8, c5, b4, a4", { stem: "down" }))].reduce(concat))],
            })
            .addClef("treble")
            .addKeySignature("G");

        system
            .addStave({ voices: [v(n('a3/h[id="m13b"], f3/q[id="m13c"]', { clef: "bass" }))] })
            .addClef("bass")
            .addKeySignature("G");

        system.addConnector("brace");
        system.addConnector("singleRight");
        system.addConnector("singleLeft");

        id("m13a").addModifier(vf.Fingering({ number: "4", position: "above" }), 0);
        id("m13b").addModifier(vf.Fingering({ number: "1" }), 0);
        id("m13c").addModifier(vf.Fingering({ number: "3", position: "above" }), 0);

        /*  Measure 14 */
        system = makeSystem(180);
        system.addStave({
            voices: [easyscore.set({ clef: "treble" }).voice([n("B4/q"), b(n("C5/8, b4, a4, g4", { stem: "up" }))].reduce(concat))],
        });

        system.addStave({ voices: [v(n('g3/h[id="m14a"], b3/q[id="m14b"]', { clef: "bass" }))] });
        system.addConnector("singleRight");

        id("m14a").addModifier(vf.Fingering({ number: "2" }), 0);
        id("m14b").addModifier(vf.Fingering({ number: "1" }), 0);

        /*  Measure 15 */
        system = makeSystem(180);
        system.addStave({
            voices: [easyscore.set({ clef: "treble" }).voice([n("a4/q"), b(n('b4/8, a4, g4, f4[id="m15a"]', { stem: "up" }))].reduce(concat))],
        });

        system.addStave({ voices: [v(n('c4/q[id="m15b"], d4, d3', { clef: "bass" }))] });
        system.addConnector("singleRight");

        id("m15a").addModifier(vf.Fingering({ number: "2" }), 0);
        id("m15b").addModifier(vf.Fingering({ number: "2" }), 0);

        /*  Measure 16 */
        system = makeSystem(130);
        system
            .addStave({
                voices: [easyscore.set({ clef: "treble" }).voice([n('g4/h.[id="m16a"]')].reduce(concat))],
            })
            .setEndBarType(VF.Barline.type.REPEAT_END);

        system.addStave({ voices: [v(n('g3/h[id="m16b"], g2/q', { clef: "bass" }))] }).setEndBarType(VF.Barline.type.REPEAT_END);
        system.addConnector("boldDoubleRight");

        id("m16a").addModifier(vf.Fingering({ number: "1" }), 0);
        id("m16b").addModifier(vf.Fingering({ number: "1" }), 0);

        vf.Curve({
            from: id("m13a"),
            to: id("m16a"),
            options: {
                cps: [
                    { x: 0, y: 50 },
                    { x: 0, y: 20 },
                ],
                invert: true,
                position_end: "nearTop",
            },
        });

        /* Measure 17 */
        system = makeSystem(180);
        system
            .addStave({
                voices: [easyscore.set({ clef: "treble" }).voice([n('b5/q[id="m17a"]'), b(n("g5/8, a5, b5, g5", { stem: "down" }))].reduce(concat)), v([vf.TextDynamics({ text: "mf", duration: "h", dots: 1, line: 10 })])],
            })
            .setBegBarType(VF.Barline.type.REPEAT_BEGIN);

        system.addStave({ voices: [v(n("g3/h.", { clef: "bass" }))] }).setBegBarType(VF.Barline.type.REPEAT_BEGIN);

        system.addConnector("boldDoubleLeft");
        system.addConnector("singleRight");

        id("m17a").addModifier(vf.Fingering({ number: "5", position: "above" }), 0);

        /* Measure 18 */
        system = makeSystem(180);
        system.addStave({
            voices: [easyscore.set({ clef: "treble" }).voice([n('a5/q[id="m18a"]'), b(n('d5/8, e5, f5, d5[id="m18b"]', { stem: "down" }))].reduce(concat))],
        });

        system.addStave({ voices: [v(n("f3/h.", { clef: "bass" }))] });
        system.addConnector("singleRight");

        id("m18a").addModifier(vf.Fingering({ number: "4", position: "above" }), 0);

        vf.Curve({
            from: id("m17a"),
            to: id("m18b"),
            options: {
                cps: [
                    { x: 0, y: 20 },
                    { x: 0, y: 30 },
                ],
            },
        });

        VF.Registry.disableDefaultRegistry();
    }
}

export default Tests;
