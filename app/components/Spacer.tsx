interface Props {
    width?: number;
}
const Spacer = ({ width }: Props) => {
    if (width === undefined) {
        width = 10;
    }
    return (
        <>
            <div style={{ width: width + "px" }}></div>
            <style jsx>{`
                div {
                    display: inline-block;
                }
            `}</style>
        </>
    );
};

export default Spacer;
