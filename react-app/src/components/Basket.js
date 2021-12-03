import React from 'react';

function Basket(props) {

    const style = {
        width: "280px",
        'text-align': "center"
    };
    function MouseOver(event) {
        event.target.style.background = '#00FFFF';
    };
    function MouseOut(event) {
        event.target.style.background = "";
    };

    function click() {
        if (props.basketOpen) {
            props.editOpen(false);
        } else {
            props.editOpen(true);
        }
    }

    function odoberProdukt(id) {
        props.odober(id);
    }
    function basketProducts() {
        return props.basket.map((element, index) => {
            return (
                <tr key={index}>
                    <td><img width="80" src={element.img}></img></td>
                    <td>{element.nazov}</td>
                    <td>{(element.cena * element.mnozstvo).toFixed(2)} €</td>
                    <td>{element.mnozstvo} ks</td>
                    <td><button onClick={e => { odoberProdukt(element.id) }}>Odobrať</button></td>
                </tr>
            );
        });
    }
    function sumaKosiku() {
        let sum = 0;

        props.basket.forEach(element => {
            sum += parseFloat((element.cena * element.mnozstvo));
        });
        return (
            <p>Spolu: {sum.toFixed(2)}</p>
        );
    }

    if (props.basketOpen) {
        return (
            <div className="kosik">
                <h2 onClick={click} style={style}>Zatvoriť košík</h2>
                <table border="1">
                    <tbody>
                        {
                            basketProducts()
                        }
                    </tbody>
                </table>
                {
                    sumaKosiku()
                }
            </div>
        );
    } else {
        return (
            <div className="kosik">
                <h2 onClick={click} style={style} onMouseEnter={MouseOver} onMouseOut={MouseOut}>Otvoriť košík</h2>
            </div>
        );
    }
}

export default Basket;