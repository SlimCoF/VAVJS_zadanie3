import React from 'react';

function Admin(props) {
    const style = {
        width: "280px",
        'text-align': "center"
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


    function produkt(produkt_id) {
        for (let i = 1; i < props.products.length + 1; i++) {
            if (props.products[i - 1].id === produkt_id) {
                return props.products[i - 1].nazov
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
                <tr key={index}>
                    <td>{produkt(element.produkt_id)} </td>
                    <td>{element.zakaznik_id} </td>
                    <td>{stavObjednavky(element.stav)}</td>
                    <td><button>Zmeniť stav</button></td>
                </tr>
            );
        });
    }
    function reklama() {
        return (
            <tr key='1'>
                <td>{props.add.pageUrl} </td>
                <td><button>Zmeniť URL</button></td>
                <td>{props.add.imgUrl} </td>
                <td><button>Zmeniť obrázok</button></td>
            </tr >
        );
    }
    if (props.adminOpen) {
        return (
            <div className="Admin">
                <h2 onClick={click} style={style}>Admin rozhranie</h2>
                <h3>Objednávky</h3>
                <table border="1">
                    <thead>
                        <th>Produkt</th>
                        <th>Zákazník</th>
                        <th>Stav</th>
                    </thead>
                    <tbody>
                        {
                            objednavky()
                        }
                    </tbody>
                </table>
                <h3>Reklama</h3>
                <table border="1">
                    <th>URL</th>
                    <th>Obrázok</th>
                    <tbody>
                        {
                            reklama()
                        }
                    </tbody>
                </table>
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