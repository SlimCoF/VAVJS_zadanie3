const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

describe("GET /data", function () {
    it("returns products table and advertisement table", async function () {
        const response = await request.get("/data");

        expect(response.status).to.eql(200);
        expect(response.body.content.produkty.length).to.eql(3);
    });
});

describe("POST /data", function () {
    it("Insert data to table produkty and zakaznici", async function () {
        const response = await request
            .post("/data")
            .send(
                {
                    values:
                    {
                        email: 'test@test.ts',
                        name: 'Test Testovic',
                        street: 'Testovska',
                        number: '9',
                        city: 'Testovicovo',
                        psc: '12345',
                    },
                    items:
                        [
                            {
                                id: 1,
                                nazov: 'Lopata',
                                cena: 24.99,
                                img: 'https://cdn-icons-png.flaticon.com/512/4478/4478159.png',
                                mnozstvo: 1
                            },
                            {
                                id: 2,
                                nazov: 'Krompac',
                                cena: 34.99,
                                img: 'https://cdn-icons-png.flaticon.com/512/409/409742.png',
                                mnozstvo: 3
                            },
                            {
                                id: 3,
                                nazov: 'Hrable',
                                cena: 15.99,
                                img: 'https://cdn-icons-png.flaticon.com/512/4328/4328650.png',
                                mnozstvo: 1
                            }
                        ]
                }
            );
        if (response.body.status === "error") {
            expect(response.status).to.eql(500);
            console.log(response.body.message);
        } else {
            expect(response.status).to.eql(200);
        }
    });
});

describe("PUT /admin", function () {
    it("Change state of first order to payed", async function () {
        const response = await request
            .put("/admin")
            .send(
                {
                    method: 'potvrdObjednavku',
                    content: 1
                }
            );

        console.log(response.body);
        expect(response.status).to.eql(200);
    });
});

describe("PUT /admin", function () {
    it("Advertisement table change", async function () {
        const response = await request
            .put("/admin")
            .send(
                {
                    method: 'zmenaReklamy',
                    content:
                    {
                        pageUrl: 'https://www.google.com/',
                        imgUrl: 'https://cdn-icons-png.flaticon.com/512/6184/6184625.png',
                    }
                }
            );

        expect(response.status).to.eql(200);
    });
});

describe("GET /admin", function () {
    it("returns orders table", async function () {
        const response = await request.get("/data");

        expect(response.status).to.eql(200);
    });
});
