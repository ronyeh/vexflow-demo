function addScriptTag(src, onload) {
    var s = document.createElement("script");
    s.onload = onload;
    s.src = src;
    document.body.appendChild(s);
}

VEX_RELEASE_VERSION = "3.0.9";
