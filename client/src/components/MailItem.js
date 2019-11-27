import React from 'react';

const MailItem = (props) => {
    const { mail } = props;

    return (
        <div>
            <p>{mail.receiver}</p>
            <p>{mail.subject}</p>
        </div>
    );
};

export default MailItem;
