import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Signup from '../src/pages/SignUp'
import SingleTrip from '../src/pages/SingleTrip'

import { ChakraProvider } from "@chakra-ui/react"


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App(Component) {
  return (
    <BrowserRouter>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/trip/:tripId" element={<SingleTrip />} />
        </Routes>
        <Footer />
      </ChakraProvider>
    </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;