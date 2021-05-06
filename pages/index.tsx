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
                        <a>Fonts</a>
                    </Link>
                </li>
                <li>
                    <Link href="/easyscore">
                        <a>EasyScore</a>
                    </Link>
                </li>
                <li>
                    <Link href="/parser">
                        <a>Parser</a>
                    </Link>
                </li>
                <li>
                    <Link href="/registry">
                        <a>Registry</a>
                    </Link>
                </li>
            </ul>
        </>
    );
}
