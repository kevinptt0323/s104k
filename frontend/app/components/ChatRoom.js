import React, { PropTypes } from 'react';
import socket from 'socket.io-client';

import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import { darkBlack } from 'material-ui/styles/colors';

const ChatMessages = ({messages, style, ...props}, context) => {
  return (
    <List style={style}>
      { messages.map(({account, message, time}) => (
        <ListItem
          leftAvatar={<Avatar size={30}>{account[0]}</Avatar>}
          primaryText={message}
          secondaryText={
            <p>
              {`${account} 於 ${time}`}
            </p>
          }
          secondaryTextLines={2}
        />
      )) }
    </List>
  );
};

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { props: {onSubmit, value, ...props} } = this;
    return (
      <div style={{ display: 'flex' }}>
        <TextField fullWidth={true} value={value} hintText="留言..." {...props} />
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
  }

  render() {
    const { cid } = this.props;
    return (
      <div>
        <ChatMessages
          messages={this.state.messages}
          style={{
            height: 'calc(100vh - 48px - 64px - 16px)',
            overflow: 'auto',
            boxShadow: '-3px -6px 10px rgba(0, 0, 0, .4) inset',
          }} />
        <ChatInput value={this.state.text} onChange={this.onTextChange} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default ChatRoom;
