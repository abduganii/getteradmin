import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setCookie } from 'typescript-cookie';
import { Loginuser } from '../../shared/api/authApi';
import routes from '../../shared/constants/routes';

export default function LoginPage() {
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const navigate = useNavigate()
    const loginSubmit = async (data: any) => {
        const res = await Loginuser(data)

        if (res.status == 200) {
            setCookie("accessAdminToken", res.data.accessToken)
            setCookie("admin_id", res.data.userId)
            setCookie("refreshAdminToken", res.data.refreshToken)
            alert("login seccesfull")
            navigate(routes.HOME)
        } else {
            alert('failed')
        }
    };
    return (
        <form >
            <input type="email"
                {...register("email", {
                    required: true,
                })} />
            <input type={"password"}
                {...register("password", {
                    required: true,
                })} />
            <button onClick={handleSubmit(loginSubmit)}>login</button>
        </form>
    )
}
