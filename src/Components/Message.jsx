import React from "react";

const Message = (data) => {
    return (
        <p>{data.user} - {data.message}</p>
    );
}

export default Message;