import Head from "next/head";

const title = "EasyScore";

export default function EasyScorePage() {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{title}</h1>
            <ul></ul>
        </>
    );
}

/*
`./test/?vex_version=${vexVersion}&test_number=${this.n}`,
`<li><a :href="test_url" target="_blank">Test {{n}}</a> with ${vexVersion} <a class="src_code" href="${getVexURL(vexVersion)}" target="_blank">❯</a></li>`,
*/
