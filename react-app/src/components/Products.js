import React from 'react';

function Products(props){
    function pridajProdukt(id){
        props.pridaj(id);
    }
    function rows(){
        return props.data.map((element, index)=>{
            
            return (
                <tr key={index}>
                    <td><img width="80" src={element.img}></img></td>
                    <td>{element.nazov}</td>
                    <td>{element.cena} €</td>
                    <td><button onClick={e => {pridajProdukt(element.id)}}>Pridať</button></td>
                </tr>
            );
        });
    }
    return (
        <div className="produkty">
            <h2>Produkty</h2>
            <table border="1">
                {/* <thead>
                    <tr>
                        <th>Obrazok</th>
                        <th>Nazov</th>
                        <th>Cena</th>
                        <th>Pridať</th>
                    </tr>
                </thead> */}
                <tbody>
                    {
                        rows()
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Products;