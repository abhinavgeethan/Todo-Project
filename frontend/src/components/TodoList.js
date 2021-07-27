import React from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import "./burgerMenu.css";
import "./dropdown.css";
import {logout,authFetch} from "../auth/index.js";
import HowTo from "./HowTo";
import configData from "../config.json";

export default class TodoList extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            todos:[],
            todosToShow:"All",
            view:"Today",
            openModal:false,
            user_id:0,
            name:"User",
            server_inactive:false,
            processing:false,
            openBurgerMenu:false,
            openViewDropdown:false
        };
        this.logoutHandler=(bool_val)=>{
            console.log("Logging Out.");
            // this.setState({processing:true});
            logout();
            // this.setState({processing:false});
            props.logoutHandler(bool_val);
        };
    }

    componentDidMount(){
        console.log("Mounted");
        authFetch(configData.SERVER_URL+"data/fetch")
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
                        user_id:data.data[0].user_id,
                        name:data.name
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
        this.setState({processing:true});
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id": todo.id,"user_id":this.state.user_id,"text":todo.text,"datetime":todo.datetime,"completed":todo.complete})
        };
        let new_todo={}
        authFetch(configData.SERVER_URL+"data/add",requestOptions)
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
        this.setState({processing:false});
    }

    toggleComplete=(todo)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id": todo.id,"user_id":this.state.user_id,"completed":(!todo.completed)})
        };
        this.setState({processing:true});
        authFetch(configData.SERVER_URL+"data/update",requestOptions)
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
        this.setState({processing:true});
    }

    updateTodosToShow=(s)=>{
        this.setState({
            todosToShow:s
        });
    }
    
    updateView=(s)=>{
        this.setState({
            view:s
        });
    }

    onDelete=(todo)=>{
        let resp=window.confirm("Deleting: \""+todo.text+"\".\nClick OK to confirm.");
        if (resp){
            this.setState({processing:true});
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"id": todo.id,"user_id":this.state.user_id})
            };
            authFetch(configData.SERVER_URL+"data/delete",requestOptions)
                .then(r=>r.json())
                .then(data=>{
                    if (data.deleted){
                        console.log("Deleted Successfully.")
                        this.setState(state => ({
                            todos: state.todos.filter(todo_itr => todo_itr.id !== todo.id)
                        }));
                    }
                })
            this.setState({processing:false});
        }
    }
    
    // Fix This
    deleteCompleted=()=>{
        this.setState(state => ({
            todos: state.todos.filter(todo => !todo.complete)
        }));
    }

    autoSave=()=>{
        if (this.state.todos){
            localStorage.setItem('state',JSON.stringify(this.state))
        }
    }
    // Date Stuff
    isOverdue=(datetime)=>{
        let now=new Date();
        return (now>datetime)
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
    
    isThisWeek=(datetime)=>{
        let dayDuration=1000*60*60*24
        let today=new Date();
        today.setMilliseconds(0);
        today.setSeconds(0);
        today.setMinutes(0);
        today.setHours(0);
        let week_start=new Date(today.getTime()-(dayDuration*(today.getDay())));
        let week_end=new Date(week_start.getTime()+(dayDuration*7));
        return ((datetime>week_start)&&(datetime<week_end))
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
        if(this.state.view==="Today"){
            todos=this.state.todos.filter(todo=>this.isToday(todo.datetime));
            if (todos.length === 0){
                empty=true
            }
        }else if (this.state.view==="This Week"){
            todos=this.state.todos.filter(todo=>this.isThisWeek(todo.datetime));
            if (todos.length === 0){
                empty=true
            }
        }else{
            todos=this.state.todos;
            if (todos.length === 0){
                empty=true
            }
        }
        if(this.state.todosToShow==="Complete"){
            todos=todos.filter(todo=>todo.completed);
            if (todos.length === 0){
                empty=true
            }
        }
        else if (this.state.todosToShow==="Active"){
            todos=todos.filter(todo=>!todo.completed);
            if (todos.length === 0){
                empty=true
            }
        }
        else{
            // todos=todos;
            if (todos.length === 0){
                empty=true
            }
        }
        todos.sort((a,b)=>b.datetime-a.datetime);
        
        var days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return(
            <div className="main">
                <div className={this.state.openBurgerMenu?"menu-wrapper isactive":"menu-wrapper isinactive"}>
                    <div class="content-title burger-inner">Todo WebApp</div>
                    <button className="function-btn burger-inner" onClick={()=>{this.logoutHandler(true)}}>Log Out</button>
                    <button className="function-btn burger-inner" onClick={()=>{window.open("https://github.com/abhinavgeethan/Todo-Project")}}>GitHub</button>
                    <a className="burger-inner" onClick={()=>{window.open("https://github.com/abhinavgeethan/Todo-Project/blob/main/Resources.md")}}>Credits and Resources</a>
                </div>
                <div className="header">
                    <div className="content-title">Todo WebApp</div>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <button className="logout-btn" onClick={()=>{window.open("https://github.com/abhinavgeethan/Todo-Project")}}>GitHub</button>
                        <button className="logout-btn" onClick={()=>{this.logoutHandler(true)}}>Log Out</button>
                    </div>
                    <div class="hamburger" onClick={()=>{this.setState({openBurgerMenu:!this.state.openBurgerMenu})}}>
                        <span class={this.state.openBurgerMenu?"bar bar1-active":"bar"}></span>
                        <span class={this.state.openBurgerMenu?"bar bar2-active":"bar"}></span>
                        <span class={this.state.openBurgerMenu?"bar bar3-active":"bar"}></span>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="count">Welcome {this.state.name},</div>
                     {/* <div className="count">You have {(todos.filter(todo=>!todo.complete).length===0)?"no":todos.filter(todo=>!todo.complete).length} todos left.</div>  */}
                    <div className="todo-wrapper">
                        {/* <div className="todo-view">{this.state.todosToShow}</div> */}
                        <div className="todo-view" onMouseEnter={()=>{this.setState({openViewDropdown:true})}} onMouseLeave={()=>{this.setState({openViewDropdown:false})}}>
                            <div className="todo-view-status">
                                <span style={{cursor:"pointer"}} onClick={()=>{this.setState({openViewDropdown:!this.state.openViewDropdown})}}>{this.state.view}</span>
                                <div class="caret" style={{cursor:"pointer"}} onClick={()=>{this.setState({openViewDropdown:!this.state.openViewDropdown})}}>
                                    <span className={this.state.openViewDropdown?"caret-bar1 caret-bar1-active":"caret-bar1"}></span>
                                    <span className={this.state.openViewDropdown?"caret-bar2 caret-bar2-active":"caret-bar2"}></span>
                                </div>
                            </div>
                            <div className={this.state.openViewDropdown?"view-dropdown view-dropdown-active":"view-dropdown"}>
                                <button className="button view-btn" style={{backgroundColor:this.state.view==="All"?('rgba(var(--palette-1))'):('transparent')}} onClick={()=>this.updateView("All")}>All</button> 
                                <button className="button view-btn" style={{backgroundColor:this.state.view==="Today"?('rgba(var(--palette-1))'):('transparent')}} onClick={()=>this.updateView("Today")}>Today</button> 
                                <button className="button view-btn" style={{backgroundColor:this.state.view==="This Week"?('rgba(var(--palette-1))'):('transparent')}} onClick={()=>this.updateView("This Week")}>This Week</button>
                            </div>
                        </div>
                        <div className="todo-container">
                            {(!empty)?
                            ((!(this.state.view==="This Week"))?
                            todos.map(todo => (<Todo key={todo.id} toggleComplete={()=> this.toggleComplete(todo)} onDelete={()=>this.onDelete(todo)} isToday={this.isToday} isTomorrow={this.isTomorrow} isOverdue={this.isOverdue} todo={todo}></Todo>)):
                            (
                                 <div className="week-view"> 
                                     {days.map(day=> 
                                     (<div className="week-day-view"> 
                                         <span className="week-day-title">{day}</span> 
                                         {/* <hr size="1px" width="90%" color="black"></hr>  */}
                                         {todos.filter(todo=>day===days[todo.datetime.getDay()]).length?todos.filter(todo=>day===days[todo.datetime.getDay()]).map(todo => (<Todo key={todo.id} toggleComplete={()=> this.toggleComplete(todo)} onDelete={()=>this.onDelete(todo)} isToday={this.isToday} isTomorrow={this.isTomorrow} isOverdue={this.isOverdue} todo={todo}></Todo>)):<span className="empty-weekday">You're free this day.</span>} 
                                     </div>))} 
                                 </div> 
                                 )): 
                                 ((this.state.server_inactive)? 
                                 (<div>Could not connect to the server. Try refreshing.</div>): 
                                 (<div>Nothing to see here.</div>))} 
                         </div> 
                         {(this.state.todos.some(todo=> todo.complete)&&this.state.todosToShow!=="Active")?<button className="button" onClick={this.deleteCompleted}>Remove Completed</button>:null} 
                         <div className="controls"> 
                             {/* <div className="sort-buttons"> 
                                 <span>View: </span> 
                                 <button className="button view-btn" style={{backgroundColor:this.state.view==="All"?('rgba(var(--palette-1))'):('rgba(var(--palette-1),0.7)')}} onClick={()=>this.updateView("All")}>All</button> 
                                 <button className="button view-btn" style={{backgroundColor:this.state.view==="Today"?('rgba(var(--palette-3))'):('rgba(var(--palette-3),0.7)')}} onClick={()=>this.updateView("Today")}>Today</button> 
                                 <button className="button view-btn" style={{backgroundColor:this.state.view==="This Week"?('rgba(var(--palette-2))'):('rgba(var(--palette-2),0.7)')}} onClick={()=>this.updateView("This Week")}>This Week</button> 
                             </div>  */}
                             <div className="sort-buttons"> 
                                 <span style={{paddingRight:"5px"}}>Filter by:</span> 
                                 <button className="button view-btn" style={{backgroundColor:this.state.todosToShow==="All"?('rgba(var(--palette-1))'):('rgba(var(--palette-1),0.7)')}} onClick={()=>this.updateTodosToShow("All")}>All</button> 
                                 <button className="button view-btn" style={{backgroundColor:this.state.todosToShow==="Active"?('rgba(var(--palette-3))'):('rgba(var(--palette-3),0.7)')}} onClick={()=>this.updateTodosToShow("Active")}>Active</button> 
                                 <button className="button view-btn" style={{backgroundColor:this.state.todosToShow==="Complete"?('rgba(var(--palette-2))'):('rgba(var(--palette-2),0.7)')}} onClick={()=>this.updateTodosToShow("Complete")}>Completed</button> 
                             </div> 
                             <div className="function-btns"> 
                                 {/* <button className="button function-btn" onClick={()=>{for (let i=0;i<2;i++) {this.autoSave();}}}>Save Progress</button>  */}
                                 {/* <button className="function-btn" onClick={()=>{this.logoutHandler(true)}}>Log Out</button> */}
                                 <HowTo></HowTo>
                                 <div className="adder"> 
                                     {/* <span className="material-icons-outlined adder-text">add_circle</span>  */}
                                     <TodoForm onSubmit={this.addTodo}></TodoForm> 
                                 </div> 
                             </div> 
                         </div> 
                     </div> 
                 </div> 
            </div>
            );
    }
}