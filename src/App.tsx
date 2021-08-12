import React from 'react';

import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import { PrivateRoute } from "./components"
import { theme } from "../src/constants";

import * as Pages from "./pages";

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Pages.LoginPage} exact/>
            <PrivateRoute path="/devices" component={Pages.DevicesPage} />
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App;
