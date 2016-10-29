import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';

import ChatRoom from '../components/ChatRoom';

class Channel extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { props } = this;
    if (!props.cid) props.cid = "1";
    return (
      <Paper style={{display: 'flex'}}>
        <div style={{flex: 1, borderRight: '1px solid #ccc', height: 400}}>
          Left Selection
        </div>
        <div style={{flex: 2}}>
          <ChatRoom {...props} />
        </div>
      </Paper>
    );
  }
}

export default Channel;