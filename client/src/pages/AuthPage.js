import React, {useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hooks'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            message(data.message)
        } catch (e) {}
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку!</h1>
                <div className="card blue">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                        <div className="input-field">
                            <input 
                            placeholder="Введите email" 
                            id="email" 
                            type="text" 
                            name="email"
                            className="yellow-input"
                            onChange={changeHandler}    
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input 
                            placeholder="Введите пароль" 
                            id="password" 
                            type="password" 
                            name="password"
                            className="yellow-input"
                            onChange={changeHandler}    
                            />
                            <label htmlFor="password">Пароль</label>
                        </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                        className="btn green darken-4 btn-mn"
                        disabled={loading}
                        >Войти</button>
                        <button 
                        className="btn purple lighten-1 black-text" 
                        onClick={registerHandler}
                        disabled={loading}
                        >Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}