import React, { useState, useEffect } from "react";

import axios from 'axios';

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            username: username,
            password: password,
        }


        axios.post('http://localhost:5000/users/login', user)
            .then((res) => {
                if (res.data.isLoggedIn) {
                    console.log("Successful Login")
                    window.location = '/homepage'
                } else {
                    console.log("Try again")
                    window.location = '/login'
                }
            })

    }
    return (
        <div className="container" style={{ marginTop: "5%", width: "50%", backgroundColor: 'violet' }}>
            <form onSubmit={handleSubmit} className="p-3 mb-2 bg-gradient-light text-dark">
                <h4>Sign-In</h4>
                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        required
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username" />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="password"
                        required
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password" />
                </div>
                <div className="form-group">
                    <button className="btn btn-secondary" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}