namespace Constants {
    export const VEX_RELEASE_VERSION = "3.0.9";
}

namespace App {
    export function isLocalHost() {
        if (typeof window !== "undefined") {
            return window.location.host.startsWith("127.0.0.1") || window.location.host.startsWith("localhost");
        } else {
            return false;
        }
    }

    export function getVexVersionAndURL(queryParams) {
        let vexVersion = queryParams.vex_version; // e.g., vexflow.version.number || current || localhost || current-easyscore, etc.
        let vexURL = "";
        if (!vexVersion || vexVersion.startsWith("3")) {
            vexVersion = Constants.VEX_RELEASE_VERSION;
            vexURL = `https://unpkg.com/vexflow@${vexVersion}/releases/vexflow-debug.js`;
        } else {
            vexURL = `/js/vexflow-${vexVersion}.js?` + Math.random();
        }
        return { vexVersion, vexURL };
    }

    export function ensureTrailingSlash(path) {
        if (path.endsWith("/")) {
            return path;
        } else {
            return path + "/";
        }
    }

    // Search through the vexFiles array for an appropriate JS file to load on the client side.
    export function getVexFlowJSFileForCurrentPath(pathname, vexFiles): string {
        const pathParts = pathname.split("/");
        const parentPathName = pathParts[pathParts.length - 1];
        const vexVersionForCurrentPath = "current-" + parentPathName;
        if (vexFiles.includes(vexVersionForCurrentPath + ".js")) {
            return vexVersionForCurrentPath;
        } else {
            return "current";
        }
    }
}

export { Constants };
export default App;
