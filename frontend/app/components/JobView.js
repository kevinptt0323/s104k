import React, { PropTypes } from 'react';

class JobView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { job } = this.props;
    return (
      <div>
        { JSON.stringify(job) }
      </div>
    );
  }
}

export default JobView;

