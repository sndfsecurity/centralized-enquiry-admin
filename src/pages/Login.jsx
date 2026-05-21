import { useState } from "react";
import axios from "axios";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await axios.post(
                "https://centralized-enquiry-backend-production.up.railway.app/api/auth/login",
                {
                    username,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Login Successful");

            window.location.reload();

        } catch (error) {

            alert("Invalid Credentials");
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(135deg, #0f172a, #1e3a8a)",
                padding: "20px",
                fontFamily: "Arial, sans-serif"
            }}
        >

            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "40px 30px",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.2)"
                }}
            >

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >

                    <h1
                        style={{
                            margin: "0",
                            fontSize: "30px",
                            color: "#0f172a",
                            fontWeight: "700",
                            letterSpacing: "1px"
                        }}
                    >
                        Admin Dashboard
                    </h1>

                    <p
                        style={{
                            marginTop: "15px",
                            color: "#842204",
                            fontSize: "18px",
                            letterSpacing: "1px"
                        }}
                    >
                        Centralized Enquiry Management
                    </p>

                </div>

                <div
                    style={{
                        marginBottom: "20px"
                    }}
                >

                    <label
                        style={{
                            display: "block",
                            marginBottom: "10px",
                            color: "#334155",
                            fontWeight: "600",
                            fontSize: "18px",
                            letterSpacing: "1px"
                        }}
                    >
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "14px",
                            borderRadius: "10px",
                            border: "1px solid #cbd5e1",
                            outline: "none",
                            fontSize: "16px",
                            letterSpacing: "1px",
                            boxSizing: "border-box"
                        }}
                    />

                </div>

                <div
                    style={{
                        marginBottom: "25px"
                    }}
                >

                    <label
                        style={{
                            display: "block",
                            marginBottom: "10px",
                            color: "#334155",
                            fontWeight: "600",
                            fontSize: "18px",
                            letterSpacing: "1px"
                        }}
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "14px",
                            borderRadius: "10px",
                            border: "1px solid #cbd5e1",
                            outline: "none",
                            fontSize: "16px",
                            letterSpacing: "1px",
                            boxSizing: "border-box"
                        }}
                    />

                </div>

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        border: "none",
                        background:
                            "linear-gradient(135deg, #2563eb, #1d4ed8)",
                        color: "#ffffff",
                        fontSize: "19px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "0.3s",
                        letterSpacing: "1px"
                    }}
                    onMouseOver={(e) =>
                        e.target.style.opacity = "0.9"
                    }
                    onMouseOut={(e) =>
                        e.target.style.opacity = "1"
                    }
                >
                    Login
                </button>

                <p
                    style={{
                        marginTop: "25px",
                        textAlign: "center",
                        color: "#28d61c",
                        fontSize: "15px",
                        letterSpacing: "1px"
                    }}
                >
                    Secure Admin Access
                </p>

            </div>

        </div>
    );
}

export default Login;