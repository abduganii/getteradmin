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
import { Route, Routes } from 'react-router-dom';
import WebsitesList from './components/websites/websitesList';
import WebsitesAdd from './components/websites/WebitemAdd';
import WebsitesUpdate from './components/websites/WebItemUpdate';
import PortfolioList from './components/Portfolio/PortfolioList';
import PortfolioAdd from './components/Portfolio/PortfolioAdd';
import PortfolioUpdate from './components/Portfolio/PortfolioUpdate';
import ArticlesList from './components/Articles/ArticlesList';
import ArticlesShow from './components/Articles/ArticlesShow';
import ArticlesAdd from './components/Articles/ArticlesAdd';
import ArticlesUpdate from './components/Articles/ArticlesUpdate';
import Newslist from './components/Newslist/Newslist';
import NewsAddFrom from './components/NewsAddFrom/NewsAddFrom';
import NewsFrom from './components/newsFrom/NewsFrom';
import Userslist from './components/users/userlist';
import Categorylist from './components/category/categoryList';
import CategoryAdd from './components/category/categoryAdd';
import CategoryUpdate from './components/category/categoryUpdate';
import Positionlist from './components/Position/positionList';
import PositionAdd from './components/Position/positionAdd';
import PositionUpdate from './components/Position/positionUpdate';
import OrderList from './components/order/oreserlist';
import AboutUs from './components/aboutUs/AboutUs';
import Contact from './components/contact/Contact';
import routes from './shared/constants/routes';

function App() {
  const [token, setToken] = useState<any>(getCookie("accessToken") || false)

  const [page, setPage] = useState<any>('Главная')


  const hendleSetPage = (value: any): any => {
    setPage(value);
  };
  const hendleSetToken = (value: any): any => {
    setToken(value);
  };


  return (
    <>
      {/* <GlobalContext.Provider value={{ page, setPage: hendleSetPage }}>
        {token ? <Home /> : <LoginPage />}
      </GlobalContext.Provider> */}
      <Routes>
        <Route path={routes.WEBSITE} element={<WebsitesList />} />
        <Route path={routes.WEBSITEADD} element={<WebsitesAdd />} />
        <Route path={routes.WEBSITEUPDATE + "/:id"} element={<WebsitesUpdate />} />
        <Route path={routes.PORTFOLIO} element={<PortfolioList />} />
        <Route path={routes.PORTFOLIOADD} element={<PortfolioAdd />} />
        <Route path={routes.PORTFOLIOUPDATE + '/:id'} element={<PortfolioUpdate />} />
        <Route path={routes.ARTICLES} element={<ArticlesList />} />
        <Route path={routes.ARTICLESSHOW} element={<ArticlesShow />} />
        <Route path={routes.ARTICLESADD} element={<ArticlesAdd />} />
        <Route path={routes.ARTICLESUPDATE + '/:id'} element={<ArticlesUpdate />} />
        <Route path={routes.NEWS} element={<Newslist />} />
        <Route path={routes.ADDNEWS} element={<NewsAddFrom />} />
        <Route path={routes.UPDATENEWS + "/:id"} element={<NewsFrom />} />
        <Route path={routes.USERS} element={<Userslist />} />
        <Route path={routes.CATEGORIES} element={<Categorylist />} />
        <Route path={routes.ADDCATEGORIES} element={<CategoryAdd />} />
        <Route path={routes.UPDATECATEGORIES + "/:id"} element={<CategoryUpdate />} />
        <Route path={routes.POSITION} element={<Positionlist />} />
        <Route path={routes.ADDPOSITION} element={<PositionAdd />} />
        <Route path={routes.UPDATEPOSITION + "/:id"} element={<PositionUpdate />} />

        <Route path={routes.ORDER} element={<OrderList />} />
        <Route path={routes.ABOUTUS} element={<AboutUs />} />
        <Route path={routes.CONTACTS} element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
