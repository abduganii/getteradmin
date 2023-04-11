import React, { useEffect, useState } from 'react'
import img from "../../assets/images/Rectanglegrue.svg";
import imgplus from "../../assets/images/Groupd48098535.svg";


import { Link, useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm } from 'react-hook-form';
import { getCookie, removeCookie } from 'typescript-cookie';
import { createArticles } from '../../shared/api/articles';
import { GetCategory } from '../../shared/api/categories';



export default function ArticlesAdd() {
    const params = useParams()
    const [tag2, setTags2] = useState<any>('')
    const [categories, setCategories] = useState<any>('')
    const [categoryId, setCategoryId] = useState<any>('')
    const [imgFile, setImgFile] = useState<any>()
    const [loading, setloading] = useState<any>(false)
    const navgate = useNavigate()

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetCategory();
            setCategories(data?.items)

        }

        fetchWebSite()
            .then((err) => {
                console.log("err");
            })

    }, []);


    const HandleAddPortfolio = async (data: any) => {
        setloading(true)
        const cooks = getCookie('user_id') || ""
        const arr = tag2.split(' ')
        const formData = new FormData()
        formData.append("file", imgFile)
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("tags", JSON.stringify(arr))
        formData.append("category", categoryId)
        formData.append("user", cooks)


        await createArticles(formData)
            .then((response: any) => {
                setloading(false)
                if (response.status == 200 || response.status == 201) {
                    alert("item creates")
                    navgate(routes.ARTICLES)
                } else {
                    alert("failed ")
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
    const hendleimg = (e: any) => {
        if (e.target.files[0]) {
            setImgFile(e.target.files[0])
        }
    }



    return (

        <div className='ServicesFrom'>
            <div className="ServicesFrom_top">
                <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.ARTICLES}> Статьи</Link></button>
                <button className='ServicesFrom_top-delete ServicesFrom_top-deleteshow btnopacity'>Удалить</button>
                <button className='ServicesFrom_top-show btnopacity' onClick={() => navgate(routes.ARTICLESSHOW)}>Предпросмотр</button>
                <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.ARTICLES)}>Отменить</button>
                <button className='ServicesFrom_top-Publish' onClick={handleSubmit(HandleAddPortfolio)}>Опубликовывать</button>
            </div>
            {loading ? <h1> loading</h1> : <>
                {
                    <form className="ServicesFrom_from">
                        <div className='ServicesFrom_from-mid mid2'>
                            <div className='mid2-div'>
                                <label className='ServicesFrom_from-img img12' >
                                    <input className='img2-img' type={"file"} onChange={hendleimg} accept='image/*' />
                                    <img className='ServicesFrom_from-imgvie' src={imgFile ? URL.createObjectURL(imgFile) : img} alt="" width={254} height={179} />
                                    <img className='ServicesFrom_from-imgvie imgplus' src={imgplus} alt="" width={60} />
                                </label>
                            </div>
                            <div className='ServicesFrom_from-mid-left'>

                                <div className='ServicesFrom_from-mid-tags'>
                                    {categories ? <select className='ServicesFrom_from-select' name="id" id="cars" onChange={(e: any) => setCategoryId(e.target.value)}>
                                        <option selected disabled value={0}>Выберите категории</option>
                                        {categories?.map((e: any) => (
                                            <option value={e?.id} >{e?.title}</option>
                                        ))}
                                    </select> : ""}

                                    <input className='ServicesFrom_from-mid-inputtag' type="text" value={tag2} placeholder='# Добавить хэштег' onClick={(e: any) => e.target.classList.add("inputtagcolor")} onChange={e => {
                                        if (e.target.value !== "#" && e.target.value.length == 1) {
                                            setTags2("#" + e.target.value)
                                        } else {
                                            setTags2(e.target.value)
                                        }
                                        e.target.classList.add("inputtagcolor")
                                    }} />
                                </div>

                                <input className='ServicesFrom_from-mid-inputtitle inputtitle3 ' type="text" placeholder='Загаловка Статьи'  {...register("title", {
                                    required: true,
                                })} />
                            </div>
                        </div>

                        <input className='ServicesFrom_from-textTextarea' type="text" placeholder='Текст' {...register("description", {
                            required: true,
                        })} />
                    </form>
                }</>}
        </div>
    )
}
