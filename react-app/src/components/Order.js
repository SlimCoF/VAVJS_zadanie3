import React from "react";

function Order(props) {
    const style = {
        width: "280px",
        'textAlign': "center"
    };
    function MouseOver(event) {
        event.target.style.background = '#00FFFF';
    };
    function MouseOut(event) {
        event.target.style.background = "";
    };

    function click() {
        if (props.orderOpen) {
            props.editOpen(false);
        } else {
            props.editOpen(true);
        }
    }

    function kupitKosik() {
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


    if (props.orderOpen) {
        return (
            <div className="objednavka">
                <h2 onClick={click} style={style}>Zatvoriť</h2>
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
    } else {
        return (
            <div className="objednavka">
                <h2 onClick={click} style={style} onMouseEnter={MouseOver} onMouseOut={MouseOut}>Pokračovať v objednávke</h2>
            </div >
        );
    }
}

export default Order;