import { useState } from "react";
import "./Login.css";

import 'boxicons/css/boxicons.min.css';

const Login = () => {
    const [activeForm, setActiveForm] = useState("login"); // 👈 Estado para alternar formularios

    return (
        <div className="form-body">
            <div className="form-container">
                <div className="form-col">
                    {/* Botones para alternar */}
                    <div className="btn-box">
                        <button
                            className={`btn ${activeForm === "login" ? "btn-1" : ""}`}
                            onClick={() => setActiveForm("login")}
                        >
                            Ingreso
                        </button>
                        <button
                            className={`btn ${activeForm === "register" ? "btn-1" : ""}`}
                            onClick={() => setActiveForm("register")}
                        >
                            Registro
                        </button>
                    </div>

                    {/* Login Form */}
                    <form
                        className="form-box login-form"
                        style={{
                            left: activeForm === "login" ? "50%" : "150%",
                            opacity: activeForm === "login" ? 1 : 0,
                        }}
                    >
                        <div className="form-title">
                            <span>Ingreso</span>
                        </div>
                        <div className="form-inputs">
                            <div className="input-box">
                                <input
                                    type="text"
                                    className="inputs input-field"
                                    placeholder="Username"
                                    name="username"
                                    required
                                />

                                <box-icon
                                    type="solid"
                                    color="white"
                                    name="user"
                                    className="icon"
                                ></box-icon>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    className="inputs input-field"
                                    placeholder="Password"
                                    name="password"
                                    required
                                />
                                <box-icon
                                    type="solid"
                                    color="white"
                                    name="lock"
                                    className="icon"
                                ></box-icon>
                            </div>
                            <div className="forgot-pass">
                                <a href="#">Olvidaste tu contraseña?</a>
                            </div>
                            <div className="input-box">
                                <button type="submit" className="inputs submit-btn">
                                    <span>Ingresar</span>
                                    <box-icon
                                        type="solid"
                                        className="icon"
                                        name="right-arrow-alt"
                                    ></box-icon>
                                </button>
                            </div>
                        </div>
                        <div className="social-login">
                            <div className="social-login-box">
                                <i className="bx bxl-google social-login-icon"></i>
                            </div>
                            <div className="social-login-box">
                                <i className="bx bxl-facebook social-login-icon"></i>

                            </div>
                            <div className="social-login-box">
                                <i className="bx bxl-twitter social-login-icon"></i>
                            </div>
                            <div className="social-login-box">
                                <i className="bx bxl-tiktok social-login-icon"></i>
                            </div>
                        </div>
                    </form>

                    {/* Register Form */}
                    <form
                        className="form-box register-form"
                        style={{
                            left: activeForm === "register" ? "50%" : "-50%",
                            opacity: activeForm === "register" ? 1 : 0,
                        }}
                    >
                        <div className="form-title">
                            <span>Registro</span>
                        </div>
                        <div className="form-inputs">
                            <div className="input-box">
                                <input
                                    type="text"
                                    className="inputs input-field"
                                    placeholder="Nombre"
                                    name="name"
                                    required
                                />
                                <box-icon
                                    type="solid"
                                    color="white"
                                    name="user"
                                    className="icon"
                                ></box-icon>
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    className="inputs input-field"
                                    placeholder="Teléfono"
                                    name="phone"
                                    required
                                />
                                <box-icon
                                    type="solid"
                                    color="white"
                                    name="phone-call"
                                    className="icon"
                                ></box-icon>
                            </div>
                            <div className="input-box">
                                <input
                                    type="email"
                                    className="inputs input-field"
                                    placeholder="Correo"
                                    name="email"
                                    required
                                />
                                <box-icon
                                    type="solid"
                                    color="white"
                                    name="envelope"
                                    className="icon"
                                ></box-icon>
                            </div>
                            <div className="remenber-me">
                                <input type="checkbox" id="remenber-me-check" />
                                <label htmlFor="remenber-me-check">Recuerdame.</label>
                            </div>
                            <div className="input-box">
                                <button type="submit" className="inputs submit-btn">
                                    <span>Registrar</span>
                                    <box-icon
                                        type="solid"
                                        className="icon"
                                        name="right-arrow-alt"
                                    ></box-icon>
                                </button>
                            </div>
                        </div>
                        <div className="social-login">
                            <div className="social-login-box">
                                <i className="bx bxl-google social-login-icon"></i>
                            </div>
                            <div className="social-login-box">
                                <i className="bx bxl-facebook social-login-icon"></i>

                            </div>
                            <div className="social-login-box">
                                <i className="bx bxl-twitter social-login-icon"></i>
                            </div>
                            <div className="social-login-box">
                                <i className="bx bxl-tiktok social-login-icon"></i>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
