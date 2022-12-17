import {
  LOADING,
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  REGISTER,
  REGISTER_ERROR,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  CREATE_MESSAGE,
  CREATE_MESSAGE_ERROR,
  DELETE_MESSAGE_ERROR,
  FETCH_MESSAGES,
  FETCH_MESSAGES_ERROR,
  TOGGLE_THEME,
  TOGGLE_SHOWN_PASSWORD,
  HANDLE_CHANGE,
  OPEN_ALERT,
  CLOSE_ALERT,
  CLEAR_VALUES,
  CLEAR_ERRORS,
  NEW_MESSAGE
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case TOGGLE_THEME:
      return { ...state, theme: state.theme === "dark" ? "light" : "dark" };
    case TOGGLE_SHOWN_PASSWORD:
      return { ...state, isPasswordShown: !state.isPasswordShown };
    case HANDLE_CHANGE:
      return { ...state, [action.payload.name]: action.payload.value };
    case OPEN_ALERT:
      return { ...state, isAlertOpen: true, alertType: action.payload };
    case CLOSE_ALERT:
      return { ...state, isAlertOpen: false, alertType: "" };
    case CLEAR_VALUES:
      return { ...state, email: "", message: "", status: "" };
    case CLEAR_ERRORS:
      return {
        ...state,
        isError: false,
        error: null,
        errorType: ""
      };
    case LOGOUT:
      return { ...state, user: null, token: null };
    case LOGIN:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        user: null,
        token: null,
        isError: true,
        error: action.payload,
        errorType: LOGIN_ERROR
      };
    case REGISTER:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token
      };
    case REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        token: null,
        isError: true,
        error: action.payload,
        errorType: REGISTER_ERROR
      };
    case UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        status: "Profile updated!"
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
        errorType: UPDATE_USER_ERROR
      };
    case FETCH_MESSAGES:
      return {
        ...state,
        isLoading: false,
        messages: action.payload.messages,
        count: action.payload.count
      };
    case FETCH_MESSAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorType: FETCH_MESSAGES_ERROR,
        error: "Error, unable to fetch messages..."
      };

    case DELETE_MESSAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorType: DELETE_MESSAGE_ERROR,
        error: "An error occurs while deleting this message"
      };
    case CREATE_MESSAGE:
      return {
        ...state,
        isLoading: false,
        message: action.payload
      };
    case CREATE_MESSAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorType: CREATE_MESSAGE_ERROR,
        error: action.payload
      };
    default:
      return { ...state };
  }
};
