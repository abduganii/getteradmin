import React, { useState } from 'react'
import img from "../../assets/images/Rectanglegrue.svg";
import imgplus from "../../assets/images/Groupd48098535.svg";

import { Link, useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { useForm } from 'react-hook-form';
import { createWebSite } from '../../shared/api/websiteapi';
import { removeCookie } from 'typescript-cookie';



export default function WebsitesAdd() {
    const params = useParams()
    const [loading, setloading] = useState(false)
    const navgate = useNavigate()
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const HandleAddWebsite = async (data: any) => {
        setloading(true)
        await createWebSite(data)
            .then((response: any) => {
                if (response.status === 200 || response.status === 201) {
                    setloading(false)
                    alert("item ccreates")
                    navgate(routes.WEBSITE)
                }
                if (response?.response) {
                    if (response.response.status == 401) {
                        removeCookie('access_token_user')
                        navgate(routes.HOME)
                    }
                }
            })
            .catch(error => {
                setloading(false)
                alert(error.message)

            })
    }


    if (loading) {
        return (
            <>
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.WEBSITE}> Добавление сайт</Link></button>
                    <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>

                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.WEBSITE)} >Отменить</button>
                    <button className='ServicesFrom_top-Publish'  >Опубликовывать</button>
                </div>
                <h1>loading</h1>
            </>
        )
    } else {
        return (
            <form className='ServicesFrom' >
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.WEBSITE}> Добавление сайт</Link></button>
                    <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>

                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.WEBSITE)} >Отменить</button>
                    <button className='ServicesFrom_top-Publish' onClick={handleSubmit(HandleAddWebsite)} >Опубликовывать</button>
                </div>
                <div className="ServicesFrom_from">
                    <div className='ServicesFrom_from-mid mid2'>
                        <div className='mid2-div'>
                            <label className='ServicesFrom_from-img img12' >
                                <img className='ServicesFrom_from-imgvie imgplus' src={imgplus} alt="" width={60} />
                            </label>

                        </div>
                        <div className='ServicesFrom_from-mid-left'>
                            <input className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" placeholder='Название сайта' {...register("title", {
                                required: true,
                            })} />
                            <div className='ServicesFrom_from-mid-tags'>
                                <input className='ServicesFrom_from-mid-inputtag' type="text" placeholder='#link'{...register("link", {
                                    required: true,
                                })} onClick={(e: any) => e.target.classList.add("inputtagcolor")} />
                                <input className='ServicesFrom_from-mid-inputtag iputimgback' type="text" placeholder='Имя компания' {...register("creator", {
                                    required: true,
                                })} />
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
