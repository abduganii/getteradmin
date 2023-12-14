import React, { useEffect, useState } from 'react'
import img from "../../assets/images/Rectanglegrue.svg";
import imgplus from "../../assets/images/Groupd48098535.svg";
import { Link, useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { GetWebSitebyid, UpdateWebSite } from '../../shared/api/websiteapi';
import { removeCookie } from 'typescript-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { ImageUpload } from '../../utils/imageUpload';


export default function WebsitesUpdate() {
    const { id } = useParams<any>()
    const [loading, setloading] = useState<any>(false)
    const [images, setImages] = useState<any>()
    const [datas, setDatas] = useState<any>()
    const [link, setLink] = useState<any>()
    const [creator, setCreator] = useState<any>()
    const [title, setTitle] = useState<any>()
    const [imgFile, setImgFile] = useState<any>()
    const navgate = useNavigate()

    useEffect(() => {
        const fetchWebSite = async () => {
            const { data } = await GetWebSitebyid(id);
            setDatas(data)
            setLink(data?.link)
            setCreator(data?.creator)
            setTitle(data?.title)
            setImages(data?.avatar)
        }

        fetchWebSite()
            .then((err) => {
                console.log("err");
            })

    }, []);

    const Handleupdatewebsite = async () => {
        setloading(true)
        await UpdateWebSite({ title: title, link: link, avatar: imgFile, creator: creator }, id)
            .then((response: any) => {
                setloading(false)
                if (response.status == 200) {
                    toast("updated seccesfull")
                    navgate(routes.WEBSITE)
                } else {
                    toast("failed ")
                }
                if (response?.response) {

                    if (response.response.status == 401) {
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
    if (datas) {
        return (

            <div className='ServicesFrom'>
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.WEBSITE}> Добавление сайт</Link></button>
                    <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>
                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.WEBSITE)} >Отменить</button>
                    <button className='ServicesFrom_top-Publish' onClick={Handleupdatewebsite}>Опубликовывать</button>
                </div>
                <form className="ServicesFrom_from">
                    <div className='ServicesFrom_from-mid mid2'>
                        <div className='mid2-div'>
                            <label className='ServicesFrom_from-img img12' >
                                <input className='img2-img' type={"file"} onChange={hendleimg} />
                                <img className='ServicesFrom_from-imgvie' src={images ? imgFile ? imgFile : images : imgFile ? imgFile : img} alt="" width={254} />
                                <img className='ServicesFrom_from-imgvie imgplus' src={imgplus} alt="" width={60} />
                            </label>

                        </div>
                        <div className='ServicesFrom_from-mid-left'>
                            <input className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" value={title} placeholder='Название сайта' onChange={(e: any) => setTitle(e.target.value)} />
                            <div className='ServicesFrom_from-mid-tags'>
                                <input className='ServicesFrom_from-mid-inputtag inputtagcolor' type="text" value={link} placeholder='#link' onClick={(e: any) => e.target.classList.add("inputtagcolor")} onChange={(e: any) => setLink(e.target.value)} />
                                <input className='ServicesFrom_from-mid-inputtag iputimgback' type="text" value={creator} placeholder='Имя компания' onChange={(e: any) => setCreator(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </form>
                <Toaster />
            </div>
        )
    } else {
        return (
            <>
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.WEBSITE}> Добавление сайт</Link></button>
                    <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>

                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.WEBSITE)} >Отменить</button>
                    <button className='ServicesFrom_top-Publish'>Опубликовывать</button>
                </div>
                <h1>Loading</h1>
            </>
        )
    }
}
