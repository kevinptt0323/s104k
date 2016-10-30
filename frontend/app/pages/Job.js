import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';

import JobView from '../components/JobView';

import { sendAjax } from '../actions/api';

class User extends React.Component {
  static contextTypes = {
    job: PropTypes.object,
    store: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    const { store } = context;
    const { jid } = props.params;
    store.dispatch(sendAjax({
      method: 'get',
      path: `/job/${jid}`,
      withToken: true,
      sendingType: 'GET_JOB'
    })).then(({body}) => {
      store.dispatch({
        type: 'GET_JOB_SUCCEED',
        response: body
      });
    }).catch(error => {
    });
  }
  render() {
    const { job } = this.context;
    return (
      <Paper>
        <JobView job={job} />
      </Paper>
    );
  }
}

export default User;

