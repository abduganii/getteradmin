import React, { useEffect, useState } from 'react'


import { Link, useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';

import { GetCategorybyId, UpdateCategory } from '../../shared/api/categories';
import { removeCookie } from 'typescript-cookie';
import { GetPortfoliobyid } from '../../shared/api/portfolioapi';
import { UpdatePosition } from '../../shared/api/position';


export default function PositionUpdate() {
    const { id } = useParams()
    const [title, setTitle] = useState<any>()
    const [datas, setDatas] = useState<any>()
    const navgate = useNavigate()

    useEffect(() => {
        const fetcCategory = async () => {
            const data = await GetPortfoliobyid(id);
            console.log(data)
            setDatas(data)
            setTitle(data?.title)
        }

        fetcCategory()
            .then((err) => {
                console.log("err");
            })

    }, []);
    const HandleupdateCategoty = async () => {

        await UpdatePosition({ title: title }, id)
            .then((response: any) => {
                if (response.status == 200) {
                    alert("updated seccesfull")
                    navgate(routes.POSITION)
                } else {
                    alert("failed ")
                }
                if (response?.response) {
                    if (response.response.status == 401) {
                        removeCookie('accessAdminToken')
                        navgate(routes.HOME)
                    }
                }
            })
            .catch(error => {

                alert(error.message)
            })

    }


    if (datas) {
        return (

            <div className='ServicesFrom'>
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.POSITION}> Добавление сайт</Link></button>
                    <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>

                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.POSITION)} >Отменить</button>
                    <button className='ServicesFrom_top-Publish' onClick={HandleupdateCategoty}  >Опубликовывать</button>
                </div>
                <form className="ServicesFrom_from">

                    <input className='ServicesFrom_from-mid-inputtitle inputtitle3 ' value={title} onChange={(e: any) => setTitle(e.target.value)} type="text" placeholder='Название сайта' />
                </form>
            </div>
        )
    } else {
        return (
            <>
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.POSITION}> Добавление сайт</Link></button>
                    <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>

                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.POSITION)} >Отменить</button>
                    <button className='ServicesFrom_top-Publish'  >Опубликовывать</button>
                </div>
                <h1>Loading</h1>
            </>
        )
    }
}
