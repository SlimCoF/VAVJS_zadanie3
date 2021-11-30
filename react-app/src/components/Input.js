import React from "react";

function Input(props){
    function addElement(){
        let val = document.getElementById('in').value;
        props.callback(val);
    }
    return (
        <div className="row">
            <input type="text" id="in"></input>
            <button onClick={addElement}>Add</button>
        </div>
    );
}

export default Input;