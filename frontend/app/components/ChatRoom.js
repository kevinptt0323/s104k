import React, { PropTypes } from 'react';
import socket from 'socket.io-client';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    const io = socket('http://s104k.nctu.me:8787');
    this.io = io;
    const { cid } = props;

    io.on('connect', () => {
      io.emit('join room', { room: cid, account: "XD" });
      console.log("join");
    });
    io.on('load msg', (data) => {
      console.log(data);
      this.setState({ message: data });
    });
    io.on('broadcast msg', (data) => {
      console.log(data);
    });
  }
  componentWillUnmount() {
    this.io.emit('leave room', { room: cid });
  }
  render() {
    const { cid } = this.props;
    return (
      <div>
        Welcome to Room {cid}!
      </div>
    );
  }
}

export default ChatRoom;
