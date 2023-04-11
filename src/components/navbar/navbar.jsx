import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import routes from '../../shared/constants/routes'
import GlobalContext from '../../shared/contexts/GlobalContext'

export default function Navbar() {
    const { page, setPage } = useContext(GlobalContext)


    return (
        <div className='navbar'>
            <ul className='navbar-list' >
                <li className='navbar-item' onClick={() => setPage(`Главная`)}>  <NavLink activeClassName className='navbar-link' to={'/'}  >Главная   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Все сайты')}>  <NavLink activeClassName className='navbar-link' to={'/webSites'} >Все сайты   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Продукты')}>  <NavLink activeClassName className='navbar-link' to={'/products'} >Продукты   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Портфолио')}>  <NavLink activeClassName className='navbar-link' to={'/portfolio'} >Портфолио  </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Статьи')}>  <NavLink activeClassName className='navbar-link' to={'/Articles'} >Статьи  </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Пользователи')}>  <NavLink activeClassName className='navbar-link' to={'/users'} >Пользователи   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Заказы')}>  <NavLink activeClassName className='navbar-link' to={'/Order'} >Заказы   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Категории')}>  <NavLink activeClassName className='navbar-link' to={'/categories'} >Категории   </NavLink> </li>

            </ul>
            <p className='navbar-settings'> <NavLink className='navbar-link' to={routes.SETTINGS}>Настройки</NavLink></p>
        </div>
    )
}
