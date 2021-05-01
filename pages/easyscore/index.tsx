import Head from "next/head";

const title = "Fonts";

export default function FontsPage() {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{title}</h1>
            <ul>
                <li>
                    <a href="fonts/">Fonts</a>
                </li>
                <li>
                    <a href="easyscore/">EasyScore</a>
                </li>
                <li>
                    <a href="registry/">Registry</a>
                </li>
            </ul>
        </>
    );
}

/*


<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>EasyScore</title>
        <script src="https://unpkg.com/vue@3.0.11/dist/vue.global.prod.js"></script>
        <link rel="stylesheet" href="/css/main.css" />
        <script src="/js/main.js"></script>
    </head>
    <body>
        <h1>EasyScore</h1>
        <div id="test-links">
            <ul>
                <test v-for="n in 3" :n="n"></test>
            </ul>
        </div>
        <script>
            const app = Vue.createApp({});

            function registerVueComponent(name, vexVersion) {
                app.component(name, {
                    props: ["n"],
                    data() {
                        return {
                            test_url: `/easyscore/test.html?vex_version=${vexVersion}&test_number=${this.n}`,
                        };
                    },
                    template: `<li><a :href="test_url" target="_blank">Test {{n}}</a> with ${vexVersion} <a class="src_code" href="${getVexURL(vexVersion)}" target="_blank">❯</a></li>`,
                });
            }

            registerVueComponent("release", VEX_RELEASE_VERSION);
            registerVueComponent("current", "current-easyscore");

            let local = "";
            if (isLocalHost()) {
                registerVueComponent("local", "localhost");
                local = `<local v-bind:n="n"/>`;
            }

            app.component("test", {
                props: ["n"],
                template: `<release v-bind:n="n"/><current v-bind:n="n"/>${local}<br />`,
            });

            app.mount("#test-links");
        </script>
    </body>
</html>

*/
