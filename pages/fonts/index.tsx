import Tests from "app/tests/Tests_Font";
import TestPageProps from "app/tests/TestPageProps";
import ListOfTests from "app/components/ListOfTests";

const frontMatter = (
    <p>
        Open the test pages below and switch between browser tabs to compare.
        <br />
        See the{" "}
        <a href="/images/font_sample.svg" target="_blank">
            Bravura &amp; Petaluma font sample
        </a>{" "}
        generated with this{" "}
        <a href="/images/font_sample.afdesign" target="_blank">
            Affinity Designer file
        </a>
        .<br />
        See the{" "}
        <a href="/images/lilypond-gonville.svg" target="_blank">
            Gonville font sample
        </a>{" "}
        generated with this{" "}
        <a href="/images/score.ly" target="_blank">
            LilyPond score
        </a>
        .
    </p>
);

export default function Page({ vexFiles }) {
    return <ListOfTests vexFiles={vexFiles} testInfo={Tests.getInfo()} />;
}

export const getStaticProps = TestPageProps.getStaticProps;
