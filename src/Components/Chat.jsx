import React from "react";

const Chat = (props) => {
    return ({
        <div>
            this.props.messages.array.forEach(message => {
                <Message message={message}/>
            });
        </div>
    })
}

export default Chat;