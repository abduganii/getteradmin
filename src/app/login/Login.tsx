import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setCookie } from 'typescript-cookie';
import { Loginuser } from '../../shared/api/authApi';
import routes from '../../shared/constants/routes';
import toast, { Toaster } from 'react-hot-toast';
export default function LoginPage() {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const loginSubmit = async (data: any) => {
        const res = await Loginuser(data)
        if (res.status == 200) {
            navigate(routes.HOME)
            setCookie("accessAdminToken", res.data.accessToken)
            setCookie("admin_id", res.data.userId)
            setCookie("refreshAdminToken", res.data.refreshToken)
            toast.success("login seccesfull")
        } else {
            toast.error('password or Name is uncurrect')
        }
    };
    return (
        <div className='login'>
            <form className='login-from'>
                <p className='login-text'>Введите логин и пароль для админ-панели.</p>
                <input className='login-input' type="text" placeholder='Login'
                    {...register("email", {
                        required: true,
                    })} />
                <input className='login-input' type={"password"} placeholder='Password'
                    {...register("password", {
                        required: true,
                    })} />
                <button className='login-btn' onClick={handleSubmit(loginSubmit)}>login</button>
            </form>
            <Toaster />
        </div>
    )
}
