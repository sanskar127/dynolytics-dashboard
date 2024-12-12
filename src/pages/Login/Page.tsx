import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../app/store'
import { login } from '../../features/Auth/authSlice'

const LoginPage: React.FC = () => {
    interface credInterface {
        uname: string
        passwd: string
    }

    const dispatch = useDispatch<AppDispatch>()
    const { status, error } = useSelector((state: RootState) => state.auth)

    const [credentials, setCredentials] = useState<credInterface>({
        uname: "",
        passwd: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()

        dispatch(login(credentials))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="w-full max-w-lg sm:max-w-md p-8 bg-base-100 shadow-xl rounded-lg">
                <h2 className="text-2xl  text-center text-stone-600 mb-6">Log into Your Account</h2>
                {error && <div className="mb-4 text-error text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="input input-primary flex items-center gap-2 border-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input
                            type="text"
                            className="grow"
                            onChange={handleChange}
                            value={credentials.uname}
                            name="uname"
                            placeholder="Username"
                        />
                    </label>
                    <label className="input input-primary flex items-center gap-2 border-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input
                            type="password"
                            className="grow"
                            onChange={handleChange}
                            value={credentials.passwd}
                            name="passwd"
                            placeholder='Password'
                        />
                    </label>

                    <button type="submit" className="mt-10 w-full btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
