import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect("http://127.0.0.1:3001");
export const SocketContext = React.createContext();
