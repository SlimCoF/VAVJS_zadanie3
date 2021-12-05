import React, { useEffect, useState } from 'react';
import Products from './components/Products.js';
import Basket from './components/Basket.js';
import Order from './components/Order.js';
import Add from './components/Add.js';
import Admin from './components/Admin.js';

// Obrazky:
// Lopata:  https://www.flaticon.com/free-icon/shovel_4478159
//          24.99 €
// Krompáč: https://www.flaticon.com/free-icon/hoe_409742
//          34.99 €
// Hrable:  https://www.flaticon.com/free-icon/rake_4328650
//          15.99 €

function App() {
    const [products, setProducts] = useState(['a']);
    const [basket, setBasket] = useState([]);
    const [add, setAdd] = useState({});
    const [orders, setOrders] = useState(['a']);
    const [customers, setCustomers] = useState(['a']);

    const [counter, setCounter] = useState(0);

    const [basketOpen, setBasketOpen] = useState(false);
    const [orderOpen, setOrderOpen] = useState(false);
    const [addOpen, setaddOpen] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);

    function getDataFromServer() {
        return fetch('http://localhost:8080/data')
            .then(response => response.json())
            .then(response => {
                if (response.status === 'ok') {
                    setProducts(response.content.produkty.map(e => e));
                    setAdd(response.content.reklama);
                    setCounter(response.content.reklama.counter);
                } else if (response.status === 'error') {
                    console.log(response.content);
                } else {
                    console.log('neznama odpoved!');
                }
            });
    }

    function pridajProdukt(id) {
        products.forEach(element => {
            if (element.id === id) {
                let elementCopy = Object.assign({}, element);
                let newToAdd = true;

                basket.forEach(basketElement => {
                    if (basketElement.id === id) {
                        basketElement.mnozstvo += 1;
                        newToAdd = false;
                        return;
                    }
                });
                if (newToAdd) {
                    elementCopy.mnozstvo = 1;
                    basket.push(elementCopy);
                }
            }
        });
        setBasket([...basket]);
    }
    function odoberProdukt(id) {
        for (var i = 0; i < basket.length; i++) {
            if (basket[i].id === id) {
                basket[i].mnozstvo -= 1;
                if (basket[i].mnozstvo === 0) {
                    basket.splice(i, 1);
                }
            }
        }
        setBasket([...basket]);
    }
    function kupitKosik(values) {

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
            .then(response => response.json())
            .then(response => {
                if (response.status === 'ok') {
                    setaddOpen(true);
                    setBasket([]);
                } else if (response.status === 'error') {
                    alert(response.content)
                } else {
                    console.log("neznama odpoved!!");
                }
            });
    }
    function pocitadlo() {
        fetch('http://localhost:8080/data', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(add)
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === 'ok') {
                    setCounter(response.content);
                } else if (response.status === 'error') {
                    console.log(response.content)
                } else {
                    console.log("neznama odpoved!!");
                }
            });
    }

    function ziskajObjednavky() {

        return fetch('http://localhost:8080/admin')
            .then(response => response.json())
            .then(response => {
                if (response.status === 'ok') {
                    setOrders(response.content.objednavky.map(e => e));
                    setCustomers(response.content.zakaznici.map(e => e));
                } else if (response.status === 'error') {
                    console.log(response.content)
                } else {
                    console.log("neznama odpoved!!");
                }
            });
    }

    function otvorAdmina(state) {
        setAdminOpen(state);
        ziskajObjednavky();
    }

    function potvrdObjednavku(id) {
        fetch('http://localhost:8080/admin', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                method: 'potvrdObjednavku',
                content: id
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === 'ok') {
                    ziskajObjednavky();
                } else if (response.status === 'error') {
                    console.log(response.content)
                } else {
                    console.log("neznama odpoved!!");
                }
            });
    }

    function zmenReklamu(pageUrl, imgUrl) {
        fetch('http://localhost:8080/admin', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                method: 'zmenaReklamy',
                content:
                {
                    pageUrl: pageUrl,
                    imgUrl: imgUrl
                }
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === 'ok') {
                    getDataFromServer();
                } else if (response.status === 'nothingChanged') {
                    console.log("Nič sa nezmenilo");
                } else if (response.status === 'error') {
                    console.log(response.content);
                } else {
                    console.log("neznama odpoved!!");
                }
            });
    }
    useEffect(() => {
        getDataFromServer();
    }, []);

    return (
        <div className="container">
            <Products
                products={products}
                pridaj={pridajProdukt}
            />
            <Basket
                basket={basket}
                odober={odoberProdukt}
                basketOpen={basketOpen}
                editOpen={state => setBasketOpen(state)}
            />
            <Order
                buy={kupitKosik}
                orderOpen={orderOpen}
                editOpen={state => setOrderOpen(state)}
            />
            <Add
                add={add}
                klik={pocitadlo}
                addOpen={addOpen}
            />
            <Admin
                orders={orders}
                counter={counter}
                add={add}
                products={products}
                customers={customers}
                setStatus={potvrdObjednavku}
                changeAdd={zmenReklamu}
                adminOpen={adminOpen}
                editOpen={otvorAdmina}
            />
        </div>
    )
}

export default App;