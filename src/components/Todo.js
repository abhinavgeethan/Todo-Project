import React from "react";
import "./Todo.css";

export default function Todo(props) {
    const completed=props.todo.completed
    const isOverdue=props.isOverdue(props.todo.datetime) || completed
    const hours=props.todo.datetime.getHours()
    const minutes=props.todo.datetime.getMinutes()
    return(
    <div className="todo-item" style={{
        backgroundColor:completed?'rgba(var(--palette-2),0.8)':(isOverdue?'rgba(var(--palette-3),0.8)':"white"),
        borderColor:isOverdue?"transparent":'rgba(var(--palette-3))'
        }}>
        {completed?<span class="material-icons-outlined todo-item-check-circle" style={{color:!isOverdue?'black':'#f7fff7bb'}} onClick={props.toggleComplete} >check_circle</span>:<span class="material-icons-outlined todo-item-check-circle" style={{color:!isOverdue?'black':'#f7fff7bb'}} onClick={props.toggleComplete} >circle</span>}
        <div className="todo-item-data">
            <div className="todo-item-data-text"style={{textDecoration: completed?"line-through":""}} onClick={props.toggleComplete}>{props.todo.text}</div>
            <div className="todo-item-data-time"style={{textDecoration: completed?"line-through":""}} onClick={props.toggleComplete}>{isOverdue&&!completed?'Overdue from':'Due'}: {props.isToday(props.todo.datetime)?"Today":(props.isTomorrow(props.todo.datetime)?"Tomorrow":props.todo.datetime.toLocaleDateString())} at {hours>12?hours-12:hours}:{minutes<10?("0"+minutes):minutes} {hours>12?"pm":"am"}</div>
        </div>
        <button className="todo-item-delete" onClick={props.onDelete}>X</button>
    </div>
    );
};