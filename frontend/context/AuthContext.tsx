import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// Create the AuthContext
export const AuthContext = createContext<any>({
  isAuthenticated: false,
  isLoading: false,
});
// export const AuthContext = createContext<{
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login?: () => void;
//   logout?: () => void;
//   setIsLoading?: (_: boolean) => void;
// }>({ isAuthenticated: false, isLoading: false });

const ActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SETLOADING: "SETLOADING",
};

// Define initial state
const initialState = {
  isAuthenticated: false,
  isLoading: false,
};

// Define reducer function
const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case ActionTypes.SETLOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// AuthProvider component to wrap your entire application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State to manage authentication status
  const [state, dispatch] = useReducer(authReducer, initialState);
  const login = () => {
    dispatch({ type: ActionTypes.SETLOADING, payload: true });
    dispatch({ type: ActionTypes.LOGIN });
    dispatch({ type: ActionTypes.SETLOADING, payload: false });
  };

  const logout = () => {
    dispatch({ type: ActionTypes.SETLOADING, payload: true });
    dispatch({ type: ActionTypes.LOGOUT });
    dispatch({ type: ActionTypes.SETLOADING, payload: false });
  };

  const isLoggedIn = async () => {
    try {
      dispatch({ type: ActionTypes.SETLOADING, payload: true });

      const token: string | null = await AsyncStorage.getItem("token");
      if (token) {
        dispatch({ type: ActionTypes.LOGIN });
      }
      dispatch({ type: ActionTypes.SETLOADING, payload: false });
    } catch (error) {}
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
