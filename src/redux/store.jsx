import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("foodhub");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("foodhub", JSON.stringify(state));
  } catch {}
};

const initialState = {
  admin: null,
  isAdminLoggedIn: false,
  users: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN_SUCCESS":
      return { ...state, admin: action.payload, isAdminLoggedIn: true };

    case "ADMIN_LOGOUT":
      return initialState;

    case "FETCH_USERS_REQUEST":
      return { ...state, loading: true };

    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.payload };

    case "FETCH_USERS_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  loadState(),
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState({
    admin: store.getState().admin,
    isAdminLoggedIn: store.getState().isAdminLoggedIn,
    users: store.getState().users,
  });
});

export default store;
