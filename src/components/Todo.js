import React from "react";
import "./Todo.css";

export default function Todo(props) {
    return(
    <div className="todo-item" style={{backgroundColor:props.todo.completed?'rgba(var(--palette-2))':'rgba(var(--palette-3))'}}>
        {props.todo.completed?<span class="material-icons-outlined todo-item-check-circle" onClick={props.toggleComplete} >check_circle</span>:<span class="material-icons-outlined todo-item-check-circle" onClick={props.toggleComplete} >circle</span>}
        <div className="todo-item-data">
            <div className="todo-item-data-text"style={{textDecoration: props.todo.completed?"line-through":""}} onClick={props.toggleComplete}>{props.todo.text}</div>
            <div className="todo-item-data-time"style={{textDecoration: props.todo.completed?"line-through":""}} onClick={props.toggleComplete}>Due: {props.isToday(props.todo.datetime)?"Today":(props.isTomorrow(props.todo.datetime)?"Tomorrow":props.todo.datetime.toLocaleDateString())} at {props.todo.datetime.getHours()>12?props.todo.datetime.getHours()-12:props.todo.datetime.getHours()}:{props.todo.datetime.getMinutes()<10?("0"+props.todo.datetime.getMinutes()):props.todo.datetime.getMinutes()} {props.todo.datetime.getHours()>12?"pm":"am"}</div>
        </div>
        <button className="todo-item-delete" onClick={props.onDelete}>X</button>
    </div>
    );
};