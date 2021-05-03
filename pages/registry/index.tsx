import Head from "next/head";
import Link from "next/link";
import App, { Constants } from "app/app";
import Tests from "app/registry-tests";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import path from "path";
import fs from "fs/promises";

interface Props {
    vexflowFiles: Array<string>;
}

export default function RegistryPage({ vexflowFiles }: Props) {
    const title = Tests.TITLE;
    const NUM_TESTS = Tests.NUM_TESTS;

    const vexflowFilesSet = new Set(vexflowFiles);

    const router = useRouter();
    const pathParts = router.pathname.split("/");
    const parentPathName = pathParts[pathParts.length - 1];
    let vexVersionForCurrentPath = "current-" + parentPathName;
    if (!vexflowFilesSet.has(vexVersionForCurrentPath + ".js")) {
        vexVersionForCurrentPath = "current";
    }

    let [testItems, setTestItems] = useState([]);

    useEffect(() => {
        let vexVersions = [Constants.VEX_RELEASE_VERSION, vexVersionForCurrentPath];
        let tests = [];
        if (App.isLocalHost()) {
            vexVersions.push("localhost");
        }
        for (let i = 0; i < NUM_TESTS; i++) {
            const links = [];
            vexVersions.forEach((vexVer) => {
                const testURL = `./test?vex_version=${vexVer}&test_number=${i}`;
                links.push(
                    <div key={"div_" + i + "_" + vexVer}>
                        <a href={testURL}>{vexVer}</a>
                    </div>
                );
            });

            tests.push(
                <li key={"li_" + i}>
                    <div key={"div_a_" + i}>Test {i}</div>
                    <div key={"div_b_" + i}>{links}</div>
                </li>
            );
        }
        setTestItems(tests);
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <base href={App.ensureTrailingSlash(router.pathname)} />
            </Head>
            <h1>{title}</h1>
            <Link href="/">
                <a>Back</a>
            </Link>
            <ul>{testItems}</ul>
        </>
    );
}

export async function getStaticProps(context) {
    const jsDir = path.join(process.cwd(), "public/js");
    const files = await fs.readdir(jsDir);
    const vexflowFiles = files.filter(function (file) {
        return file.startsWith("vexflow") && path.extname(file).toLowerCase() === ".js";
    });

    const props: Props = { vexflowFiles };

    return {
        props,
    };
}
