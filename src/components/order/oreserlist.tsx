import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import eye from "../../assets/images/Iconseye.svg"
import img from "../../assets/images/Rectangle 23390.svg"
import icons from "../../assets/images/Vector3.svg"
import clcik from "../../assets/images/Groupclick.svg"
import routes from '../../shared/constants/routes'
import { DeleteOrder, GetOrders } from '../../shared/api/order'
import { getCookie } from 'typescript-cookie'




export default function OrderList() {
    const [tr, settr] = useState<string | boolean>("")
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const navigate = useNavigate()
    const x: any = useRef()
    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetOrders();
            setLoading(false)
            setData(data?.items)
        }

        fetchWebSite()
            .then((err) => {
                console.log(err);
            })

    }, []);

    const handleDelete = async (id: any) => {
        setLoading(true)
        DeleteOrder(id)
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
                <div className='Filter-from  Filter-w100'>
                    <button className='Filter-btn'>Фильтр</button>
                </div>
            </div>
            <ul className="list">
                <li className='list-itemtop'>
                    <input type="checkbox" />
                    <p className='list-itemtop-text4'>name</p>
                    <p className='list-itemtop-text4'>phone</p>
                    <p className='list-itemtop-text4'>company</p>
                    <p className='list-itemtop-text4'>Дата</p>
                    <p className='list-itemtop-text4'>file</p>
                    <p className='list-itemtop-text4'>action</p>

                </li>
                {loading ? <h1>loading</h1> : <>
                    {data && data?.map((e: any) => (
                        <li className='list-item'>
                            <input type="checkbox" />
                            <p className='list-item-text4'>{e?.name}</p>
                            <p className='list-item-text4'>{e?.phone}</p>
                            <p className='list-item-text4'>{e?.company}</p>
                            <p className='list-item-text4'>{e?.date.slice(0, 10)}</p>
                            <a href={e?.avatar?.url} target="_blank" className='list-item-text4'>file</a>
                            <img className='list-item-textimg' src={clcik} alt="" width={4} onClick={() => settr(state => state === e.id ? false : e.id)} />
                            <ul ref={x} className='list-item-drop ' style={tr == e.id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }} >
                                <li className='list-item-drop-text'>Копировать</li>
                                <li className='list-item-drop-text' onClick={() => handleDelete(e?.id)}> Удалить</li>
                            </ul>
                        </li>
                    ))}
                </>}
            </ul>
        </div>
    )
}
