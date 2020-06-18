import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:3001/"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    var userId = Math.floor(Math.random() * 1000).toString();

    // send a message event, passing username, and message contents
    socket.emit("message", [userId, "this is a message from the client"]);

    socket.on("group-message", data => this.setState({ response: data }, () => {
      console.log(`this is message '${data}' from the server`)
    }));
  }

  render() {
    if (this.state.response) {
      console.log(`this message came from the sever: ${this.state.response.data}`);
    }

    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>{response}</p>
          : <p>Loading...</p>}
      </div>
    );
  }
}

export default App;