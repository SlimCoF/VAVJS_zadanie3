import React from 'react';

function Basket(props){
    function odoberProdukt(id){
        props.odober(id);
    }
    function basketProducts(){
        return props.data.map((element, index)=>{
            return (
                <tr key={index}>
                    <td><img width="80" src={element.img}></img></td>
                    <td>{element.nazov}</td>
                    <td>{(element.cena * element.mnozstvo).toFixed(2)} €</td>
                    <td>{element.mnozstvo} ks</td>
                    <td><button onClick={e => {odoberProdukt(element.id)}}>Odobrať</button></td>
                </tr>
            );
        });
    }
    function sumaKosiku(){
        let sum = 0;

        props.data.forEach(element => {
            sum += parseFloat((element.cena * element.mnozstvo));
        });
        return (
            <p>Spolu: {sum.toFixed(2)}</p>
        );
    }
    return (
        <div className="kosik">
            <h2>Košík</h2>
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
}

export default Basket;