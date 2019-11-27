import React from 'react';

const Button = (props) => {
    const { method, styling, name } = props;

    return (
        <button className={`btn ${styling}`} onClick={() => method()}>{name}</button>
    );
};

export default Button;
