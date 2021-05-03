import fs from "fs/promises";
import path from "path";

// Only use this at Next.js build time.
namespace Build {
    export async function getArrayOfVexFlowJSFiles() {
        const jsDir = path.join(process.cwd(), "public/js");
        const files = await fs.readdir(jsDir);
        return files.filter(function (file) {
            return file.startsWith("vexflow") && path.extname(file).toLowerCase() === ".js";
        });
    }
}
export default Build;
