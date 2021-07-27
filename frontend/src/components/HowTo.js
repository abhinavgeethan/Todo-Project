import React from "react";
import Modal from "react-responsive-modal";
import './ModalStyle.css';
import './Todo.css';


export default class HowTo extends React.Component{
    
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
                <div style={{backgroundColor:"black",color:"white",marginTop:"20px"}}>
                    <h1 style={{color:"rgba(var(--palette-2))",marginTop:"10px",marginLeft:"10px",marginRight:"10px"}}>How To Use</h1>
                    <ol>
                        <li>
                            <h3 style={{color:"rgba(var(--palette-2))"}}>Adding ToDos</h3>
                            <p>
                                You can add todos by clicking the <b>Add Todo</b> button right next to the How To Use button.
                                Just give your todo a good name and use the datepicker to pick when it's due and you're good to go!
                            </p>
                        </li>
                        <li>
                            <h3 style={{color:"rgba(var(--palette-2))"}}>Changing Views</h3>
                            <p>
                                You can change the view by clicking the arrow next to <b>Today</b> on the top right or hovering over that area.
                                <br></br>
                                <br></br>
                                <b>All</b>: This view shows all your Todos.
                                <br></br>
                                <b>Today</b>: This view shows Todos scheduled for today.
                                <br></br>
                                <b>This Week</b>: This view shows this week's schedule.
                            </p>
                        </li>
                        <li>
                            <h3 style={{color:"rgba(var(--palette-2))"}}>Marking as Completed</h3>
                            <p>
                                Clicking on any todo will toggle it's active state:
                                <br></br>
                                <br></br>
                                <b>White</b>: Upcoming.
                                <br></br>
                                <b style={{color:"rgba(var(--palette-3))"}}>Red</b>: Overdue.
                                <br></br>
                                <b style={{color:"rgba(var(--palette-2))"}}>Green</b>: Completed.
                            </p>
                        </li>
                        <li>
                            <h3 style={{color:"rgba(var(--palette-2))"}}>Filtering</h3>
                            <p>
                                You can filter the view by clicking the buttons on the bottom.
                                <br></br>
                                <br></br>
                                <b>All</b>: Shows all your Todos.
                                <br></br>
                                <b style={{color:"rgba(var(--palette-3))"}}>Active</b>: Only shows Todos that are yet to be completed.
                                <br></br>
                                <b style={{color:"rgba(var(--palette-2))"}}>Completed</b>: Only shows completed Todos.
                            </p>
                        </li>
                        <li>
                            <h3 style={{color:"rgba(var(--palette-2))"}}>Deleting ToDos</h3>
                            <p>
                                You can delete any todo by clicking the <b>X</b> button right next to it. Once you confirm your decision it will be deleted permanently.
                            </p>
                        </li>
                    </ol>
                    <br></br>
                </div>
            </Modal>
        </div>
        );
    }
}