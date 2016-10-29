import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle() {
    this.setState({ open: !this.state.open });
  }
  render() {
    return (
      <Drawer
        width={300}
        docked={false}
        open={this.state.open}
        onRequestChange={this.handleToggle}
      >
        <img src="img/sidenav-wallpaper.png" style={{ width: '100%' }} />
        {this.props.children}
      </Drawer>
    );
  }
}

const LeftNavItem = props => (
  <MenuItem
    {...props}
  />
);

export { LeftNav, LeftNavItem };

export default LeftNav;
