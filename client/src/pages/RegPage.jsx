import { useState } from "react";
import axios from "axios";


export default function RegPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function regUser(ev) {
        ev.preventDefault();
        try {
            await axios.post("/register", {
                name,
                email,
                password
            });
            alert('Reg sucsess, Now LogIn')
        } catch (e) {
            alert("Reg Failed")
        }
        
        
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>

                <form className="max-w-md mx-auto" onSubmit={regUser}>

                    <input type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />

                    <input type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />

                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />

                    <button className="primary">Register</button>
                    <div className="text-center p-2 text-gray-500">
                        Already have an account? <a className="underline" href="/login">Login</a>
                    </div>

                </form>
            </div>

        </div>

    );
}