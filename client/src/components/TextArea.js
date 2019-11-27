import React from 'react';

const TextArea = (props) => {
    const { name, label, method, value } = props;

    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} onChange={(evt) => method(evt)} value={value} />
        </div>
    );
};

export default TextArea;
