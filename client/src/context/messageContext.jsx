import { createContext, useEffect, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { reducer } from "./reducer";
import {
  LOADING,
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  REGISTER,
  REGISTER_ERROR,
  CREATE_MESSAGE,
  CREATE_MESSAGE_ERROR,
  DELETE_MESSAGE_ERROR,
  TOGGLE_THEME,
  TOGGLE_SHOWN_PASSWORD,
  HANDLE_CHANGE,
  OPEN_ALERT,
  CLOSE_ALERT,
  CLEAR_VALUES,
  CLEAR_ERRORS,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  FETCH_MESSAGES,
  FETCH_MESSAGES_ERROR,
  NEW_MESSAGE
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const defaultTheme = matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
document.documentElement.className = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : defaultTheme;

const initState = {
  theme: defaultTheme,
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  count: 0,
  message: "",
  email: "",
  isPasswordShown: false,
  messageError: "",
  messages: [],
  isAlertOpen: false,
  alertType: "",
  isError: false,
  error: null,
  errorType: "",
  status: ""
};

export const AppContext = createContext();
export const useAppContext = () => {
  return useContext(AppContext);
};
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const navigate = useNavigate();

  const toggleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
    document.documentElement.className = state.theme;
    localStorage.setItem("theme", state.theme);
  };
  const toggleShownPassword = () => {
    dispatch({ type: TOGGLE_SHOWN_PASSWORD });
  };

  const openAlert = type => {
    dispatch({ type: OPEN_ALERT, payload: type });
  };
  const closeAlert = () => {
    dispatch({ type: CLOSE_ALERT });
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value }
    });
  };
  const clear = (status, time = 2000) => {
    setTimeout(() => {
      dispatch({ type: status });
    }, time);
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  const login = async input => {
    dispatch({ type: LOADING });
    try {
      const { data } = await axios.post("/api/auth/login", input);
      const { user, token } = data;
      dispatch({ type: LOGIN, payload: { user, token } });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      dispatch({ type: LOGIN_ERROR, payload: error?.response?.data?.msg });
      clear(CLEAR_ERRORS);
    }
  };

  const register = async input => {
    dispatch({ type: LOADING });
    try {
      const { data } = await axios.post(`/api/auth/register`, input);
      const { token } = data;
      dispatch({ type: REGISTER, payload: token });
      localStorage.setItem("token", token);
      navigate("/login");
    } catch (error) {
      dispatch({ type: REGISTER_ERROR, payload: error?.response?.data?.msg });
      clear(CLEAR_ERRORS);
    }
  };

  const updateUser = async currentUser => {
    dispatch({ type: LOADING });
    try {
      const { data } = await axios.patch(`/api/auth/user`, currentUser, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      const { user, token } = data;

      dispatch({ type: UPDATE_USER, payload: { user, token } });
      clear(CLEAR_VALUES);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: error?.response?.data?.msg
      });
      clear(CLEAR_ERRORS);
    }
  };

  const getAllMessages = async () => {
    dispatch({ type: LOADING });
    try {
      const { data } = await axios.get("/api/messages", {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      const { messages, count } = data;
      dispatch({
        type: FETCH_MESSAGES,
        payload: { messages, count }
      });
    } catch (error) {
      dispatch({ type: FETCH_MESSAGES_ERROR });
    }
  };
  const deleteMessage = async id => {
    dispatch({ type: LOADING });
    try {
      await axios.delete(`/api/messages/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      getAllMessages();
      closeAlert();
    } catch (error) {
      dispatch({ type: DELETE_MESSAGE_ERROR });
      clear(CLEAR_ERRORS);
    }
  };

  const createMessage = async input => {
    dispatch({ type: LOADING });
    try {
      const { data } = await axios.post(`/api/messages`, {
        ...input
      });
      const { email, message } = data;

      dispatch({ type: CREATE_MESSAGE, payload: { email, message } });
      clear(CLEAR_VALUES, 0);
      openAlert("success");
    } catch (error) {
      dispatch({
        type: CREATE_MESSAGE_ERROR,
        payload: error?.response?.data?.msg
      });
      clear(CLEAR_ERRORS);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleTheme,
        toggleShownPassword,
        openAlert,
        closeAlert,
        handleChange,
        register,
        login,
        logout,
        updateUser,
        deleteMessage,
        createMessage,
        getAllMessages,
        navigate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
