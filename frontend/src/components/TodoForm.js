import React from "react";
import shortid from "shortid";
import Modal from "react-responsive-modal";
import './ModalStyle.css';
import './Todo.css';
import DateTimePicker from 'react-datetime-picker';


export default class TodoForm extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            text:"",
            openModal:false,
            datetimeValue:new Date()
        };
    }
    
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
        // console.log(this.state);
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.onSubmit({
            id: shortid.generate(),
            text:this.state.text,
            datetime:this.state.datetimeValue,
            complete: false
        });
        this.setState({
            text:"",
            openModal:false
        });
    }

    onDateTimeChange=(datetime)=>{
        if (datetime){
            this.setState({
                datetimeValue:datetime
            })
        }else{
            this.setState({
                datetimeValue:new Date()
            })
        }
    }

    render(){
        return(
        <div>
            <button className="function-btn" onClick={()=>{this.setState({openModal:true})}}>Add Todo</button>
            <Modal open={this.state.openModal} onClose={()=>{this.setState({openModal:false})}} center>
                <form className="todo-form"onSubmit={this.handleSubmit}>
                    <h2>Add Todo</h2>
                    <label for="text">What do you have to do?</label>
                    <input className="todo-form-input" name="text" placeholder="Todo..." value={this.state.text} onChange={this.handleChange}></input>
                    <label for="dt-picker">When is it due?</label>
                    <DateTimePicker name="dt-picker" format="dd/MM/yyyy    hh:mm aa" minDetail="year" required={true} value={this.state.datetimeValue} onChange={this.onDateTimeChange}></DateTimePicker>
                    <button className="button" onSubmit={this.handleSubmit} type="submit">Submit</button>
                </form>
            </Modal>
        </div>
        );
    }
}