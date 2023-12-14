import React, { useState } from 'react'
import img from "../../assets/images/Rectanglegrue.svg";
import imgplus from "../../assets/images/Groupd48098535.svg";
import { Link, useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { useForm } from 'react-hook-form';
import { createProtfoio } from '../../shared/api/portfolioapi';
import { removeCookie } from 'typescript-cookie';

import toast, { Toaster } from 'react-hot-toast';
import { ImageUpload } from '../../utils/imageUpload';
export default function PortfolioAdd() {

    const [imgFile, setImgFile] = useState<any>()
    const [loading, setloading] = useState<any>(false)
    const navgate = useNavigate()
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const HandleAddPortfolio = async (data: any) => {
        setloading(true)

        await createProtfoio({ title: data?.title, link: data?.link, creator: data?.creator, avatar: imgFile })
            .then((response: any) => {

                setloading(false)
                if (response.status == 201) {
                    setloading(true)
                    toast("item creates")
                    navgate(routes.PORTFOLIO)
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
                setloading(false)
                toast(error.message)
            })
    }
    const hendleimg = async (e: any) => {
        if (e.target.files[0]) {
            const data = await ImageUpload(e.target.files[0])
            setImgFile(data)
        }
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
            <form className='ServicesFrom'>
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.PORTFOLIO}> Добавление сайт</Link></button>
                    <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>
                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.PORTFOLIO)}>Отменить</button>
                    <button className='ServicesFrom_top-Publish' onClick={handleSubmit(HandleAddPortfolio)}>Опубликовывать</button>
                </div>
                <div className="ServicesFrom_from">
                    <div className='ServicesFrom_from-mid mid2'>
                        <div className='mid2-div'>
                            <label className='ServicesFrom_from-img img12' >
                                <input className='img2-img' type={"file"} onChange={hendleimg} accept='image/*' />
                                <img className='ServicesFrom_from-imgvie' src={imgFile ? imgFile : img} alt="" width={254} height={179} />
                                <img className='ServicesFrom_from-imgvie imgplus' src={imgplus} alt="" width={60} />
                            </label>
                        </div>
                        <div className='ServicesFrom_from-mid-left'>
                            <input className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" placeholder='Название сайта' {...register("title", {
                                required: true,
                            })} />
                            <div className='ServicesFrom_from-mid-tags'>
                                <input className='ServicesFrom_from-mid-inputtag' type="text" placeholder='#link' onClick={(e: any) => e.target.classList.add("inputtagcolor")}  {...register("link", {
                                    required: true,
                                })} />
                                <input className='ServicesFrom_from-mid-inputtag iputimgback' type="text" placeholder='Имя компания' {...register("creator", {
                                    required: true,
                                })} />
                            </div>

                        </div>
                    </div>
                </div>
                <Toaster />
            </form>
        )
    }

}
