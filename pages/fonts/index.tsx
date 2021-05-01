import Head from "next/head";

const title = "Fonts";

export default function FontsPage() {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{title}</h1>
            <ul>
                <li>
                    <a href="fonts/">Fonts</a>
                </li>
                <li>
                    <a href="easyscore/">EasyScore</a>
                </li>
                <li>
                    <a href="registry/">Registry</a>
                </li>
            </ul>
        </>
    );
}

/*




<title>Fonts</title>
        <script src="/js/main.js"></script>
    </head>
    <body>
        <h1>Fonts</h1>
        <h2>Note Head, Stem, and Flag Offsets</h2>
        <p>
            Open the test pages below and switch between browser tabs to compare.<br />
            See the <a href="/images/font_sample.svg" target="_blank">Bravura & Petaluma font sample</a> generated with this <a href="/images/font_sample.afdesign" target="_blank">Affinity Designer file</a>.<br/>
            See the <a href="/images/lilypond-gonville.svg" target="_blank">Gonville font sample</a> generated with this <a href="/images/score.ly" target="_blank">LilyPond score</a>.
        </p>
        <div id="test-links">
            <ul>
                <test0></test0>
                <br />
                <test1></test1>
                <br />
                <test2></test2>
            </ul>
        </div>
        <script>
            const vex_version = "3.0.9";

            const fonts = ["Bravura", "Petaluma", "Gonville"];

            const app = Vue.createApp({});

            for (let i=0; i<3; i++) {
                const fontName = fonts[i];
                const fontNameLowerCase = fontName.toLowerCase();
                const releaseTest = `<li><a href="/fonts/offsets.html?vex_version=${vex_version}&font=${fontNameLowerCase}" target="_blank">${fontName} test</a> with VexFlow ${vex_version} <a class="src_code" href="https://unpkg.com/vexflow@${vex_version}/releases/vexflow-debug.js" target="_blank">❯</a></li>`;
                const currentBuildTest = `<li><a href="/fonts/offsets.html?vex_version=current&font=${fontNameLowerCase}" target="_blank">${fontName} test</a> with current build <a class="src_code" href="/js/vexflow-current.js" target="_blank">❯</a></li>`;
                const localHostDevTest = isLocalHost() ? `<li><a href="/fonts/offsets.html?vex_version=localhost&font=${fontNameLowerCase}" target="_blank">${fontName} test</a> with localhost dev build <a class="src_code" href="/js/vexflow-localhost.js" target="_blank">❯</a></li>` : "";

                app.component('test'+i, {
                    template: `${releaseTest}${currentBuildTest}${localHostDevTest}`,
                });
            }

            app.mount('#test-links')
            </script>
    </body>
</html>


*/
