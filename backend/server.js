const { table } = require('console');
const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const mysql = require('mysql');

let connectionMade = false;
let connection = null;
let addCounter = 0;
function connectDB() {
    if (connectionMade === false) {
        connection = mysql.createConnection({
            host: 'mydb',
            user: 'root',
            password: 'root',
            database: 'eshop',
            multipleStatements: true
        });
        connection.connect(err => {
            if (!err) {
                connectionMade = true;
            }
        });
    }
}
app.get(['/', '/index.html'], (req, res) => {
    console.log(req.method + ' rquest /index.html');
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Access-Control-Allow-Origin', '*');

    fs.readFile('static/index.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('<html><body><h1>FS GET ERROR</h1></body></html>');
        }
        else {
            res.status(200).end(data);
        }
    });
});

app.get('/bundle.js', (req, res) => {
    console.log(req.method + ' rquest /bunlde.html');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    fs.readFile('static/bundle.js', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('<html><body><h1>FS GET ERROR</h1></body></html>');
        }
        else {
            res.status(200).end(data);
        }
    });
});

app.get('/data', (req, res) => {
    console.log(req.method + ' rquest /data');
    connectDB();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    let data = {};
    connection.query('SELECT * FROM produkty', function (error, results) {
        if (error) {
            res.status(500).end(JSON.stringify(
                {
                    status: 'error',
                    content: 'SELECT from \'produkty\' failed!!'
                }
            ));
        } else {
            data.produkty = results;
            connection.query('SELECT * FROM reklama', function (error, results) {
                if (error) {
                    res.status(500).end(JSON.stringify(
                        {
                            status: 'error',
                            content: 'SELECT from \'reklama\' failed!!'
                        }
                    ));
                } else {
                    data.reklama = results[0]
                    addCounter = data.reklama.counter;
                    res.status(200).json(
                        {
                            status: 'ok',
                            content: data
                        }
                    );
                }
            });
        }
    });
});

app.post('/data', (req, res) => {
    console.log(req.method + ' post /data');
    connectDB();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    req.on('data', function (data) {
        let errorMessage = "";
        let values = JSON.parse(data).values;
        let items = JSON.parse(data).items;

        if (items.length === 0) {
            res.status(500).end(JSON.stringify(
                {
                    status: 'error',
                    content: 'Košík je prázdny!!'
                }
            ));
        } else {
            connection.query('SELECT * FROM zakaznici', function (error, results) {
                if (error) {
                    res.status(500).end(JSON.stringify(
                        {
                            status: 'error',
                            content: 'SELECT from \'zakaznici\' failed!!'
                        }
                    ));
                } else {
                    errorMessage = customerConditions(values, results);
                    if (errorMessage.length !== 0) {
                        res.status(500).end(JSON.stringify(
                            {
                                status: 'error',
                                content: errorMessage
                            }
                        ));
                    } else {
                        let zakaznik_id;

                        // Pridaj zaznam do tabulky zakaznici
                        connection.query('INSERT INTO `zakaznici` (`email`, `meno`, `ulica`, `cislo`, `mesto`, `psc`)VALUES (\'' + values.email + '\', \'' + values.name + '\', \'' + values.street + '\', \'' + values.number + '\', \'' + values.city + '\', \'' + values.psc + '\')', function (error, results) {
                            if (error) {
                                res.status(500).end(JSON.stringify(
                                    {
                                        status: 'error',
                                        content: 'INSERT to \'zakaznici\' failed!!'
                                    }
                                ));
                            } else {
                                // Do tabulky objednavky pridaj tolko zaznamov kolko si zakaznik praje kupit produktov
                                zakaznik_id = results.insertId;

                                let fail = false;
                                let errorMessage = "";
                                items.forEach(element => {
                                    let produkt_id = element.id;
                                    let count = element.mnozstvo;

                                    for (let i = 0; i < count; i++) {
                                        connection.query('INSERT INTO `objednavky` (`produkt_id`, `zakaznik_id`, `stav`) VALUES (\'' + produkt_id + '\', \'' + zakaznik_id + '\', \'' + 0 + '\')', function (error) {
                                            if (error) {
                                                fail = true;
                                            }
                                        });
                                    }
                                    if (fail) {
                                        errorMessage += "Produkt" + produkt_id + "sa nepodarilo pridat do DB";
                                    }
                                });

                                if (fail) {
                                    res.status(500).end(JSON.stringify(
                                        {
                                            status: 'error',
                                            content: errorMessage
                                        }
                                    ));
                                } else {
                                    res.status(200).end(JSON.stringify(
                                        {
                                            status: 'ok'
                                        }
                                    ));
                                }
                            }
                        });
                    }
                }
            });
        }
    });
});

app.put('/data', (req, res) => {
    console.log(req.method + ' put /data');
    connectDB();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    req.on('data', function (data) {
        let jsonData = JSON.parse(data);

        let id = jsonData.id;
        addCounter += 1;

        connection.query('UPDATE `reklama` SET `counter` = \'' + addCounter + '\' WHERE `id` = \'' + id + '\'', function (error) {
            if (error) {
                res.status(500).end(JSON.stringify(
                    {
                        status: 'error',
                        content: 'UPDATE to \'reklama\' failed!!'
                    }
                ));
            } else {
                res.status(500).end(JSON.stringify(
                    {
                        status: 'ok',
                        content: addCounter
                    }
                ));
            }
        });
    });
});

app.get('/admin', (req, res) => {
    console.log(req.method + ' rquest /admin');
    connectDB();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    let data = {};
    connection.query('SELECT * FROM objednavky', function (error, results) {
        if (error) {
            res.status(500).end(JSON.stringify(
                {
                    status: 'error',
                    content: 'SELECT from \'objednavky\' failed!!'
                }
            ));
        } else {
            data.objednavky = results;
            connection.query('SELECT * FROM zakaznici', function (error, results) {
                if (error) {
                    res.status(500).end(JSON.stringify(
                        {
                            status: 'error',
                            content: 'SELECT from \'zakaznici\' failed!!'
                        }
                    ));
                } else {
                    data.zakaznici = results;
                    res.status(200).json(
                        {
                            status: 'ok',
                            content: data
                        }
                    );
                }
            });
        }
    });
});

app.put('/admin', (req, res) => {
    console.log(req.method + ' put /admin');
    connectDB();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    req.on('data', function (data) {
        let jsonData = JSON.parse(data);
        if (jsonData.method === "potvrdObjednavku") {
            let id = jsonData.content;
            connection.query('UPDATE `objednavky` SET `stav` = \'' + 1 + '\' WHERE `id` = \'' + id + '\';', function (error) {
                if (error) {
                    res.status(500).end(JSON.stringify(
                        {
                            status: 'error',
                            content: 'UPDATE to \'objednavky\' failed!!'
                        }
                    ));
                } else {
                    res.status(200).end(JSON.stringify({ status: 'ok' }));
                }
            });
        } else if (jsonData.method === "zmenaReklamy") {
            let pageUrl = JSON.parse(data).content.pageUrl
            let imgUrl = JSON.parse(data).content.imgUrl
            if (pageUrl !== '') {
                connection.query('UPDATE `reklama` SET `pageUrl` = \'' + pageUrl + '\' WHERE `id` = \'' + 1 + '\';', function (error) {
                    if (error) {
                        res.status(500).end(JSON.stringify(
                            {
                                status: 'error',
                                content: 'UPDATE to \'reklama\' failed!!'
                            }
                        ));
                        return;
                    } else {
                        console.log("PAGE URL SUCESSFULLY CHANGES!!");
                    }
                });
            }
            if (imgUrl !== '') {
                connection.query('UPDATE `reklama` SET `imgUrl` = \'' + imgUrl + '\' WHERE `id` = \'' + 1 + '\';', function (error) {
                    if (error) {
                        res.status(500).end(JSON.stringify(
                            {
                                status: 'error',
                                content: 'UPDATE to \'objednavky\' failed!!'
                            }
                        ));
                        return;
                    } else {
                        console.log("IMG URL SUCESSFULLY CHANGES!!");
                    }
                });
            }
            if (imgUrl === '' && pageUrl === '') {
                res.status(200).end(JSON.stringify({ status: 'nothingChanged' }));
            } else {
                res.status(200).end(JSON.stringify({ status: 'ok' }));
            }
        }
    });
})
app.listen(port, () => {
    console.log('Express server running v1');
});


function notFilled(values) {
    var errorString = "";
    for (i in values) {
        if (values[i] === '') {
            errorString += "- pole " + i + " ne je vyplnené!\n"
        }
    }
    return errorString;
}

function customerConditions(values, tableData) {
    var errorString = notFilled(values);
    if (errorString === "") {
        // If email is duplicate
        tableData.forEach(customer => {
            if (customer.email === values.email) {
                errorString += "email (" + values.email + ") už existuje!\n";
                return;
            }
        });
        // correct e-mail format
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))) {
            errorString += "email (" + values.email + ") je v zlom formáte! Príklad dobrého emailu: r.batzbak@email.com \n";
        }
        // correct full name format
        if (!(/^([A-Z][a-z]+)\s([A-Z][a-z]+)$/.test(values.name))) {
            errorString += "Meno (" + values.name + ") je v zlom formáte! Príklad dobrého mena: Richard Batzbak\n";
        }

        // correct street format
        if (!(/^[a-zA-Z]+$/.test(values.street))) {
            errorString += "Ulica (" + values.street + ") e v zlom formáte! Príklad dobrej ulice: Vinohradnícka\n";
        }

        // number format
        if (!(/^[0-9]+$/.test(values.number))) {
            errorString += "Číslo (" + values.number + ") e v zlom formáte! Príklad dobrého čísla: 69\n";
        }

        // correct city format
        if (!(/^[a-zA-Z]+$/.test(values.city))) {
            errorString += "Mesto (" + values.city + ") e v zlom formáte! Príklad dobrého mesta: Bratislava\n";
        }

        // number PSC format
        if (!(/^[0-9]+$/.test(values.psc))) {
            errorString += "PŠČ (" + values.psc + ") e v zlom formáte! Príklad dobrého PSČ: 903421\n";
        }
    }
    return errorString;
}