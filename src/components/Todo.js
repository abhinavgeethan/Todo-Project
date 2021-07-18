import React from "react";
import "./Todo.css";

export default function Todo(props) {
    return(<div className="todo-item" style={{backgroundColor:props.todo.complete?'var(--palette-2)':'var(--palette-3)'}}>
        {props.todo.complete?<span class="material-icons-outlined todo-item-check-circle" onClick={props.toggleComplete} >check_circle</span>:<span class="material-icons-outlined todo-item-check-circle" onClick={props.toggleComplete} >circle</span>}
        <div className="todo-item-text"style={{textDecoration: props.todo.complete?"line-through":""}} onClick={props.toggleComplete}>{props.todo.text}</div>
        <button className="todo-item-delete" onClick={props.onDelete}>X</button>
    </div>)
};