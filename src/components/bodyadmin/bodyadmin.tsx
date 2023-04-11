import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from '../../shared/constants/routes'
import Navbar from '../navbar/navbar'
import NewsFrom from '../newsFrom/NewsFrom'
import Newslist from '../Newslist/Newslist'
import AboutUs from '../aboutUs/AboutUs'
import Contact from '../contact/Contact'
import NewsAddFrom from '../NewsAddFrom/NewsAddFrom'
import WebsitesList from '../websites/websitesList'
import WebsitesAdd from '../websites/WebitemAdd'
import WebsitesUpdate from '../websites/WebItemUpdate'
import PortfolioList from '../Portfolio/PortfolioList'
import PortfolioUpdate from '../Portfolio/PortfolioUpdate'
import PortfolioAdd from '../Portfolio/PortfolioAdd'
import ArticlesList from '../Articles/ArticlesList'
import ArticlesAdd from '../Articles/ArticlesAdd'
import ArticlesUpdate from '../Articles/ArticlesUpdate'
import Userslist from '../users/userlist'
import ArticlesShow from '../Articles/ArticlesShow'
import OrderList from '../order/oreserlist'
import Categorylist from '../category/categoryList'
import CategoryAdd from '../category/categoryAdd'
import CategoryUpdate from '../category/categoryUpdate'

export default function Bodyadmin() {
    return (
        <div className='Bodyadmin'>
            <div className="container">
                <Navbar />
                <div className='Bodyadmin-left'>
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

                        <Route path={routes.ORDER} element={<OrderList />} />
                        <Route path={routes.ABOUTUS} element={<AboutUs />} />
                        <Route path={routes.CONTACTS} element={<Contact />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
