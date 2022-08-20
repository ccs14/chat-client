import React, { useState, useContext, useCallback, useEffect, Component } from 'react';
import Chat from "./Components/Chat";
import { SocketContext, socketApp } from './Context/Socket';
import 'dotenv/config';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      messageText: '',
      event: {},
      messages: [],
    };
  }

  // create user id for each client
  userId = Math.floor(Math.random() * 1000).toString();
  socketApp = useContext(SocketContext);

  // capture textbox input
  captureText = (event) => {
    // capture from textbox and update state var
    console.log("new text: ", event.target.value);
    this.setState({ text: event.target.value });
  };

  // make a new message from random text, and send to the server
  createMessage = () => {
    console.log("in createMessage()");
    console.log("state: ", this.state);
    // create standard message object
    const message = {
      "user": this.userId,
      "message": this.state.messageText
    };
    // log and send new message
    console.log("new client message: ", message);
    this.socket.emit("message", [message]);
    debugger;
  };

  componentDidUpdate = () => {
    // receive a group-message event, store data
    socket2.on("group-message", data => this.setState({ response: data }, () => {
      let newMessage = `user${data[0].user} - ${data[0].message}`;
      console.log("from server: ", data[0]);
      const newMessages = this.state.messages;
      newMessages.push({ user: data[0].user, message: data[0].message })
      this.setState({messages: newMessages});
      console.log("client state: ", this.state);
      debugger;
    }));
  }

  render() {
    console.log("this.state: ", this.state);

    return (
      <div>
        <form onSubmit={this.createMessage}>
          <input type='text' value={this.state.messageText} placeholder="Create Message" onChange={(event) => this.setState({ messageText: event.target.value })} />
          <button>Send Message</button>
        </form>
      </div>
    );
  }
}

export default App;