import React, { useEffect, useState } from 'react'


import { Link, useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';

import { GetCategorybyId, UpdateCategory } from '../../shared/api/categories';
import { removeCookie } from 'typescript-cookie';
import toast, { Toaster } from 'react-hot-toast';


export default function CategoryUpdate() {
    const { id } = useParams()
    const [title, setTitle] = useState<any>()
    const [datas, setDatas] = useState<any>()
    const navgate = useNavigate()

    useEffect(() => {
        const fetcCategory = async () => {
            const data = await GetCategorybyId(id);
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

        await UpdateCategory({ title: title }, id)
            .then((response: any) => {
                if (response.status == 200) {
                    toast("updated seccesfull")
                    navgate(routes.CATEGORIES)
                } else {
                    toast("failed ")
                }
                if (response?.response) {
                    if (response.response.status == 401) {
                        removeCookie('access_token_user')
                        removeCookie('accessAdminToken')

                        navgate(routes.HOME)
                    }
                }
            })
            .catch(error => {

                toast(error.message)
            })

    }


    if (datas) {
        return (

            <div className='ServicesFrom'>
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.CATEGORIES}> Добавление сайт</Link></button>
                    <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>

                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.CATEGORIES)} >Отменить</button>
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
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.CATEGORIES}> Добавление сайт</Link></button>
                    <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>

                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.CATEGORIES)} >Отменить</button>
                    <button className='ServicesFrom_top-Publish'  >Опубликовывать</button>
                </div>
                <h1>Loading</h1>
                <Toaster />
            </>
        )
    }
}
