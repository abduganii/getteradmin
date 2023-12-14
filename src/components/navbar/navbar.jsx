import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import routes from '../../shared/constants/routes'
import GlobalContext from '../../shared/contexts/GlobalContext'

export default function Navbar() {
    const { page, setPage } = useContext(GlobalContext)


    return (
        <div className='navbar'>
            <ul className='navbar-list' >
                <li className='navbar-item' onClick={() => setPage(`Главная`)}>  <NavLink activeClassName className='navbar-link' to={routes.HOME}  >Главная   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Все сайты')}>  <NavLink activeClassName className='navbar-link' to={routes.WEBSITE} >Все сайты   </NavLink> </li>

                <li className='navbar-item' onClick={() => setPage('Портфолио')}>  <NavLink activeClassName className='navbar-link' to={routes.PORTFOLIO} >Портфолио  </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Статьи')}>  <NavLink activeClassName className='navbar-link' to={routes.ARTICLES} >Статьи  </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Пользователи')}>  <NavLink activeClassName className='navbar-link' to={routes.USERS} >Пользователи   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Заказы')}>  <NavLink activeClassName className='navbar-link' to={routes.ORDER} >Заказы   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Категории')}>  <NavLink activeClassName className='navbar-link' to={routes.CATEGORIES} >Категории   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('POSITION')}>  <NavLink activeClassName className='navbar-link' to={routes.POSITION} >POSITION   </NavLink> </li>


            </ul>
            <p className='navbar-settings'> <NavLink className='navbar-link' to={routes.SETTINGS}>Настройки</NavLink></p>
        </div>
    )
}
