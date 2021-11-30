import React from 'react';

function Products(props){
    function delElement(id){
        props.delete(id);
    }

    function changeElement(id){
        let newValue = document.getElementById(id).value;
        props.change(id, newValue);
    }
    function rows(){
        return props.data.map((element)=>{
            return (
                <tr key={element.id}>
                    <td>{element.nazov}</td>
                    <td><button onClick={e => {delElement(element.id)}}>X</button></td>
                    <td><input type="text" id={element.id}></input></td>
                    <td><button onClick={e => {changeElement(element.id)}}>Change</button></td>
                </tr>
            );
        });
    }
    return (
        <div className="row">
            <table border="1">
                <thead>
                    <tr>
                        <th>Nazov</th>
                        <th>DEL</th>
                        <th>novy nazov</th>
                        <th>CHANGE</th>
                    </tr>
                </thead>
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