import React, { PropTypes } from 'react';

class UserView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { profile } = this.props;
    return (
      <div>
        { JSON.stringify(profile) }
      </div>
    );
  }
}

export default UserView;
