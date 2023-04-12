import React, { useState } from 'react'
import img from "../../assets/images/Rectanglegrue.svg";
import imgplus from "../../assets/images/Groupd48098535.svg";
import { Link, useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { useForm } from 'react-hook-form';
import { createProtfoio } from '../../shared/api/portfolioapi';
import { removeCookie } from 'typescript-cookie';
import { createCategory } from '../../shared/api/categories';
import { createPosition } from '../../shared/api/position';


export default function PositionAdd() {
    const [loading, setloading] = useState<any>(false)
    const navgate = useNavigate()
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const HandleAddCategoriy = async (data: any) => {
        setloading(true)

        await createPosition(data)
            .then((response: any) => {

                setloading(false)
                if (response.status == 201) {
                    setloading(true)
                    alert("item creates")
                    navgate(routes.POSITION)
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

    if (loading) {
        return (
            <>
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.POSITION}> Добавление сайт</Link></button>
                    <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>

                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.POSITION)} >Отменить</button>
                    <button className='ServicesFrom_top-Publish'  >Опубликовывать</button>
                </div>
                <h1>loading</h1>
            </>
        )
    } else {
        return (
            <form className='ServicesFrom'>
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.POSITION}> Добавление сайт</Link></button>
                    <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>
                    <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.POSITION)}>Отменить</button>
                    <button className='ServicesFrom_top-Publish' onClick={handleSubmit(HandleAddCategoriy)}>Опубликовывать</button>
                </div>
                <div className="ServicesFrom_from">
                    <div className='ServicesFrom_from-mid mid2'>
                        <input className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" placeholder='CATEGORIES' {...register("title", {
                            required: true,
                        })} />

                    </div>
                </div>
            </form>
        )
    }

}
