import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import eye from "../../assets/images/Iconseye.svg"
import img from "../../assets/images/Rectangle 23390.svg"
import icons from "../../assets/images/Vector3.svg"
import clcik from "../../assets/images/Groupclick.svg"
import routes from '../../shared/constants/routes'
import { DeleteUser, GetUser } from '../../shared/api/userapi'
import { getCookie } from 'typescript-cookie'

export default function Userslist() {
    const [tr, settr] = useState<string | boolean>("")
    const navigate = useNavigate()
    const x: any = useRef()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>()


    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetUser();
            setLoading(false)
            setData(data)
        }

        fetchWebSite()
            .then((err) => {
                console.log("err");
            })

    }, []);
    const handleDelete = async (id: any) => {
        setLoading(true)
        DeleteUser(id)
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
                    <p className='list-itemtop-text2'>Фото</p>
                    <p className='list-itemtop-text3'>Имя</p>
                    <p className='list-itemtop-text3'>Должность</p>
                    <p className='list-itemtop-text3'>Телефон </p>
                    <p className='list-itemtop-text3'>E-mail</p>
                    <p className='list-itemtop-text3'>Дата регистрироваться</p>
                    <p className='list-itemtop-text3'>Action</p>
                </li>
                {loading ? <h1>loading</h1> : <>
                    {data && data?.items?.map((e: any) => (
                        <li className='list-item'>
                            <input type="checkbox" />
                            <img className='list-item-textimg3' src={e?.avatar?.url} alt="" />
                            <p className='list-item-text3'>{e?.name}</p>
                            <p className='list-item-text3'>{e?.position.title}</p>
                            <p className='list-item-text3'>{e?.phone}</p>
                            <p className='list-item-text3'>{e?.email}</p>
                            <p className='list-item-text3'>13.03.2021</p>

                            <img className='list-item-textimg' src={clcik} alt="" width={4} onClick={() => settr(state => state === e.id ? false : e.id)} />

                            <ul ref={x} className='list-item-drop ' style={tr == e.id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }} >
                                <li className='list-item-drop-text'>Отменить</li>
                                {e?.id == getCookie('user_id') ? " " : <li className='list-item-drop-text' onClick={() => handleDelete(e?.id)}> Удалить</li>}
                            </ul>
                        </li>
                    ))}
                </>}
            </ul>
        </div>
    )
}
