import { useState } from 'react';
import './App.css';

import GlobalContext from './shared/contexts/GlobalContext';

import '../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../node_modules/@syncfusion/ej2-react-navigations/styles/material.css';

import Home from './app/home/home';
import { getCookie } from 'typescript-cookie'
import { Login } from '@mui/icons-material';

import LoginPage from './app/login/Login';

function App() {
  // const [token, setToken] = useState<any>(getCookie("accessToken") || false)

  const [page, setPage] = useState<any>('Главная')


  const hendleSetPage = (value: any): any => {
    setPage(value);
  };
  // const hendleSetToken = (value: any): any => {
  //   setToken(value);
  // };


  return (
    <>
      <GlobalContext.Provider value={{ page, setPage: hendleSetPage }}>
        {/* {token ? <Home /> : <LoginPage />} */}
        <Home />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
