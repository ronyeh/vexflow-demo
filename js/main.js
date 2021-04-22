function addScriptTag(src, onload) {
    var s = document.createElement("script");
    s.onload = onload;
    s.src = src;
    document.body.appendChild(s);
}
