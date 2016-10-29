import React, { PropTypes } from 'react';
import socket from 'socket.io-client';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const ChatMessages = ({messages, ...props}, context) => {
  return (
    <div>
      { messages.map(({account, message, time}) => <div>{`${account}: ${message} (${time})`}</div>) }
    </div>
  );
};

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { props: {onSubmit, value, ...props} } = this;
    return (
      <div>
        <TextField fullWidth={true} value={value} {...props} />
        <FlatButton disabled={!value} label="送出" primary={true} onTouchTap={onSubmit} />
      </div>
    );
  }
}

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    const io = socket('http://s104k.nctu.me:8787');
    this.io = io;
    const { room } = props;
    io.on('connect', () => {
      io.emit('join room', { room, account: "XD" });
    });
    io.on('load msg', (data) => {
      this.setState({ messages: data });
    });
    io.on('broadcast msg', (data) => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
    });
  }
  componentWillUnmount() {
    this.io.emit('leave room', { room: cid });
  }
  onTextChange(e) {
    this.setState({ text: e.target.value });
  }
  onSubmit(e) {
    this.io.emit('send msg', {
      room: this.props.room,
      account: "XD",
      message: this.state.text
    });
    this.setState({ text: "" });
  }

  render() {
    const { cid } = this.props;
    return (
      <div>
        <ChatMessages messages={this.state.messages} />
        <ChatInput value={this.state.text} onChange={this.onTextChange} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default ChatRoom;
