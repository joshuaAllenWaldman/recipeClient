import {useContext, createContext} from 'react';
import { Redirect } from 'react-router-dom';

export const TokenContext = createContext({token: undefined});
const API_BASE = 'http://localhost:4000/api/v1';


// function useAuth() {
//   const {token} = useContext(TokenContext);
//   return {
//     isLoggedIn: token.token !== undefined,
//     logOut: () => redirect('/logout'),
//     logIn,
//     token: token.token
//   }
// }

export default function useApi() {
  const {token} = useContext(TokenContext);
  const signup = (path, args) => fetch(path, {
    ...args,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const login = (path, args) => fetch(path, {
    ...args,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const get = (path, args) => fetch(path, {
    ...args, 
    Authorization: `Bearer ${token}`, 
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    });
  const post = (path, args) => fetch(path, {
    ...args,
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

  });
  const del = (path, args) => fetch(path, {
    ...args,
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

  });
  const put = (path, args) => fetch(path, {
    ...args,
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

  });

  return {
    get,
    post,
    del,
    put,
    signup, 
    login
  };
}