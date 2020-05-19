import { SetSignOutState } from "../redux/actions/authentication";

// TODO: add refresh token support

const unauthorizedMiddleware = ({ dispatch }) => (next) => (action) => {

  if (action.payload && action.payload.status === 401) {
    dispatch(SetSignOutState());
  } else {
    next(action);
  }
};

export default unauthorizedMiddleware;