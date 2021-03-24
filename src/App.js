import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Chat from "./Components/Chat";
import makeText from "./Utils/Utils";
import 'dotenv/config';

// socket object for client
// const socket = socketIOClient(process.env.SERVER_URL);
// create user id for each client
const userId = Math.floor(Math.random() * 1000).toString();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      text: {},
      event: {},
      messages: [],
      endpoint: "http://127.0.0.1:3001",
    };
  }

  // capture textbox input
  captureText = (event) => {
    // capture from textbox and update state var
    console.log("new text: ", event.target.value);
    this.setState({ text: event.target.value });
  };

  // make a new message from random text, and send to the server
  createMessage = () => {
    const socket = socketIOClient(process.env.SERVER_URL);
    console.log("in createMessage()");
    console.log("state: ", this.state);
    // get random text
    // const messageText = makeText(15);
    // create standard message object
    const message = {
      "user": userId,
      "message": this.state.text
    };
    // log and send new message
    console.log("new client message: ", message);
    debugger;
    socket.emit("message", [message]);
  };

  componentDidMount = () => {
    const socket = socketIOClient(process.env.SERVER_URL);
    // receive a group-message event, store data
    socket.on("group-message", data => this.setState({ response: data }, () => {
      let newMessage = `user${data.user} - ${data.message}`;
      console.log("from server: ", newMessage);
      console.log("from server: ", data);
      this.state.messages.push(data);
    }));

    console.log("client state: ", this.state);
  }

  render() {
    console.log("this.state: ", this.state);

    return (
      <div>
        <Chat messages={this.state.messages}/>
        <form>
          <input type='text' onChange={ this.captureText} />
          <input type="submit" value="Create Message" onClick={this.createMessage} />
        </form>
      </div>
    );
  }
}

export default App;