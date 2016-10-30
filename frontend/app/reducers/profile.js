const initialState = { user: {} };
const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_PROFILE':
      return state;
    case 'GET_PROFILE_SUCCEED':
      return {
        sending: false,
        user: action.response,
        error: null,
      };
    case 'GET_PROFILE_FAILED':
      return {
        sending: false,
        user: {},
        error: action.response,
      };
    default:
      return state;
  }
};

export default profileReducer;

