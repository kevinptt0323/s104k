const initialState = { token: "" };
const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCEED':
      console.log(action.response.token);
      return {
        ...state,
        token: action.response.token
      };
    case 'LOGIN_FAIL':
      return state;
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'LOGIN':
    default:
      return state;
  }
};

export default authReducer;
