import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

import { Image, FormControl, } from "@chakra-ui/react"
import map from '../../components/images/worldMap.jpg'
import '../styles/loginStyles.css'

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main className="loginPage" style={{ display: "flex", width: "100%", alignItems: "center" }}>
            <aside style={{ width: "70%", flex: "1 1 auto" }}>
                <Image className="worldMap" src={map}
                    alt="world map" style={{ width: "100%" }}
                />
            </aside>
            <div className="loginForm" style={{ marginLeft: "auto", width: "30%" }}>
                <div className="card">
                    <h4 className="card-header login-header">Login</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <FormControl>
                                <form onSubmit={handleFormSubmit}>
                                    <input
                                        className="form-input"
                                        placeholder="Your email"
                                        name="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="form-input"
                                        placeholder="******"
                                        name="password"
                                        type="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                    />
                                    <br />
                                    <button
                                        className="btn btn-block btn-info"
                                        style={{ cursor: 'pointer' }}
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </FormControl>
                        )}
                        <p><Link to="/signup"> Dont have an account, Signup now!</Link> </p>

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;