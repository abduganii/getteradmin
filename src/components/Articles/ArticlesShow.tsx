import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import routes from '../../shared/constants/routes'
import heart from '../../assets/images/Groupds48098279.svg'
import messege from '../../assets/images/Groupme48098278.svg'
import saved from '../../assets/images/Groupsav48098277.svg'
import sais from '../../assets/images/Groupsoais48098378.svg'
import man from '../../assets/images/Ellipse377.png'
import img from '../../assets/images/Rectangleimf111001473.svg'

export default function ArticlesShow() {

    const [item, setItem] = useState<any>(JSON.parse(window.localStorage.getItem("data") || '{}') || {})

    const navigate = useNavigate()
    console.log(item)
    return (
        <div className='ServicesFrom'>
            <div className="ServicesFrom_top">
                <button className='ServicesFrom_top-back' onClick={() => navigate(-1)}> Статьи</button>
                <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>
                <button className='ServicesFrom_top-Cancel'>Отменить</button>
                <button className='ServicesFrom_top-Publish'>Опубликовывать</button>
            </div>
            <div className='Articles_wrap'>
                <div className='Articles_wrap-icons'>
                    <img src={heart} alt="" />
                    <img src={messege} alt="" />
                    <img src={saved} alt="" />
                    <img src={sais} alt="" />
                </div>
                <div className='Articles_wrap-content'>
                    <h1 className='Articles_wrap-title'>{item?.title}</h1>
                    <div className='Articles_wrap-data'>
                        <p className='Articles_wrap-datap'>January 25, 2023</p>
                        <span className='Articles_wrap-dataspa'>6 minutes</span>
                    </div>
                    <div className='Articles_wrap-avatar'>
                        <img className='Articles_wrap-avatar-img' src={item?.avatar} alt="" />
                        <div className='Articles_wrap-avatar-div'>
                            <p className='Articles_wrap-avatar-name'>{item?.name}</p>
                            <p className='Articles_wrap-avatar-job'>Ux Ui designer</p>
                        </div>
                    </div>
                    <img className='Articles_wrap-img' src={item?.img} alt="" />

                    <h2 className='Articles_wrap-topic'>{item?.title}</h2>
                    <p className='Articles_wrap-text'>{item?.description} </p>

                </div>
            </div>
        </div>
    )

}
