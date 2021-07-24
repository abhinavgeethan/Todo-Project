import React from "react";
import Modal from "react-responsive-modal";
import './ModalStyle.css';
import './Todo.css';


export default class howTo extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            openModal:true
        };
    }
    
    render(){
        return(
        <div>
            <button className="function-btn" onClick={()=>{this.setState({openModal:true})}}>How To Use</button>
            <Modal open={this.state.openModal} onClose={()=>{this.setState({openModal:false})}} center>
                <div style={{backgroundColor:"black",color:"white"}}>
                    <h1 style={{color:"rgba(var(--palette-2))"}}>How To Use</h1>
                    <ol>
                        <li>
                            <h3 style={{color:"rgba(var(--palette-2))"}}>Adding ToDos</h3>
                            <p>
                                You can add todos by clicking the <b>Add Todo</b> button right next to the How To Use button.
                                Just give your todo a good name and use the datepicker to pick when it's due and you're good to go!
                            </p>
                        </li>
                    </ol>
                </div>
            </Modal>
        </div>
        );
    }
}