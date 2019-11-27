import React from 'react';

const FormItem = (props) => {
    const { name, label, method, type, value } = props;

    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input type={type} id={name} onChange={(evt) => method(evt)} value={value} />
        </div>
    );
};

export default FormItem;
