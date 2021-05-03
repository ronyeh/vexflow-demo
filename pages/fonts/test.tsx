import App, { Constants } from "app/app";
import Spacer from "app/components/Spacer";
import Tests from "app/font-tests";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

const fonts = ["Bravura", "Petaluma", "Gonville"];
const NUM_TESTS = 3;

export default function OffsetsPage({ queryParams }) {
    const { vexVersion, vexURL } = App.getVexVersionAndURL(queryParams);

    Tests.processQueryParams(queryParams);
    const title = Tests.getTitle();

    const info = Tests.getInfo();

    let staveElement;
    if (Tests.isCanvasBackend()) {
        staveElement = <canvas id="stave"></canvas>;
    } else {
        staveElement = <div id="stave"></div>;
    }

    useEffect(() => {
        Tests.setVexVersion(vexVersion);
        Tests.runTest();
        return function cleanup() {
            Tests.cleanup();
        };
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <script src={vexURL}></script>
            </Head>
            <h1>
                <Link href="/">
                    <a className="back-button">↖️</a>
                </Link>
                <Spacer />
                {title}
            </h1>
            <div>{info}</div>
            <div>
                Scale: <button onClick={() => Tests.reloadWithScale(1)}>1x</button>
                <button onClick={() => Tests.reloadWithScale(2)}>2x</button>
                <button onClick={() => Tests.reloadWithScale(4)}>4x</button>
                <button onClick={() => Tests.reloadWithScale(8)}>8x</button>
                <button onClick={() => Tests.reloadWithScale(16)}>16x</button>
                <Spacer />
                Backend: <button onClick={() => Tests.reloadWithBackend("svg")}>SVG</button>
                <button onClick={() => Tests.reloadWithBackend("canvas")}>CANVAS</button>
                <Spacer />
                Visual Debug: <button onClick={() => Tests.reloadWithVisualDebug(true)}>ON</button>
                <button onClick={() => Tests.reloadWithVisualDebug(false)}>OFF</button>
                <Spacer />
                VexFlow Version: <button onClick={() => Tests.reloadWithVexRelease()}>{Constants.VEX_RELEASE_VERSION}</button>
                <button onClick={() => Tests.reloadWithVexCurrent()}>Current</button>
                <Spacer />
                <button onClick={() => Tests.rotateNotes()}>Rotate Notes</button>
            </div>
            <br />
            <div className="stave-container" onScroll={() => Tests.saveScrollOffsets()}>
                {staveElement}
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    return {
        props: { queryParams: context.query }, // will be passed to the page component as props
    };
}
