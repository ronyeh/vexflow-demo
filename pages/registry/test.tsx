import Head from "next/head";
import Link from "next/link";
import App, { Constants } from "app/app";
import { useEffect } from "react";
import Tests from "app/tests/Tests_Registry";
import Spacer from "app/components/Spacer";
import { useRouter } from "next/router";

export default function TestPage() {
    const router = useRouter();
    const { vexVersion, vexURL } = App.getVexVersionAndURL(router.query);
    const testNumber = router.query.test_number as string;
    const title = `Registry - ${testNumber} - ${vexVersion}`;

    useEffect(() => {
        Tests.runTest(parseInt(testNumber));
        return function cleanup() {
            Tests.cleanup();
        };
    }, []);

    function onClick() {
        Tests.onClick();
    }

    return (
        <>
            <Head>
                <title>{`${title}`}</title>
                <link rel="icon" href="/favicon.ico" />
                <script src={vexURL}></script>
            </Head>
            <h1>
                <Link href="/registry">
                    <a className="back-button">↖️</a>
                </Link>
                <Spacer />
                {title}
            </h1>

            <button onClick={onClick}>Click Me</button>
            <br />
            <div className="stave-container">
                <div id="stave"></div>
            </div>
            <style jsx>{``}</style>
        </>
    );
}
