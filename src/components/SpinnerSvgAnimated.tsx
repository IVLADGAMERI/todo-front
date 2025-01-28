import s from "./SpinnerSvgAnimated.module.css";

function SpinnerSvgAnimated(props: {className?: string}) {
    return (
        <i className={`${s.spinner} ${props.className} bi bi-arrow-clockwise`}></i>
    )
}

export default SpinnerSvgAnimated;