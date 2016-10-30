import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

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
          <ListItem
            primaryText="OO資訊科技"
            secondaryText="軟體工程師"
            innerDivStyle={{backgroundColor: 'rgba(128,128,128,.1)'}}
            rightIcon={<Link to='/job/3/edit'><ActionInfo /></Link>}
            />
          <ListItem
            primaryText="XX資訊科技"
            secondaryText="專案管理"
            rightIcon={<Link to='/job/4/edit'><ActionInfo /></Link>}
            />
          <ListItem
            primaryText="7-11"
            secondaryText="工讀生"
            rightIcon={<Link to='/job/5/edit'><ActionInfo /></Link>}
            />
          <ListItem
            primaryText="OX餐廳"
            secondaryText="特級廚師"
            rightIcon={<Link to='/job/6/edit'><ActionInfo /></Link>}
            />
        </List>
        <div style={{flex: 1}}>
          <ChatRoom room={cid} />
        </div>
      </Paper>
    );
  }
}

export default Channel;
