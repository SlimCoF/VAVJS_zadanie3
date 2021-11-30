import React from 'react';

function Header(props){
    return (
        <div className="row">
            <h2>{props.heading}</h2>
        </div>
    );
}

export default Header;