import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Chat from "./Components/Chat";
import makeText from "./Utils/Utils";
import 'dotenv/config';
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

  // define endpoint
  endpoint = "http://127.0.0.1:3001";
  // socket object for client
  socket = socketIOClient(this.endpoint);
  // create user id for each client
  userId = Math.floor(Math.random() * 1000).toString();

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
    // get random text
    // const messageText = makeText(15);
    // create standard message object
    const message = {
      "user": this.userId,
      "message": this.state.text
    };
    // log and send new message
    console.log("new client message: ", message);
    debugger;
    this.socket.emit("message", [message]);
  };

  componentDidMount = () => {
    // receive a group-message event, store data
    this.socket.on("group-message", data => this.setState({ response: data }, () => {
      debugger;
      let newMessage = `user${data[0].user} - ${data[0].message}`;
      console.log("from server: ", data[0]);
      this.state.messages.push(data[0]);
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