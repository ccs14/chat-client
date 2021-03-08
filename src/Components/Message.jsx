import React from "react";

const Message = (message) => {
    return (
        <p>{`user${message.user} - ${message.contents}`}</p>
    );
}

export default Message;