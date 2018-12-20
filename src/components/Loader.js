import React from 'react';

const Loader = () => {
    return (
        <div>
            <iframe title='Loader' style={{
                cursor:'none'
            }}
                src="https://giphy.com/embed/3ohze44ikqc6S65XgY"
                width="48"
                height="48"
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen/>
        </div>
    );
};

export default Loader;