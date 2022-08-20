import React, { useState, useContext, useCallback, useEffect, Component } from 'react';
import Display from "./Components/Display";
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

  render() {
    console.log("this.state: ", this.state);

    return (
      <SocketContext.Provider value={socketApp}>
      <Display />
    </SocketContext.Provider>
    );
  }
}

export default App;