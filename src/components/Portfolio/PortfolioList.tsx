import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import img from "../../assets/images/Rectangle 23390.svg"
import icons from "../../assets/images/Heart.svg"
import clcik from "../../assets/images/Groupclick.svg"
import routes from '../../shared/constants/routes'

import { deleteProtfoio, GetPortfolio } from '../../shared/api/portfolioapi'
import toast, { Toaster } from 'react-hot-toast';

export default function PortfolioList() {
    const [tr, settr] = useState<string | boolean>("")
    const navigate = useNavigate()
    const x: any = useRef()
    const link: any = useRef()
    const btns: any = useRef()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>()
    const [change, setChange] = useState<any>(true)


    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetPortfolio();
            setLoading(false)
            setData(data)
        }

        fetchWebSite()
            .then((err) => {
                console.log(err);
            })

    }, [change]);

    const handleDelete = async (id: any) => {
        setLoading(true)

        deleteProtfoio(id)
            .then((response: any) => {
                setLoading(false)
                setChange(!change)
                if (response?.status === 204) {
                    toast("deleted")

                } else {
                    toast("failed")
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
                        <li className='Filter-selects-item  itemChecked'  ><button className='navabrItembtn'> Все сайты</button></li>
                    </ul>
                    <button className='Filter-btn'>Показать</button>
                </div>
                <button className='Filter-add' onClick={() => navigate(routes.PORTFOLIOADD)}>+  Добавить сайт</button>
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
                {loading ? <h1>loading</h1> : <>
                    {data && data?.items.map((e: any) => (
                        <li className='list-item'>
                            <input type="checkbox" />
                            <div className='list-item-text  list-item-div2' ><img src={e?.avatar?.url} alt="" /></div>
                            <p className='list-item-text'>{e?.title}</p>
                            <p className='list-item-text'>{e?.creator}</p>
                            <Link ref={link} to={e?.link} className='list-item-text'>{e?.link}</Link>
                            <p className='list-item-text'>13.03.2021</p>
                            <p className='list-item-text'>{e?.likesCount}</p>

                            <img ref={btns} className='list-item-textimg' src={clcik} alt="" width={24} onClick={() => settr(state => state === e?.id ? false : e?.id)} />

                            <ul ref={x} className='list-item-drop ' style={tr == e?.id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }} >
                                <li className='list-item-drop-text'><Link to={routes.PORTFOLIOUPDATE + `/${e?.id}`}>Изменить</Link></li>
                                <li className='list-item-drop-text'>Отменить</li>
                                <li className='list-item-drop-text' onClick={() => handleDelete(e?.id)}> Удалить</li>
                            </ul>
                        </li>
                    ))}
                </>}
            </ul>
            <Toaster />
        </div>
    )
}
