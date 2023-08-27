import axios from "axios";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import {UserContext} from "../UserContext.jsx";





export default function LogPage() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [redirect, setredirect] = useState(false)
    const {setUser} = useContext(UserContext)
    async function logUser (ev) {
        ev.preventDefault()
        try {
            const {data} = await axios.post('./login', {email,password}, {withCredentials:true})
            setUser(data)
            console.log('login Done')
            setredirect(true)
        }catch (ev) {
            console.log('login failed');
        }
        
    }
        if(redirect) {
            return <Navigate to={'/'} />
        }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>

                <form className="max-w-md mx-auto" onSubmit={logUser}> 
                    <input type="email" placeholder="your Email" value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center p-2 text-gray-500">
                     Not have an account yet? <a className="underline" href="/register"> Register Now</a>
                    </div>
                </form>
            </div>

        </div>

    );
}