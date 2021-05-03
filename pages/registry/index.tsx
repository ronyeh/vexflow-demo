import Build from "app/build";
import ListOfTests from "app/components/ListOfTests";
import Tests_Registry from "app/tests/Tests_Registry";

export default function RegistryPage({ vexFiles }) {
    return <ListOfTests vexFiles={vexFiles} testInfo={Tests_Registry.getInfo()} />;
}

export async function getStaticProps(context) {
    return {
        props: { vexFiles: await Build.getArrayOfVexFlowJSFiles() },
    };
}
