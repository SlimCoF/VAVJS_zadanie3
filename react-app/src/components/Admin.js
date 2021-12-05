import React from 'react';

function Admin(props) {
    const style = {
        width: "280px",
        'textAlign': "center"
    };
    function MouseOver(event) {
        event.target.style.background = '#FF0000';
    };
    function MouseOut(event) {
        event.target.style.background = "";
    };

    function click() {
        if (props.adminOpen) {
            props.editOpen(false);
        } else {
            props.editOpen(true);
        }
    }

    function stateStyle(state) {
        if (state === 0) {
            return {
                background: "red",
            };
        } else {
            return {
                background: "green",
            };
        }
    }

    function zmenReklamu() {
        let pageUrl = document.getElementById('pageUrl').value;
        let imgUrl = document.getElementById('imgUrl').value;
        props.changeAdd(pageUrl, imgUrl);
    }
    function potvrdObjednavku(element) {
        if (element.stav === 0)
            props.setStatus(element.id);
        else
            console.log("Produkt už bol potvrdený")
    }
    function produkt(produkt_id) {
        for (let i = 1; i < props.products.length + 1; i++) {
            if (props.products[i - 1].id === produkt_id) {
                return props.products[i - 1].nazov
            }
        }
    }
    function zakaznik(zakaznik_id) {
        for (let i = 1; i < props.customers.length + 1; i++) {
            if (props.customers[i - 1].id === zakaznik_id) {
                return props.customers[i - 1].email
            }
        }
    }
    function stavObjednavky(stav) {
        if (stav === 0) {
            return "NEZAPLATENÉ";
        } else if (stav === 1) {
            return "zaplatené"
        }
    }
    function objednavky() {
        return props.orders.map((element, index) => {
            return (
                <tr key={index} style={stateStyle(element.stav)}>
                    <td>{produkt(element.produkt_id)} </td>
                    <td>{zakaznik(element.zakaznik_id)} </td>
                    <td>{stavObjednavky(element.stav)}</td>
                    <td><button onClick={e => { potvrdObjednavku(element) }}>Zmeniť stav</button></td>
                </tr>
            );
        });
    }
    if (props.adminOpen) {
        return (
            <div className="Admin">
                <h2 onClick={click} style={style}>Admin rozhranie</h2>
                <h3>Objednávky</h3>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Produkt</th>
                            <th>Zákazník</th>
                            <th>Stav</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            objednavky()
                        }
                    </tbody>
                </table>
                <h3>Reklama</h3>
                <table border="1">
                    <thead>
                        <tr>
                            <th></th>
                            <th>URL</th>
                            <th>Zmeň URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key='1'>
                            <td><b>Obrázok: </b></td>
                            <td>{props.add.imgUrl} </td>
                            <td>
                                <input type="text" id="imgUrl" placeholder="Nová url obrázku"></input>
                            </td>
                        </tr >
                        <tr>
                            <td><b>Odkaz: </b></td>
                            <td>{props.add.pageUrl} </td>
                            <td>
                                <input type="text" id="pageUrl" placeholder="Nová url odkazu"></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={zmenReklamu}>Potvrď zmeny</button>
                <h3>Počet kliknutí na reklamu</h3>
                <p>{props.counter}</p>
            </div>
        );
    } else {
        return (
            <div className="Admin">
                <h2 onClick={click} style={style} onMouseEnter={MouseOver} onMouseOut={MouseOut}>Admin rozhranie</h2>
            </div>
        );
    }
}

export default Admin;