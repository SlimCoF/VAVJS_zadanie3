import React, {useEffect,useState} from 'react';
import Products from './components/Products.js'; 
import Basket from './components/Basket.js'; 
import Order from './components/Order.js'; 
import Add from './components/Add.js'; 

// Obrazky:
// Lopata:  https://www.flaticon.com/free-icon/shovel_4478159
//          24.99 €
// Krompáč: https://www.flaticon.com/free-icon/hoe_409742
//          34.99 €
// Hrable:  https://www.flaticon.com/free-icon/rake_4328650
//          15.99 €

function App(){
    const [data, setData] = useState(['a']);
    const [basket, setBasket] = useState([]);

    function getDataFromServer(){
        return fetch('http://localhost:8080/data')
        .then(data=>data.json())
        .then(data=>setData(data.map(e=>e)));
    }
    // function addElement(element){
    //     console.log('element: ' +element);
    //     fetch('http://localhost:8080/data', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify({input: element})
    //     }).then(e=>{
    //         getDataFromServer();
    //     });
    // }

    // function delElement(id){

    //     console.log('element: ' +id);
    //     fetch('http://localhost:8080/data', {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify({id: id})
    //     }).then(e=>{
    //         getDataFromServer();
    //     });
    // }

    // function changeElement(id, value){
    //     console.log('element: ' +id);
    //     fetch('http://localhost:8080/data', {
    //         method: 'PUT',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify({id: id, nazov: value})
    //     }).then(e=>{
    //         getDataFromServer();
    //     });
    // }

    function pridajProdukt(id){
        // console.log("Objednaj produkt: " + id);
        data.forEach(element =>{
            if(element.id === id){
                let elementCopy = Object.assign({}, element);
                let newToAdd = true;

                basket.forEach(basketElement =>{
                    if(basketElement.id === id){
                        basketElement.mnozstvo += 1;
                        newToAdd = false;
                        return;
                    }
                });
                if(newToAdd){
                    elementCopy.mnozstvo = 1;
                    basket.push(elementCopy);
                }
            }
        });
        setBasket([...basket]);
    }
    function odoberProdukt(id){
        // console.log("Odober produkt: " + id);        
        for( var i = 0; i < basket.length; i++){ 
            if(basket[i].id === id){
                basket[i].mnozstvo -= 1;
                if(basket[i].mnozstvo === 0){
                    basket.splice(i, 1);
                }
            }
        }
        setBasket([...basket]);
    }
    function kupitKosik(values){
        // console.log(values);
        fetch('http://localhost:8080/data', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                values: values,
                items: basket
            })
        })
        .then(response=>response.json())
        .then(response=>{
            if(response.status === "error"){
                alert(response.message)
            }else if(response.status === "ok"){
               console.log("Šecko ok");
               setBasket([]);
            }else{
                console.log(response);
                console.log("unknown response!!");
           }
        });
    }
    useEffect(()=>{
        getDataFromServer();
    },[]);
    return (
        <div className="container">
            <Products data={data} pridaj={pridajProdukt}/>
            <Basket data={basket} odober={odoberProdukt}/>
            <Order buy={kupitKosik}/>
            <h2>Poďakovanie</h2>
            <Add />
        </div>
    )
}

export default App;