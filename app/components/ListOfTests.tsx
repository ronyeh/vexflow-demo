import Head from "next/head";
import Link from "next/link";
import App, { Constants } from "app/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spacer from "./Spacer";
import TestInfo from "app/tests/TestInfo";

interface Props {
    vexFiles: string[];
    testInfo: TestInfo;
}

export default function ListOfTests({ vexFiles, testInfo }: Props) {
    const router = useRouter();

    const title = testInfo.getTitle();

    const testItems = [];
    const [showLocalHostTests, setShowLocalHostTests] = useState(false);
    const vexVersions = [Constants.VEX_RELEASE_VERSION, App.getVexFlowJSFileForCurrentPath(router.pathname, vexFiles), "localhost"];
    for (let testNum = 0; testNum < testInfo.numTests; testNum++) {
        const testDescription = testInfo.getTestDescription(testNum);
        const links = [];
        vexVersions.forEach((vexVer, vexVerIndex) => {
            const testURL = `./test?vex_version=${vexVer}&test_number=${testNum}`;
            const vexURL = `/js/vexflow-${vexVer}.js`;
            let style = {};
            if (vexVer === "localhost") {
                if (showLocalHostTests) {
                    style = { display: "" };
                } else {
                    style = { display: "none" };
                }
            }
            links.push(
                <span key={"s_" + testNum + "_" + vexVerIndex} style={style}>
                    <a href={testURL}>{vexVer}</a>
                    <Spacer width={5} />
                    <a className="src_code" href={vexURL} target="_blank">
                        »
                    </a>
                    {vexVerIndex < vexVersions.length - 1 ? <Spacer width={30} /> : ""}
                </span>
            );
        });
        testItems.push(<h2 key={"h_" + testNum}>Test {testNum}</h2>);
        testItems.push(<div key={"d_" + testNum}>{testDescription}</div>);
        testItems.push(links);
    }

    useEffect(() => {
        let tests = [];
        if (App.isLocalHost()) {
            setShowLocalHostTests(true);
        }
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <base href={App.ensureTrailingSlash(router.pathname)} />
            </Head>
            <h1>
                <Link href="/">
                    <a className="back-button">↖️</a>
                </Link>
                <Spacer />
                {title}
            </h1>
            {testInfo.pageDescription}
            {testItems}
        </>
    );
}
