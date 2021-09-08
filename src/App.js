import React from 'react'
import Header from './Components/Header/header';
import Home from './Pages/Home/Home';
import Details from './Pages/Detail/Detail';
import CartContextProvider from './Context/cartContext'
import BookContextProvider from './Context/bookContext'
import {BrowserRouter as HashRouter, Router, Switch, Route,} from "react-router-dom";
import SearchPage from './Pages/SearchPage/SearchPage'
import { ApolloClient, ApolloProvider } from "@apollo/client"
import {InMemoryCache} from '@apollo/client';

function App() {

  const client = new ApolloClient({
    uri: "https://quidax-feec-graphql.herokuapp.com/graphql",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {}
        }
      }
    })
  });
  return (
    <div>
      <CartContextProvider>
        <HashRouter basename="/">
          <ApolloProvider client={client}>
          <BookContextProvider>
            <Header/>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route exact path="/search">
                <SearchPage/>
              </Route>
              <Route exact path="/books/:id">
                <Details/>
              </Route>
            </Switch>
          </BookContextProvider>
          </ApolloProvider>
        </HashRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
