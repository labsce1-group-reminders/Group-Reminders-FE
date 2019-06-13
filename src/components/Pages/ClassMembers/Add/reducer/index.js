const emptyUser = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  slack_uuid: "",
  class_id: "",
};

export const initialState = {
  classMember: emptyUser,
  isRouting: false,
  buttonDisabled: true,
  memberManager: "",
  slackUsers: [],
  slackError: null,
  snackbar: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_MEMBER":
      return {
        ...state,
        classMember: { ...state.classMember, [action.key]: action.payload }
      };
    case "EDITING_MEMBER":
      return {
        ...state,
        classMember: { ...state.classMember, ...action.payload }
      };
    case "CLEAR_MEMBER":
      return { ...state, classMember: emptyUser };
    case "TOGGLE_ROUTING":
      return { ...state, isRouting: !state.isRouting };
    case "UPDATE_DISABLED":
      return { ...state, buttonDisabled: action.payload };
    case "UPDATE_MANAGER_NAME":
      return { ...state, memberManager: action.payload };
    case "UPDATE_MENTOR_NAME":
      return { ...state, memberMentor: action.payload };
    case "UPDATE_SLACK_USERS":
      return { ...state, slackUsers: action.payload };
    case "SLACK_ERROR":
      return { ...state, slackError: action.payload };
    case "DISPLAY_SNACKBAR":
      return { ...state, snackbar: action.payload };
    default:
      return state;
  }
};
