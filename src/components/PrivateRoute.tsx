import React from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthStore } from "../constants";

import { useAuthStore } from "../stores";

export default function PrivateRoute(routeProps: any) {

  const token = useAuthStore((state: AuthStore) => state.token);

  return (
    token ? <Route {...routeProps}/> : <Redirect to={{ pathname: "/" }}/>
  )
}
