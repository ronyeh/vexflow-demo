import Head from "next/head";
import Link from "next/link";
import App, { Constants } from "app/app";
import { useEffect } from "react";
import Tests from "app/tests/Tests_EasyScore";
import Spacer from "app/components/Spacer";
import { GetServerSideProps } from "next";

export default function TestPage({ queryParams }) {
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
                <Link href="/easyscore" legacyBehavior>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: { queryParams: context.query },
    };
};
