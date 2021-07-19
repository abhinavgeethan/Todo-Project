import React from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

export default class TodoList extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            todos:[],
            todosToShow:"All",
            openModal:false
        };
        console.log("In ToDo");
        console.log(props);
    }
    
    componentDidMount(){
        console.log("Mounted");
        const data=JSON.parse(localStorage.getItem('state'));
        if (data){
        this.setState(state=>({
            todos:data.todos,
            todosToShow:data.todosToShow
        }));
        }
    }
    addTodo=(todo)=>{
        this.setState(state => ({
            todos: [todo,...state.todos]
        }));
        this.autoSave();
    }

    toggleComplete=(id)=>{
        this.setState(state => ({
            todos: state.todos.map(todo =>{
                if (todo.id === id){
                    return{
                        ...todo,
                        complete: !todo.complete
                    }
                }else{
                    return todo;
                }
            })
        }));
        this.autoSave();
    }

    updateTodosToShow=(s)=>{
        this.setState({
            todosToShow:s
        });
        this.autoSave();
    }

    onDelete=(id,text)=>{
        alert("Deleting: \""+text+"\".");
        this.setState(state => ({
            todos: state.todos.filter(todo => todo.id !== id)
        }));
        this.autoSave();
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

    render(){
        
        let todos=[]
        let empty=false
        if(this.state.todosToShow==="Complete"){
            todos=this.state.todos.filter(todo=>todo.complete);
            if (todos.length === 0){
                empty=true
            }
        }
        else if (this.state.todosToShow==="Active"){
            todos=this.state.todos.filter(todo=>!todo.complete);
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
                        <div className="todo-view">{this.state.todosToShow}</div>
                        <div className="todo-container">
                            {(!empty)?todos.map(todo => (
                                <Todo key={todo.id} toggleComplete={()=> this.toggleComplete(todo.id)} onDelete={()=>this.onDelete(todo.id,todo.text)}todo={todo}></Todo>
                                )):<div>Nothing to see here.</div>}
                        </div>
                        {(this.state.todos.some(todo=> todo.complete)&&this.state.todosToShow!=="Active")?<button className="button" onClick={this.deleteCompleted}>Remove Completed</button>:null}
                        <div className="sort-buttons">
                            <button className="button" style={{backgroundColor:'var(--palette-1)'}} onClick={()=>this.updateTodosToShow("All")}>All</button>
                            <button className="button" style={{backgroundColor:'var(--palette-3)'}} onClick={()=>this.updateTodosToShow("Active")}>Active</button>
                            <button className="button" style={{backgroundColor:'var(--palette-2)'}} onClick={()=>this.updateTodosToShow("Complete")}>Completed</button>
                        </div>
                        <div className="adder">
                            {/* <span className="material-icons-outlined adder-text">add_circle</span> */}
                            <TodoForm onSubmit={this.addTodo}></TodoForm>
                        </div>
                    </div>
                    <button className="button" style={{backgroundColor:'var(--palette-2)',marginTop:'5px',marginBottom:'5px'}} onClick={()=>{for (let i=0;i<2;i++) {this.autoSave();}}}>Save Progress</button>
                    <button className="button" style={{backgroundColor:'var(--palette-2)',marginTop:'5px',marginBottom:'5px'}} >Log Out</button>
                </div>
            );
    }
}