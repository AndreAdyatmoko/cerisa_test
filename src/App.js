import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { ChakraProvider} from '@chakra-ui/react';
import AuthComponent from './component/AuthComponent';
import { Provider } from 'react-redux';
import {store} from "../../test/src/store/store"
import LoginPage from './component/Login';


const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register" element={<AuthComponent />} />
        </Routes>
      </ChakraProvider>
    </Provider>
  )
}

export default App