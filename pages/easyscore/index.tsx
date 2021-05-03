import Tests from "app/tests/Tests_EasyScore";
import TestPageProps from "app/tests/TestPageProps";
import ListOfTests from "app/components/ListOfTests";

export default function Page({ vexFiles }) {
    return <ListOfTests vexFiles={vexFiles} testInfo={Tests.getInfo()} />;
}

export const getStaticProps = TestPageProps.getStaticProps;
