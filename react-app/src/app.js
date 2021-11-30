import React, {useEffect,useState} from 'react';
import Header from './components/Header.js'; 
import Input from './components/Input.js'; 
import Products from './components/Products'; 

function App(){
    const [data, setData] = useState(['a', 'b']);

    function getDataFromServer(){
        return fetch('http://localhost:8080/data')
        .then(data=>data.json())
        .then(data=>setData(data.map(e=>e)));
    }

    function addElement(element){
        console.log('element: ' +element);
        console.log("som tu");
        fetch('http://localhost:8080/data', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({input: element})
        }).then(e=>{
            getDataFromServer();
        });
    }

    function delElement(id){

        console.log('element: ' +id);
        fetch('http://localhost:8080/data', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({id: id})
        }).then(e=>{
            getDataFromServer();
        });
    }

    function changeElement(id, value){
        console.log('element: ' +id);
        fetch('http://localhost:8080/data', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({id: id, nazov: value})
        }).then(e=>{
            getDataFromServer();
        });
    }
    useEffect(()=>{
        getDataFromServer();
    },[]);
    return (
        <div className="container">
            <Header heading="React APP Table"/>
            <Input callback={addElement}/>
            <Products data={data} delete={delElement} change={changeElement}/>
        </div>
    )
}

export default App;