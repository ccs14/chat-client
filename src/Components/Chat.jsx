import React from "react";
import Message from "./Message";

const Chat = (props) => {
    console.log("props", props);
    console.log("props.messages", props.messages);
    // debugger;
    let items = [];
    items = props.messages.map((msg) =>
        <Message user={msg[0].user} contents={msg[0].message} />
            );

    console.log("items", items);

    return (
        <div>
            {items}
        </div>
    )
}

export default Chat;