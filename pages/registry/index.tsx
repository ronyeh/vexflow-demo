import Head from "next/head";
import Link from "next/link";
import App, { Constants } from "app/app";
import { useEffect } from "react";
import styles from "./index.module.css";
const title = "Registry";

const NUM_TESTS = 4;

export default function RegistryPage() {
    const testItems = [];
    const vexVersions = [Constants.VEX_RELEASE_VERSION, "current-registry"];
    if (App.isLocalHost()) {
        vexVersions.push("localhost");
    }
    for (let i = 0; i < NUM_TESTS; i++) {
        const links = [];
        vexVersions.forEach((v) => {
            const testURL = `/registry/test?vex_version=${v}&test_number=${i}`;
            links.push(
                <li key={"li_" + i + "_" + v}>
                    <a className={styles.testlink} href={testURL} target="_blank">
                        {v}
                    </a>
                </li>
            );
        });

        testItems.push(
            <li key={"li_" + i}>
                <div key={"div_" + i}>Test {i}</div>
                <ul key={"ul_" + i}>{links}</ul>
            </li>
        );
    }

    useEffect(() => {}, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{title}</h1>
            <Link href="/">
                <a>Back</a>
            </Link>
            <ul>{testItems}</ul>
        </>
    );
}
