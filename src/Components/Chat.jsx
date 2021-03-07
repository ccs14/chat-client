import React from "react";
import Message from "./Message";

const Chat = (props) => {
    console.log("props", props);
    console.log("props.messages", props.messages);

    let items = [];
    items = props.messages.map((message) =>
                <Message message={message} />
            );

    console.log("items", items);

    return (
        <div>
            {items}
        </div>
    )
}

export default Chat;