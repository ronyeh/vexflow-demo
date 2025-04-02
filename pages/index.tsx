import Head from "next/head";
import Link from "next/link";

const title = "VexFlow Demo";

export default function HomePage() {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{title}</h1>
            <ul>
                <li>
                    <Link href="/fonts">
                        Fonts
                    </Link>
                </li>
                <li>
                    <Link href="/easyscore">
                        EasyScore
                    </Link>
                </li>
                <li>
                    <Link href="/parser">
                        Parser
                    </Link>
                </li>
                <li>
                    <Link href="/registry">
                        Registry
                    </Link>
                </li>
            </ul>
        </>
    );
}
