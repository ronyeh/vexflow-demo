import App, { Constants } from "app/app";
import Spacer from "app/components/Spacer";
import Head from "next/head";
import Link from "next/link";

const title = "Fonts";

const fonts = ["Bravura", "Petaluma", "Gonville"];

export default function FontsPage() {
    const testItems = [];
    const vexVersions = [Constants.VEX_RELEASE_VERSION, "current"];
    if (App.isLocalHost()) {
        vexVersions.push("localhost");
    }
    for (let i = 0; i < fonts.length; i++) {
        const links = [];
        const fontName = fonts[i];
        const fontNameLowerCase = fontName.toLowerCase();
        vexVersions.forEach((v) => {
            const testURL = `/fonts/test?vex_version=${v}&font=${fontNameLowerCase}`;
            const vexURL = `/js/vexflow-${v}.js`;

            links.push(
                <li key={"li_" + i + "_" + v}>
                    <a className="testlink" href={testURL} target="_blank">
                        {v}
                    </a>{" "}
                    <a className="src_code" href={vexURL} target="_blank">
                        »
                    </a>
                </li>
            );
        });

        testItems.push(
            <>
                <h3 key={"div_" + i}>
                    Test {i} - {fonts[i].charAt(0).toUpperCase() + fonts[i].substr(1).toLowerCase()}
                </h3>
                <ul key={"ul_" + i}>{links}</ul>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>
                <Link href="/">
                    <a className="back-button">↖️</a>
                </Link>
                <Spacer />
                {title}
            </h1>
            <h2>Note Head, Stem, and Flag</h2>
            <p>
                Open the test pages below and switch between browser tabs to compare.
                <br />
                See the{" "}
                <a href="/images/font_sample.svg" target="_blank">
                    Bravura & Petaluma font sample
                </a>{" "}
                generated with this{" "}
                <a href="/images/font_sample.afdesign" target="_blank">
                    Affinity Designer file
                </a>
                .<br />
                See the{" "}
                <a href="/images/lilypond-gonville.svg" target="_blank">
                    Gonville font sample
                </a>{" "}
                generated with this{" "}
                <a href="/images/score.ly" target="_blank">
                    LilyPond score
                </a>
                .
            </p>
            {testItems}
        </>
    );
}
