import { useState, useEffect } from 'react'

import { TokenContext } from "./useApi";


function getToken(key, token){

  const savedToken = JSON.parse(localStorage.getItem(key))
  if(savedToken) return savedToken
  if(initialValue instanceof Function) return token()
  return token;

}


export default function useLocalStorage (key, token ) {
  const [token, setToken ] = useState(() => {
    return getToken(key, token)
  })

  useEffect(() => {
    localStorage.setItem(key,)
  })
  
  return [token, setToken];
}