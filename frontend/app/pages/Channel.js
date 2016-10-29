import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';

import ChatRoom from '../components/ChatRoom';

class Channel extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { cid="1" } = this.props.params;
    return (
      <Paper style={{display: 'flex', position: 'relative'}}>
        <List style={{width: 300, minHeight: '100%', borderRight: '1px solid #ccc'}}>
          <ListItem primaryText="OO資訊科技" secondaryText="軟體工程師" innerDivStyle={{backgroundColor: 'rgba(128,128,128,.1)'}} />
          <ListItem primaryText="XX資訊科技" secondaryText="專案管理" />
          <ListItem primaryText="7-11" secondaryText="工讀生" />
          <ListItem primaryText="OX餐廳" secondaryText="特級廚師" />
        </List>
        <div style={{flex: 1}}>
          <ChatRoom room={cid} />
        </div>
      </Paper>
    );
  }
}

export default Channel;
