import React, { useState, useContext, useCallback, useEffect, Component } from 'react';
import { SocketContext, socketApp } from './Context/Socket';

const Display = (props) => {
    console.log("props", props);

  // create user id for each client
  let userId = Math.floor(Math.random() * 1000).toString();
  let socket = useContext(SocketContext);

  // capture textbox input
  let captureText = (event) => {
    // capture from textbox and update state var
    console.log("new text: ", event.target.value);
    this.setState({ text: event.target.value });
  };

  // make a new message from random text, and send to the server
  let createMessage = () => {
    console.log("in createMessage()");
    console.log("state: ", this.state);
    // create standard message object
    const message = {
      "user": this.userId,
      "message": this.state.messageText
    };
    // log and send new message
    console.log("new client message: ", message);
    socket.emit("message", [message]);
    debugger;
  };

  useEffect = () => {
    // receive a group-message event, store data
    socket.on("group-message", data => this.setState({ response: data }, () => {
      let newMessage = `user${data[0].user} - ${data[0].message}`;
      console.log("from server: ", data[0]);
      const newMessages = this.state.messages;
      newMessages.push({ user: data[0].user, message: data[0].message })
      this.setState({messages: newMessages});
      console.log("client state: ", this.state);
      debugger;
    }));
  }
}

export default Display;