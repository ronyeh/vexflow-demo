import Head from "next/head";
import Link from "next/link";
import App, { Constants } from "app/app";
import { useEffect } from "react";
import Tests from "app/tests/Tests_Parser";
import Spacer from "app/components/Spacer";
import { GetServerSideProps } from "next";

export default function TestPage({ queryParams }) {
    const { vexVersion, vexURL } = App.getVexVersionAndURL(queryParams);

    const testNumber = queryParams.test_number;
    const title = `Parser - ${testNumber} - ${vexVersion}`;

    useEffect(() => {
        Tests.runTest(parseInt(testNumber));
    }, []);

    return (
        <>
            <Head>
                <title>{`${title}`}</title>
                <link rel="icon" href="/favicon.ico" />
                <script src={vexURL}></script>
            </Head>
            <h1>
                <Link href="/parser">
                    <a className="back-button">↖️</a>
                </Link>
                <Spacer />
                {title}
            </h1>
            <p>Open the Developer Console!</p>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: { queryParams: context.query },
    };
};
