import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

declare var $: any;
declare var QUnit: any;
declare var VF: any;

export default function TestPage({ queryParams }) {
    const router = useRouter();
    const ver = queryParams.ver;
    console.log("Version is " + ver);
    const vexURL = `https://unpkg.com/vexflow@${ver}/releases/vexflow-debug.js`;
    const testsURL = `https://unpkg.com/vexflow@${ver}/releases/vexflow-tests.js`;

    useEffect(() => {
        $(function () {
            QUnit.config.hidepassed = true;
            QUnit.config.noglobals = true;
            VF.Test.run();
        });
    }, []);

    return (
        <>
            <Head>
                <title>Version {ver}</title>
                <link rel="stylesheet" href="../flow.css" type="text/css" media="screen" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="../support/qunit.css" type="text/css" media="screen" />
                <script src="../support/jquery.js"></script>
                <script src="../support/qunit.js"></script>
                <script src={vexURL}></script>
                <script src={testsURL}></script>
            </Head>
            <div style={{ textAlign: "center" }}>
                <div id="qunit"></div>
                <div id="qunit-fixture"></div>
                <h2 id="vex-title"></h2>
                <div>
                    <h2>
                        <a id="vex-src" href={vexURL} target="_blank">
                            vexflow-debug.js
                        </a>{" "}
                        |{" "}
                        <a id="vex-tests" href={testsURL} target="_blank">
                            vexflow-tests.js
                        </a>
                    </h2>
                </div>
                <p>&nbsp;</p>
                <div id="vexflow_testoutput"></div>
                <p>&nbsp;</p>
                <p className="vf-footer">
                    [ <a href="http://vexflow.com">home</a> ] [ <a href="http://github.com/0xfe/vexflow">github</a> ] [ <a href="http://0xfe.muthanna.com">0xfe</a> ]
                </p>
            </div>
            <style jsx global>{`
                div.testcanvas div.name {
                    font-family: Arial, sans-serif;
                    font-size: 18px;
                    color: #fff;
                    margin-top: 50px;
                    margin-bottom: 10px;
                }
            `}</style>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log(context.query);
    return {
        props: { queryParams: context.query },
    };
};
