import React from "react";

function Order(props){
    function kupitKosik(){
        let values = {
            "name": document.getElementById('name').value,
            "email": document.getElementById('email').value,
            "street": document.getElementById('street').value,
            "number": document.getElementById('number').value,
            "city": document.getElementById('city').value,
            "psc": document.getElementById('psc').value,
        };
        props.buy(values);
    }
    return (
        <div className="objednavka">
            <h2>Objednávka</h2>
            <p>Meno:</p>
            <input type="text" id="name"></input>
            <p>E-mail:</p>
            <input type="text" id="email"></input>
            <p>Ulica:</p>
            <input type="text" id="street"></input>
            <p>Číslo:</p>
            <input type="text" id="number"></input>
            <p>Mesto:</p>
            <input type="text" id="city"></input>
            <p>PSČ:</p>
            <input type="text" id="psc"></input>
            <p>
                <button onClick={kupitKosik}>Kúpiť</button>
            </p>
        </div>
    );
}

export default Order;