import React from 'react';

const MailItem = (props) => {
    const { mail } = props;

    const { createdAt } = mail;
    const formated = createdAt.split('T');
    const date = formated[0];

    return (
        <div className="item-mail">
            <p className="item-header">{mail.receiver}</p>
            <p className="item-body">{mail.subject}</p>
            <p className="item-footer">{date}</p>
        </div>
    );
};

export default MailItem;
