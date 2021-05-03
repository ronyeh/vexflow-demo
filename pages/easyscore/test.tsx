import Head from "next/head";
import Link from "next/link";
import App, { Constants } from "app/app";
import { useEffect } from "react";
import Tests from "app/easyscore-tests";
import Spacer from "app/components/Spacer";

export default function TestPage({ queryParams }) {
    const { vexVersion, vexURL } = App.getVexVersionAndURL(queryParams);
    const testNumber = queryParams.test_number;
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
                <Link href="/">
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

export async function getServerSideProps(context) {
    return {
        props: { queryParams: context.query }, // will be passed to the page component as props
    };
}
