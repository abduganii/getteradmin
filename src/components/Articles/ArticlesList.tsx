import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import img from "../../assets/images/Rectangle 23390.svg"
import icons from "../../assets/images/Heart.svg"
import clcik from "../../assets/images/Groupclick.svg"
import routes from '../../shared/constants/routes'
import { deleteArticles, GetArticles, IscheckedArticles } from '../../shared/api/articles'
import { getCookie } from 'typescript-cookie'
import toast, { Toaster } from 'react-hot-toast'

export default function ArticlesList() {
    const [tr, settr] = useState<string | boolean>("")
    const navigate = useNavigate()
    const x: any = useRef()
    const all: any = useRef()
    const trues: any = useRef()
    const falses: any = useRef()
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(true)
    const [change, setChange] = useState(true)
    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetArticles('');
            setData(data)
            setLoading(false)
        }

        fetchWebSite()
            .then((err) => {
                console.log("err");
            })

    }, []);
    const fetchWebSite = async (isActive: any) => {
        setLoading(true)
        const data = await GetArticles(isActive)
        setData(data)
        setLoading(false)
    }
    const handleDelete = (id: any) => {
        setLoading(true)
        deleteArticles(id)
            .then((response: any) => {
                setLoading(false)
                setChange(!change)
                if (response?.status === 204) {
                    toast("deleted")
                }
            })
            .catch(error => {
                toast(error.message)
                setLoading(false)
            })
    }
    const handleIschecked = (id: any, isActive: boolean) => {

        setLoading(true)

        IscheckedArticles(id, { isActive: isActive })
            .then((response: any) => {
                setLoading(false)
                if (response?.status === 204) {
                    toast("deleted")
                }

            })
            .catch(error => {
                toast(error.message)
                setLoading(false)
            })
    }

    return (
        <div>
            <div className='Filter'>
                <div className='Filter-from'>
                    <button className='Filter-btn'>Фильтр</button>
                    <ul className='Filter-selects'>
                        <ul className='Filter-selects'>
                            <li className='Filter-selects-item itemChecked' ref={all} ><button className='navabrItembtn' onClick={(e: any) => {
                                fetchWebSite("")
                                all.current.classList.add("itemChecked")
                                trues.current.classList.remove("itemChecked")
                                falses.current.classList.remove("itemChecked")

                            }}> Все сайты</button ></li>
                            <li className='Filter-selects-item' ref={trues} ><button className='navabrItembtn' onClick={(e: any) => {
                                fetchWebSite(true)
                                all.current.classList.remove("itemChecked")
                                trues.current.classList.add("itemChecked")
                                falses.current.classList.remove("itemChecked")
                            }}> Подтвержденный</button ></li>
                            <li className='Filter-selects-item' ref={falses} >
                                <button className='navabrItembtn' onClick={(e: any) => {
                                    fetchWebSite(false)
                                    all.current.classList.remove("itemChecked")
                                    trues.current.classList.remove("itemChecked")
                                    falses.current.classList.add("itemChecked")
                                }}> Неподтвержденный</button></li>

                        </ul>

                    </ul>
                    <button className='Filter-btn'>Показать</button>
                </div>
                <button className='Filter-add' onClick={() => navigate(routes.ARTICLESADD)}>+  Добавить </button>
            </div>
            <ul className="list">
                <li className='list-itemtop'>
                    <input type="checkbox" />
                    <p className='list-itemtop-text2'>Фото</p>
                    <p className='list-itemtop-text2'>Имя</p>
                    <p className='list-itemtop-text2'>Должность</p>
                    <p className='list-itemtop-text2'>Заголовок </p>
                    <p className='list-itemtop-text2'>Дата создание</p>
                    <img className='list-itemtop-text2 list-itemtop-textimg' src={icons} alt="" />
                    <p className='list-itemtop-text'>Action</p>

                </li>
                {loading ? <h1>loading</h1> : <>
                    {data && data?.items?.map((e: any) => (
                        <li className='list-item'>
                            <input type="checkbox" />
                            <img className='list-item-textimg3' src={e?.user?.avatar?.url || img} alt="" />
                            <p className='list-item-text2'>{e?.user?.name}</p>
                            <p className='list-item-text2'>{e?.user?.position?.title}</p>
                            <p className='list-item-text2'>{e?.title}</p>
                            <p className='list-item-text2'>13.03.2021</p>
                            <p className='list-item-text2'>{e?.likesCount}</p>
                            {e?.isActive ? <p className='list-item-text ' onClick={() => handleIschecked(e?.id, false)} > подтвержденный </p> :
                                <p className='list-item-text accesed' onClick={() => handleIschecked(e?.id, true)}> подтверждать </p>}

                            <img className='list-item-textimg' src={clcik} alt="" width={4} onClick={() => settr(state => state === e?.id ? false : e?.id)} />


                            <ul ref={x} className='list-item-drop ' style={tr == e?.id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }} >
                                {
                                    e?.user?.id == getCookie('admin_id') ? <li className='list-item-drop-text'><Link to={routes.ARTICLESUPDATE + `/${e?.id}`}>Изменить</Link></li> : ""
                                }
                                {e?.isActive ? <li className='list-item-drop-text'>Отменить</li> : <li className='list-item-drop-text'>подтверждать</li>}
                                <li className='list-item-drop-text' onClick={() => handleDelete(e?.id)}>Удалить</li>
                            </ul>
                        </li>
                    ))}
                </>}
            </ul>
            <Toaster />
        </div>
    )
}
