import Build from "app/build";
import ListOfTests from "app/components/ListOfTests";
import Tests from "app/easyscore-tests";

export default function EasyScorePage({ vexFiles }) {
    return <ListOfTests title={Tests.TITLE} numTests={Tests.NUM_TESTS} vexFiles={vexFiles} />;
}

export async function getStaticProps(context) {
    return {
        props: { vexFiles: await Build.getArrayOfVexFlowJSFiles() },
    };
}
