import React, { PropTypes } from 'react';
import socket from 'socket.io-client';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    const io = socket('http://localhost:8000');
    this.io = io;

    io.on('connect', () => {
    });
    io.on('event', (data) => {
    });
    io.on('disconnect', () => {
    });
  }
  render() {
    return (
      <div>
        Hello, world!
      </div>
    );
  }
}

export default ChatRoom;
