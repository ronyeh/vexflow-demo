import Head from "next/head";
import Link from "next/link";
import App, { Constants } from "app/app";
import { useEffect } from "react";
import Tests from "app/tests/Tests_EasyScore";
import Spacer from "app/components/Spacer";
import { useRouter } from "next/router";

export default function TestPage() {
    const router = useRouter();
    const queryParams = router.query;
    const { vexVersion, vexURL } = App.getVexVersionAndURL(queryParams);
    const testNumber = queryParams.test_number as string;
    const title = `EasyScore - ${testNumber} - ${vexVersion}`;

    const info = `VexFlow: ${vexVersion}`;

    useEffect(() => {
        Tests.runTest(parseInt(testNumber));
        return function cleanup() {};
    }, []);

    return (
        <>
            <Head>
                <title>{`${title}`}</title>
                <link rel="icon" href="/favicon.ico" />
                <script src={vexURL}></script>
            </Head>
            <h1>
                <Link href="/easyscore">
                    <a className="back-button">↖️</a>
                </Link>
                <Spacer />
                {title}
            </h1>
            <div>{info}</div>
            <br />
            <div className="stave-container">
                <div id="stave"></div>
            </div>
            <style jsx>{``}</style>
        </>
    );
}
