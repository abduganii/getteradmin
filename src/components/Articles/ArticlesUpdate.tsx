import React, { useEffect, useState } from 'react'
import img from "../../assets/images/Rectanglegrue.svg";
import imgplus from "../../assets/images/Groupd48098535.svg";

import { Link, useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { GetArticlesbyid, UpdateArticles } from '../../shared/api/articles';
import { GetCategory } from '../../shared/api/categories';
import { getCookie, removeCookie } from 'typescript-cookie';
import toast, { Toaster } from 'react-hot-toast';


export default function ArticlesUpdate() {

    const { id } = useParams()
    const [imgFile, setImgFile] = useState<any>()
    const [tag2, setTags2] = useState('')
    const [categoriesId, setCategoryId] = useState<any>()
    const [categoriesArr, setCategoriesARR] = useState<any>()
    const [title, setTitle] = useState<any>()
    const [text, setText] = useState<any>()
    const [images, setImages] = useState<any>()
    const [datas, setDatas] = useState<any>()
    const navgate = useNavigate()


    useEffect(() => {
        const fetchWebSite = async () => {
            const { data } = await GetArticlesbyid(id);
            setDatas(data)
            setCategoryId(data?.category?.id)
            setTags2(data?.tags.join(" "))
            setTitle(data?.title)
            setText(data?.description)
            setImages(data?.avatar?.url)

        }
        const fetcCategory = async () => {
            const data = await GetCategory();
            setCategoriesARR(data?.items)

        }

        fetcCategory()
            .then((err) => {
                console.log("err");
            })

        fetchWebSite()
            .then((err) => {
                console.log("err");
            })

    }, []);
    const Handleupdatewebsite = async () => {

        const formData = new FormData()
        const cooks = getCookie('admin_id') || ""
        const arr = tag2.split(' ')

        if (imgFile) {
            formData.append("file", imgFile)
        }
        formData.append("title", title)
        formData.append("description", text)
        formData.append("tags", JSON.stringify(arr))
        formData.append("category", categoriesId)
        formData.append("user", cooks)


        await UpdateArticles(formData, id)
            .then((response: any) => {
                if (response.status == 200) {
                    toast("updated seccesfull")
                    navgate(routes.ARTICLES)
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

    const hendleimg = (e: any) => {
        if (e.target.files[0]) {
            setImgFile(e.target.files[0])
        }
    }
    const handelshow = () => {

        localStorage.setItem("data", JSON.stringify({
            img: imgFile ? URL.createObjectURL(imgFile) : images,
            title: title,
            description: text,
            name: datas?.user?.name,
            avatar: datas?.user?.avatar?.url,
            position: datas?.user?.position?.title
        }))

        navgate(routes.ARTICLESSHOW)
    }
    if (datas) {
        return (

            <div className='ServicesFrom'>
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.ARTICLES}> Статьи</Link></button>
                    <button className='ServicesFrom_top-delete ServicesFrom_top-deleteshow btnopacity'>Удалить</button>
                    <button className='ServicesFrom_top-show btnopacity' onClick={handelshow}
                    >Предпросмотр</button>
                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.ARTICLES)}>Отменить</button>
                    <button className='ServicesFrom_top-Publish' onClick={Handleupdatewebsite}>Опубликовывать</button>
                </div>
                <form className="ServicesFrom_from">
                    <div className='ServicesFrom_from-mid mid2'>
                        <div className='mid2-div'>
                            <label className='ServicesFrom_from-img img12' >
                                <input className='img2-img' type={"file"} onChange={hendleimg} />
                                <img className='ServicesFrom_from-imgvie' src={images ? imgFile ? URL.createObjectURL(imgFile) : images : imgFile ? URL.createObjectURL(imgFile) : img} alt="" width={254} />
                                <img className='ServicesFrom_from-imgvie imgplus' src={imgplus} alt="" width={60} />
                            </label>
                        </div>
                        <div className='ServicesFrom_from-mid-left'>

                            <div className='ServicesFrom_from-mid-tags'>
                                {categoriesArr ? <select className='ServicesFrom_from-select' name="id" id="cars" onChange={(e: any) => setCategoryId(e.target.value)}>
                                    <option selected disabled value={categoriesId}>Выберите категории</option>
                                    {categoriesArr?.map((e: any) => (
                                        <option value={e?.id} >{e?.title}</option>
                                    ))}
                                </select> : ""}
                                <input className='ServicesFrom_from-mid-inputtag' type="text" value={tag2} placeholder='#Добавить хэштег' onClick={(e: any) => e.target.classList.add("inputtagcolor")} onChange={(e: any) => {

                                    if (e.target.value !== "#" && e.target.value.length == 1) {
                                        setTags2("#" + e.target.value)
                                    } else {
                                        setTags2(e.target.value)
                                    }
                                    // if (e.target.value.split("")[e.target.value.length - 1] == " ") {
                                    //     setTags2(e.target.value + "#")
                                    // }
                                    e.target.classList.add("inputtagcolor")
                                }} />
                            </div>
                            <input className='ServicesFrom_from-mid-inputtitle inputtitle3 ' value={title} onChange={(e: any) => setTitle(e.target.value)} type="text" placeholder='Название сайта' />

                        </div>
                    </div>

                    <input className='ServicesFrom_from-textTextarea' value={text} onChange={(e: any) => setText(e.target.value)} type="text" placeholder='Текст' />
                </form>
                <Toaster />
            </div>
        )
    } else {
        return (
            <>
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.ARTICLES}> Добавление сайт</Link></button>
                    <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>

                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.ARTICLES)} >Отменить</button>
                    <button className='ServicesFrom_top-Publish' >Опубликовывать</button>
                </div>
                <h1>Loading</h1>
            </>
        )
    }
}
