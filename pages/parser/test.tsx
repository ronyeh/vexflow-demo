import Head from "next/head";
import Link from "next/link";
import App, { Constants } from "app/app";
import { useEffect, useState } from "react";
import Tests from "app/tests/Tests_Parser";
import Spacer from "app/components/Spacer";
import { GetServerSideProps } from "next";

export default function TestPage({ queryParams }) {
    const { vexVersion, vexURL } = App.getVexVersionAndURL(queryParams);

    const testNumber = parseInt(queryParams.test_number);
    const title = `Parser - ${testNumber} - ${vexVersion}`;
    const testDescription = Tests.getDescriptionForTest(testNumber);

    useEffect(() => {
        Tests.runTest(testNumber);
    }, []);

    return (
        <>
            <Head>
                <title>{`${title}`}</title>
                <link rel="icon" href="/favicon.ico" />
                <script src={vexURL}></script>
            </Head>
            <h1>
                <Link href="/parser" className="back-button">
                    ↖️
                </Link>
                <Spacer />
                {title}
            </h1>
            <p>{testDescription}</p>
            <p>Open the Developer Console!</p>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: { queryParams: context.query },
    };
};
