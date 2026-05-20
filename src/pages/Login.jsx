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

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            window.location.reload();

            alert("Login Successful");

        } catch (error) {

            alert("Invalid Credentials");
        }
    };


 

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f1f5f9"
            }}
        >

            <div
                style={{
                    width: "350px",
                    background: "white",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                }}
            >

                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "20px"
                    }}
                >
                    Admin Login
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px"
                    }}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "#1677ff",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;