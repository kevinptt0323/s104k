const initialState = { data: {} };
const jobReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_JOB':
      return state;
    case 'GET_JOB_SUCCEED':
      return {
        sending: false,
        data: action.response,
        error: null,
      };
    case 'GET_JOB_FAILED':
      return {
        sending: false,
        data: {},
        error: action.response,
      };
    default:
      return state;
  }
};

export default jobReducer;
