import React from 'react';

// img copyright: https://www.flaticon.com/free-icon/fence_6184625?term=gardening%20tools&page=1&position=81&page=1&position=81&related_id=6184625&origin=tag

function Add(props){
    function pocitadlo(){
        props.klik();
    }
    return (
        <div className="podakovanie">
            <h2>Ďakujeme za nákup</h2>
            {/* <a href={props.add.pageUrl}> */}
                <img width="80" src={props.add.imgUrl} onClick={pocitadlo}></img>
            {/* </a> */}
            <p>Počet kliknutí: {props.add.counter}</p>
        </div>
    );
}

export default Add;