import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';

import ChatRoom from '../components/ChatRoom';

class Channel extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { cid="1" } = this.props.params;
    return (
      <Paper style={{display: 'flex', position: 'relative'}}>
        <div style={{width: 300, minHeight: '100%', borderRight: '1px solid #ccc'}}>
          Left Selection
        </div>
        <div style={{flex: 1}}>
          <ChatRoom room={cid} />
        </div>
      </Paper>
    );
  }
}

export default Channel;
