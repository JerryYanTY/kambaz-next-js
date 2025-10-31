import { ListGroupItem } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {addTodo, updateTodo, setTodo} from "./todosReducer";

export default function TodoForm() 
{
    const {todo} = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
  return (
    <ListGroupItem
    className="d-flex align-items-center">
      <span className="me-3"><FormControl
        defaultValue={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      /></span>
      <div>
      <Button 
      className="me-2 btn btn-warning"
      onClick={() => dispatch(updateTodo(todo))} id="wd-update-todo-click">
        {" "}
        Update{" "}
      </Button>
      <Button 
      className="me-2 btn btn-success"
      onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click">
        {" "}
        Add{" "}
      </Button>

      </div>
    </ListGroupItem>
  );
}
