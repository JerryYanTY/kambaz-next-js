"use client";
import { ListGroupItem } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";


export default function TodoItem({todo}:{todo:any}) {
    const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id}
    className="d-flex justify-content-between align-items-center">
      <span>{todo.title}{" "}</span>
      <div>
      <Button 
      className="me-2 btn btn-primary"
      onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click">
        {" "}
        Edit{" "}
      </Button>
      <Button 
      className="me-2 btn btn-danger"
      onClick={() => dispatch(deleteTodo(todo.id))} id="wd-delete-todo-click">
        {" "}
        Delete{" "}
      </Button>
      </div>
    </ListGroupItem>
  );
}
