import Head from "next/head";
import Link from "next/link";
import App, { Constants } from "app/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spacer from "./Spacer";

interface Props {
    title: string;
    numTests: number;
    vexFiles: string[];
}

export default function ListOfTests({ title, numTests, vexFiles }: Props) {
    const router = useRouter();

    const testItems = [];
    const [showLocalHostTests, setShowLocalHostTests] = useState(false);
    const vexVersions = [Constants.VEX_RELEASE_VERSION, App.getVexFlowJSFileForCurrentPath(router.pathname, vexFiles), "localhost"];
    for (let i = 0; i < numTests; i++) {
        const links = [];
        vexVersions.forEach((vexVer, vexVerIndex) => {
            const testURL = `./test?vex_version=${vexVer}&test_number=${i}`;
            let style = {};
            if (vexVer === "localhost") {
                if (showLocalHostTests) {
                    style = { display: "" };
                } else {
                    style = { display: "none" };
                }
            }
            links.push(
                <span key={vexVerIndex} style={style}>
                    <a href={testURL}>{vexVer}</a>
                    {vexVerIndex < vexVersions.length - 1 ? <Spacer /> : ""}
                </span>
            );
        });
        testItems.push(
            <>
                <h2 key={i}>Test {i}</h2>
                {links}
            </>
        );
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
            <h1>{title}</h1>
            <Link href="/">
                <a>Back</a>
            </Link>
            {testItems}
        </>
    );
}
