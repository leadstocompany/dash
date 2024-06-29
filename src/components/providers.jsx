import { store } from "@/store";
import { setUser } from "@/store/slice/user";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { Toaster } from "./ui/toaster";

const LOCAL_STORAGE_TOKEN_KEY = import.meta.env.VITE_LOCAL_STORAGE_TOKEN_KEY;
const LOCAL_STORAGE_USER_KEY = import.meta.env.VITE_LOCAL_STORAGE_USER_KEY;

const Providers = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
    if (token && user) {
      store.dispatch(setUser({ ...user, token }));
    }
  }, []);
  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
