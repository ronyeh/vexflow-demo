import Head from "next/head";
import Link from "next/link";
import App, { Constants } from "app/app";
import { useEffect } from "react";
import styles from "./index.module.css";
import Tests from "app/registry-tests";

export default function TestPage({ queryParams }) {
    const { vexVersion, vexURL } = App.getVexVersionAndURL(queryParams);
    const testNumber = queryParams.test_number;
    const title = `Registry Test ${testNumber} - ${vexVersion}`;

    useEffect(() => {
        Tests.runTest(testNumber);
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
                <Link href="/">
                    <a className="back-button">↖️</a>
                </Link>
                <div className="spacer" />
                {title}
            </h1>

            <button onClick={onClick}>Click Me</button>
            <br />
            <div className="stave-container">
                <div id="stave"></div>
            </div>
            <style jsx>{`
                .spacer {
                    width: 10px;
                    display: inline-block;
                }
                .back-button {
                    color: gray;
                    text-decoration: none;
                }
                .stave-container {
                    overflow: auto;
                    width: 100%;
                }
            `}</style>
        </>
    );
}

export async function getServerSideProps(context) {
    return {
        props: { queryParams: context.query }, // will be passed to the page component as props
    };
}
