import { Button } from "react-bootstrap";

function AddTaskButton(props: {onClick: (event: any) => void}) {
    return (
        <Button onClick={props.onClick} variant="outline-primary" className="rounded-2 p-1 mb-1 w-100"><h6 className="m-0">+</h6></Button>
    )
}

export default AddTaskButton;