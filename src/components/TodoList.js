import React from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import {logout,authFetch} from "../auth/index.js";

export default class TodoList extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            todos:[],
            todosToShow:"All",
            view:"All",
            openModal:false,
            user_id:0,
            server_inactive:false
        };
        this.logoutHandler=(bool_val)=>{
            console.log("Logging Out.");
            logout();
            props.logoutHandler(bool_val);
        };
    }

    componentDidMount(){
        console.log("Mounted");
        authFetch("http://127.0.0.1:5000/data/fetch")
            .then(r=>r.json())
            .then(data=>{
                if (data.data){
                    let new_todos=[]
                    data.data.forEach(x => {
                        new_todos.push({"id":x.id,"user_id":x.user_id,"text":x.text,"datetime":new Date(x.datetime),"completed":x.completed})
                    });
                    this.setState({
                        todos:new_todos,
                        todosToShow:"All",
                        user_id:data.data[0].user_id
                    });
                }
            })
            .catch(error=>{
                console.error("Inactive Server");
                console.error(error);
                this.setState({
                    server_inactive:true
                });
            })
    }

    addTodo=(todo)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id": todo.id,"user_id":this.state.user_id,"text":todo.text,"datetime":todo.datetime,"completed":todo.complete})
        };
        let new_todo={}
        authFetch("http://127.0.0.1:5000/data/add",requestOptions)
            .then(r=>r.json())
            .then(data=>{
                if (data.added){
                    // console.log(data.data);
                    new_todo={"id":data.data[0].id,"user_id":data.data[0].user_id,"text":data.data[0].text,"datetime":new Date(data.data[0].datetime),"complete":data.data[0].completed}
                    // console.log(new_todo);
                    this.setState(state => ({
                        todos: [new_todo,...state.todos]
                    }));
                }
            })
        // this.autoSave();
    }

    toggleComplete=(todo)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id": todo.id,"user_id":this.state.user_id,"completed":(!todo.completed)})
        };
        authFetch("http://127.0.0.1:5000/data/update",requestOptions)
            .then(r=>r.json())
            .then(data=>{
                console.log("Todo Updated");
                if (data.updateCompleted){
                    this.setState(state => ({
                        todos: state.todos.map(todo_itr =>{
                            if (todo_itr.id === todo.id){
                                return{
                                    ...todo_itr,
                                    completed: data.currentValue
                                }
                            }else{
                                return todo_itr;
                            }
                        })
                    }));
                }
            })
        this.autoSave();
    }

    updateTodosToShow=(s)=>{
        this.setState({
            todosToShow:s
        });
        this.autoSave();
    }
    
    updateView=(s)=>{
        this.setState({
            view:s
        });
        this.autoSave();
    }

    onDelete=(todo)=>{
        let resp=window.confirm("Deleting: \""+todo.text+"\".\nClick OK to confirm.");
        if (resp){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"id": todo.id,"user_id":this.state.user_id})
            };
            authFetch("http://127.0.0.1:5000/data/delete",requestOptions)
                .then(r=>r.json())
                .then(data=>{
                    if (data.deleted){
                        console.log("Deleted Successfully.")
                        this.setState(state => ({
                            todos: state.todos.filter(todo_itr => todo_itr.id !== todo.id)
                        }));
                    }
                })
            this.autoSave();
        }
    }
    
    deleteCompleted=()=>{
        this.setState(state => ({
            todos: state.todos.filter(todo => !todo.complete)
        }));
        this.autoSave();
    }

    autoSave=()=>{
        if (this.state.todos){
            localStorage.setItem('state',JSON.stringify(this.state))
        }
    }

    isTomorrow=(datetime)=>{
        let dayDuration=1000*60*60*24
        let today=new Date();
        today.setMilliseconds(999);
        today.setSeconds(59);
        today.setMinutes(59);
        today.setHours(23);
        let tomorrow=new Date(today.getTime()+dayDuration);
        return ((datetime>today)&&(datetime<tomorrow))
    }

    isToday=(datetime)=>{
        let today=new Date();
        let midnight=new Date();
        midnight.setMilliseconds(999);
        midnight.setSeconds(59);
        midnight.setMinutes(59);
        midnight.setHours(23);
        return ((today.getFullYear()===datetime.getFullYear())&&(today.getMonth()===datetime.getMonth())&&(today.getDate()===datetime.getDate())&&(!(this.isTomorrow(datetime))))
    }

    render(){
        
        let todos=[]
        let empty=false
        if(this.state.todosToShow==="Complete"){
            todos=this.state.todos.filter(todo=>todo.completed);
            if (todos.length === 0){
                empty=true
            }
        }
        else if (this.state.todosToShow==="Active"){
            todos=this.state.todos.filter(todo=>!todo.completed);
            if (todos.length === 0){
                empty=true
            }
        }
        else{
            todos=this.state.todos;
            if (todos.length === 0){
                empty=true
            }
        }
        
        return(
            <div className="main">
                    <div className="count">ToDos Left : {todos.filter(todo=>!todo.complete).length}</div>
                    <div className="todo-wrapper">
                        {/* <div className="todo-view">{this.state.todosToShow}</div> */}
                        <div className="todo-view">{this.state.view}</div>
                        <div className="todo-container">
                            {(!empty)?todos.map(todo => (
                                <Todo key={todo.id} toggleComplete={()=> this.toggleComplete(todo)} onDelete={()=>this.onDelete(todo)} isToday={this.isToday} isTomorrow={this.isTomorrow} todo={todo}></Todo>
                                )):this.state.server_inactive?(<div>Could not connect to the server. Try refreshing.</div>):(<div>Nothing to see here.</div>)}
                        </div>
                        {(this.state.todos.some(todo=> todo.complete)&&this.state.todosToShow!=="Active")?<button className="button" onClick={this.deleteCompleted}>Remove Completed</button>:null}
                        <div className="sort-buttons">
                            <span>View: </span>
                            <button className="button view-btn" style={{backgroundColor:this.state.view==="All"?('rgba(var(--palette-1))'):('rgba(var(--palette-1),0.7)')}} onClick={()=>this.updateView("All")}>All</button>
                            <button className="button view-btn" style={{backgroundColor:this.state.view==="Today"?('rgba(var(--palette-3))'):('rgba(var(--palette-3),0.7)')}} onClick={()=>this.updateView("Active")}>Today</button>
                            <button className="button view-btn" style={{backgroundColor:this.state.view==="This Week"?('rgba(var(--palette-2))'):('rgba(var(--palette-2),0.7)')}} onClick={()=>this.updateView("Complete")}>This Week</button>
                        </div>
                        <div className="sort-buttons">
                            <span>See: </span>
                            <button className="button view-btn" style={{backgroundColor:this.state.todosToShow==="All"?('rgba(var(--palette-1))'):('rgba(var(--palette-1),0.7)')}} onClick={()=>this.updateTodosToShow("All")}>All</button>
                            <button className="button view-btn" style={{backgroundColor:this.state.todosToShow==="Active"?('rgba(var(--palette-3))'):('rgba(var(--palette-3),0.7)')}} onClick={()=>this.updateTodosToShow("Active")}>Active</button>
                            <button className="button view-btn" style={{backgroundColor:this.state.todosToShow==="Complete"?('rgba(var(--palette-2))'):('rgba(var(--palette-2),0.7)')}} onClick={()=>this.updateTodosToShow("Complete")}>Completed</button>
                        </div>
                        <div className="function-btns">
                            <button className="button function-btn" onClick={()=>{for (let i=0;i<2;i++) {this.autoSave();}}}>Save Progress</button>
                            <button className="button function-btn" onClick={()=>{this.logoutHandler(true)}}>Log Out</button>
                        </div>
                    </div>
                        <div className="adder">
                            {/* <span className="material-icons-outlined adder-text">add_circle</span> */}
                            <TodoForm onSubmit={this.addTodo}></TodoForm>
                        </div>
                </div>
            );
    }
}