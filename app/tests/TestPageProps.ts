import Build from "app/build";

namespace TestPageProps {
    export async function getStaticProps(context) {
        return {
            props: { vexFiles: await Build.getArrayOfVexFlowJSFiles() },
        };
    }
}
export default TestPageProps;
