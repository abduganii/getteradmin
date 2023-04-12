import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import eye from "../../assets/images/Iconseye.svg"
import img from "../../assets/images/Rectangle 23390.svg"
import icons from "../../assets/images/Vector3.svg"
import clcik from "../../assets/images/Groupclick.svg"
import routes from '../../shared/constants/routes'

import { deletePosition, GetPosition } from '../../shared/api/position'



export default function Positionlist() {
    const navigate = useNavigate()
    const x: any = useRef()
    const [categories, setCategories] = useState<any>('')
    const [loading, setLoading] = useState(true)
    const [tr, settr] = useState<string | boolean>("")
    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetPosition();
            setCategories(data?.items)
            setLoading(false)
        }

        fetchWebSite()
            .then((err) => {
                console.log("err");
            })

    }, []);

    const handleDelete = (id: any) => {
        setLoading(true)
        deletePosition(id)
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
                        <li className='Filter-selects-item' ><button className='navabrItembtn'> По умолчанию</button></li>
                    </ul>
                    <button className='Filter-btn'>Показать</button>
                </div>
                <button className='Filter-add' onClick={() => navigate(routes.ADDPOSITION)}>+ Добавить товар</button>
            </div>
            <ul className="list">
                <li className='list-itemtop'>
                    <input type="checkbox" />
                    <p className='list-itemtop-text'>ID</p>
                    <p className='list-itemtop-textcate'>Title</p>
                </li>
                {loading ? <h1>loading</h1> : <>
                    {categories && categories?.map((e: any, i: any) => (
                        <li className='list-item'>
                            <input type="checkbox" />
                            <p className='list-item-text'>ID:{i + 1} </p>
                            <p className='list-item-textcate'>{e?.title}</p>
                            <img className='list-item-textimg' src={clcik} alt="" width={4} onClick={() => settr(state => state === e?.id ? false : e?.id)} />

                            <ul ref={x} className='list-item-drop ' style={tr == e?.id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }} >
                                <li className='list-item-drop-text'><Link to={routes.UPDATEPOSITION + `/${e?.id}`}>Изменить</Link></li>
                                <li className='list-item-drop-text' onClick={() => handleDelete(e?.id)}>Удалить</li>
                            </ul>
                        </li>
                    ))}
                </>
                }
            </ul>
        </div >
    )
}
