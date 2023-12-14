import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
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
import PositionAdd from '../Position/positionAdd'
import Positionlist from '../Position/positionList'
import PositionUpdate from '../Position/positionUpdate'

export default function Bodyadmin() {
    return (
        <div className='Bodyadmin'>
            <div className="container">
                <Navbar />
                <div className='Bodyadmin-left'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
