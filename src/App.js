import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Chat from "./Components/Chat";
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

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    let userId = Math.floor(Math.random() * 1000).toString();

    // send a message event to the server, pass username and message
    socket.emit("message", [userId, "this is a message from the client"]);

    // receive a group-message event, store data
    socket.on("group-message", data => this.setState({ response: data }, () => {
      console.log(`this is message '${data}' from the server`);
      this.state.messages.push(data);
    }));

    console.log("client state: ", this.state);
  }

  render() {
    if (this.state.response) {
      console.log(`this message came from the sever: ${this.state.response.data}`);
    }

    const { response } = this.state;
    return (
      <Chat messages={this.state.messages}/>
    );
  }
}

export default App;