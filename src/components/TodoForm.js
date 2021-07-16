import React from "react";
import shortid from "shortid";

export default class TodoForm extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            text:""
        };
    }
    
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
        console.log(this.state);
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.onSubmit({
            id: shortid.generate(),
            text:this.state.text,
            complete: false
        });
        this.setState({
            text:""
        });
    }

    render(){
        return(
        <form className="todo-form"onSubmit={this.handleSubmit}>
            <input className="todo-form-input" name="text" placeholder="Todo..." value={this.state.text} onChange={this.handleChange}></input>
            <button className="button" onSubmit={this.handleSubmit} type="submit">Add</button>
        </form>
        );
    }
}