import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Chat from "./Components/Chat";
import makeText from "./Utils/Utils";
import 'dotenv/config';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      messages: [],
      endpoint: "http://127.0.0.1:3001/"
    };
  }

  endpoint = "http://127.0.0.1:3001/";
  socket = socketIOClient(this.endpoint);
  // create user id for each client
  userId = Math.floor(Math.random() * 1000).toString();

  // make a new message from random text, and send to the server
  createMessage = () => {
    // get random text
    const messageText = makeText(15);
    // create standard message object
    const message = {
      "user": this.userId,
      "message": messageText
    };

    // send a message event to the server, pass username and message
    this.socket.emit("message", message);
  };

  componentDidMount() {
    // receive a group-message event, store data
    this.socket.on("group-message", data => this.setState({ response: data }, () => {
      let newMessage = `user${data.user} - ${data.message}`;
      console.log(`${newMessage} (from server)`);
      this.state.messages.push(data);
    }));

    console.log("client state: ", this.state);
  }

  render() {
    console.log(`this.state: ${this.state}`);

    if (this.state.response) {
      console.log(`this message came from the sever: ${this.state.response.data}`);
    }

    if (this.state.messages)
    {
      return (
        <div>
          <Chat messages={this.state.messages}/>
          <input type="submit" value="Create Message" onClick={() => this.createMessage()} />
        </div>
      );
    }
  }
}

export default App;