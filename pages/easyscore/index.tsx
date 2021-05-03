import Build from "app/build";
import ListOfTests from "app/components/ListOfTests";
import Tests_EasyScore from "app/tests/Tests_EasyScore";

export default function EasyScorePage({ vexFiles }) {
    return <ListOfTests vexFiles={vexFiles} testInfo={Tests_EasyScore.getInfo()} />;
}

export async function getStaticProps(context) {
    return {
        props: { vexFiles: await Build.getArrayOfVexFlowJSFiles() },
    };
}
