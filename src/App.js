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

    for (let i = 0; i < 10; i++) {
      socket.emit("message", `this is message ${i}, from the client`);
    }

    socket.on("group-message", data => this.setState({ response: data }, () => {
      console.log(`this is message '${data}' from the server`)
    }));
  }

  render() {
    /*
    if (this.state.response) {
      console.log(`this message came from the sever: ${this.state.response.data}`);
    }
    */

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