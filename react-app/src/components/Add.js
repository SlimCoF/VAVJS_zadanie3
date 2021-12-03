import React from 'react';

// img copyright: https://www.flaticon.com/free-icon/fence_6184625?term=gardening%20tools&page=1&position=81&page=1&position=81&related_id=6184625&origin=tag

function Add(props) {
    const style = {
        width: "280px",
        'text-align': "center"
    };

    function pocitadlo() {
        props.klik();
    }

    if (props.addOpen) {
        return (
            <div className="podakovanie">
                <h2 style={style}>Ďakujeme za nákup</h2>
                <a href={props.add.pageUrl}>
                    <img width="80" src={props.add.imgUrl} onClick={pocitadlo}></img>
                </a>
            </div>
        );
    } else {
        return (
            <div className="podakovanie">
                <h2 style={style}>Dokončiť objednávku</h2>
            </div>
        );
    }
}

export default Add;