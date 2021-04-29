function addScriptTag(src, onload) {
    var s = document.createElement("script");
    s.onload = onload;
    s.src = src;
    document.body.appendChild(s);
}

const VEX_RELEASE_VERSION = "3.0.9";

function isLocalHost() {
    return window.location.host.startsWith("127.0.0.1") || window.location.host.startsWith("localhost");
}

const urlParams = new URLSearchParams(window.location.search);
function getVexURL(vexVer /* optional version argument */) {
    // If the optional version argument is not specified, we get it from the query params.
    let vexVersion = vexVer ?? urlParams.get("vex_version"); // vexflow.version.number || current || localhost
    let scriptSRC = "";
    if (vexVersion === null || vexVersion.startsWith("3")) {
        vexVersion = VEX_RELEASE_VERSION;
        scriptSRC = `https://unpkg.com/vexflow@${vexVersion}/releases/vexflow-debug.js`;
    } else {
        scriptSRC = `/js/vexflow-${vexVersion}.js?` + Math.random();
    }
    return { vexVersion, scriptSRC };
}
