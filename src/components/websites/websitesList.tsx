import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import img from "../../assets/images/Rectanglegrue.svg";
import icons from "../../assets/images/Heart.svg"
import clcik from "../../assets/images/Groupclick.svg"
import routes from '../../shared/constants/routes'
import { deleteWebsite, GetWebSite, IscheckedWebSite } from '../../shared/api/websiteapi'
import { NavLink } from 'react-router-dom';


export default function WebsitesList() {
    const [tr, settr] = useState<string | boolean>("")
    const navigate = useNavigate()
    const x: any = useRef()
    const all: any = useRef()
    const trues: any = useRef()
    const falses: any = useRef()
    const link: any = useRef()
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWebSite = async (isActive: any) => {
            const data = await GetWebSite(isActive);
            setData(data)
            setLoading(false)
        }

        fetchWebSite('')
            .then((err) => {
                console.log("err");
            })

    }, []);
    const fetchWebSite = async (isActive: any) => {
        setLoading(true)
        const data = await GetWebSite(isActive);
        setData(data)
        setLoading(false)
    }


    const handleDelete = (id: any) => {
        setLoading(true)
        deleteWebsite(id)
            .then((response: any) => {
                setLoading(false)
                if (response?.status === 204) {
                    alert("deleted")
                }

            })
            .catch(error => {
                alert(error.message)
                setLoading(false)
            })


    }
    const handleIschecked = (id: any, isActive: boolean) => {

        setLoading(true)

        IscheckedWebSite(id, { isActive: isActive })
            .then((response: any) => {
                setLoading(false)
                if (response?.status === 204) {
                    alert("deleted")
                }

            })
            .catch(error => {
                alert(error.message)
                setLoading(false)
            })
    }



    return (
        <div>
            <div className='Filter'>
                <div className='Filter-from'>
                    <button className='Filter-btn'>Фильтр</button>
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
                    <button className='Filter-btn'>Показать</button>
                </div>
                <button className='Filter-add' onClick={() => navigate(routes.WEBSITEADD)}>+  Добавить сайт</button>
            </div>
            <ul className="list">
                <li className='list-itemtop '>
                    <input type="checkbox" />
                    <p className='list-itemtop-text'>Screenshots</p>
                    <p className='list-itemtop-text'>Site name</p>
                    <p className='list-itemtop-text'>LLC name</p>
                    <p className='list-itemtop-text'>Site link </p>
                    <p className='list-itemtop-text'>Data</p>
                    <img className='list-itemtop-text list-itemtop-textimg' src={icons} alt="" />
                    <p className='list-itemtop-text'>Action</p>

                </li>
                {loading ? <h1> loading.....</h1> : <>
                    {data && data?.items?.map((e: any) => (

                        <li className='list-item'>
                            <input type="checkbox" />

                            <div className='list-item-text  list-item-div2'><img src={e?.avatar?.url || img} alt="" /></div>
                            <p className='list-item-text'>{e?.title}</p>
                            <p className='list-item-text'>{e?.creator}</p>
                            <Link ref={link} to={e?.link} className='list-item-text'>{e?.link}</Link>
                            <p className='list-item-text'>13.03.2021</p>
                            <p className='list-item-text'>{e?.likesCount}</p>
                            {e?.isActive ? <p className='list-item-text ' onClick={() => handleIschecked(e?.id, false)} > подтвержденный </p> :
                                <p className='list-item-text accesed' onClick={() => handleIschecked(e?.id, true)}> подтверждать </p>}
                            <img className='list-item-textimg' src={clcik} alt="" width={4} onClick={() => settr(state => state === e.id ? false : e.id)} />

                            <ul ref={x} className='list-item-drop ' style={tr == e?.id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }} >
                                <li className='list-item-drop-text'><Link to={routes.WEBSITEUPDATE + `/${e?.id}`}>Изменить</Link></li>
                                {e?.isActive ? <li className='list-item-drop-text'>Отменить</li> : <li className='list-item-drop-text'>подтверждать</li>}
                                <li className='list-item-drop-text' onClick={() => handleDelete(e?.id)}>Удалить</li>
                            </ul>
                        </li>
                    ))}
                </>}
            </ul>
        </div >
    )
}
