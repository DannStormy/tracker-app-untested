import React, { useState, useEffect } from "react";
import FlashMessage from 'react-flash-message'
import axios from 'axios';


function Register() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState(0)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [validate, validatePass] = useState("")
    const [success, setSuccess] = useState(null)


    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            username: username,
            password: password
        }

        if (password !== validate) {
            setSuccess(false);
        }
        console.log(user)

        axios.post('http://localhost:5000/users/register', user)
            .then((res) => {
                console.log(res.data)
            })
        setSuccess(true)
        if (success) {
            window.location = '/login'
        }
    }


    return (
        <div className="container" style={{ marginTop: "5%", width: "50%" }}>
            {
                success ?
                    <FlashMessage duration={5000}>
                        <strong>I will disapper in 5 seconds!</strong>
                    </FlashMessage> : null
            }
            <form onSubmit={handleSubmit} className="p-3 mb-2 bg-gradient-light text-dark">
                <h4>Register</h4>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        required
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        name="lastName"
                        value={lastName}
                        required
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Age"
                        name="age"
                        value={age}
                        required
                        onChange={e => setAge(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        name="username"
                        value={username}
                        required
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Retype Password"
                        name="validation"
                        value={validate}
                        required
                        onChange={e => validatePass(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-secondary" type="submit">Register</button>
                </div>
            </form>
            <p>Already have an account? <a href="/login"><button className="btn btn-secondary" type="submit">Sign-In</button></a></p>
        </div>
    )
}


export default Register
