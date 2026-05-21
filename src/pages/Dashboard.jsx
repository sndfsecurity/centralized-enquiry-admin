import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [enquiries, setEnquiries] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {

        fetchEnquiries();

    }, []);

    
    const fetchEnquiries = async () => {

    try {

        const token =
            localStorage.getItem("token");

        const payload =
            JSON.parse(atob(token.split(".")[1]));

        setUsername(payload.sub);

        const response = await axios.get(
            "https://centralized-enquiry-backend-production.up.railway.app/api/enquiry/my-enquiries",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setEnquiries(response.data);

    } catch (error) {

        console.log(error);
    }
};


    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this enquiry?"
            );

        if (!confirmDelete) return;

        try {

            const token =
                localStorage.getItem("token");

            await axios.delete(
                `https://centralized-enquiry-backend-production.up.railway.app/api/enquiry/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchEnquiries();

        } catch (error) {

            console.log(error);
        }
    };


    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.reload();
    };


    return (

        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to bottom right, #eef2ff, #f8fafc)",
                fontFamily: "Arial, sans-serif",
                padding: "20px"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    background:
                        "linear-gradient(135deg, #0f172a, #1e3a8a)",

                    borderRadius: "18px",

                    padding: "25px",

                    color: "white",

                    marginBottom: "25px",

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    flexWrap: "wrap",

                    gap: "15px",

                    boxShadow:
                        "0 10px 25px rgba(0,0,0,0.12)",

                    position: "sticky",

                    top: "10px",

                    zIndex: "1000"
                }}
            >

                <div>

                    <h1
                            style={{
                                margin: 0,
                                color: "white",
                                fontSize: "42px",
                                fontWeight: "700",
                                letterSpacing: "-1px",
                                textTransform: "capitalize"
                            }}>
                            {username} Dashboard
                    </h1>

                    <p
                        style={{
                            marginTop: "8px",
                            color: "#dbeafe",
                            fontSize: "15px"
                        }}
                    >
                        Centralized Enquiry Management System
                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "15px",
                        boxShadow:
                            "0 4px 12px rgba(239,68,68,0.3)"
                    }}
                >
                    Logout
                </button>

            </div>


            {/* SMALL STATS CARDS */}

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginBottom: "25px",

                    position: "sticky",

                    top: "125px",

                    zIndex: "999"
                }}
            >

                <div style={cardStyle}>

                    <p style={cardTitle}>
                        Total Enquiries
                    </p>

                    <h2 style={cardValue}>
                        {enquiries.length}
                    </h2>

                </div>

                <div style={cardStyle}>

                    <p style={cardTitle}>
                        New Enquiries
                    </p>

                    <h2 style={cardValue}>
                        {
                            enquiries.filter(
                                enquiry =>
                                    enquiry.status === "NEW"
                            ).length
                        }
                    </h2>

                </div>

                <div style={cardStyle}>

                    <p style={cardTitle}>
                        Departments
                    </p>

                    <h2 style={cardValue}>
                        {
                            [
                                ...new Set(
                                    enquiries.map(
                                        enquiry =>
                                            enquiry.department
                                    )
                                )
                            ].length
                        }
                    </h2>

                </div>

            </div>


            {/* TABLE */}

            <div
                style={{
                    background: "white",
                    borderRadius: "18px",
                    overflowX: "auto",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.08)"
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        minWidth: "1200px"
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background:
                                    "linear-gradient(to right, #1e293b, #334155)",
                                color: "white"
                            }}
                        >

                            <th style={tableHeading}>
                                Name
                            </th>

                            <th style={tableHeading}>
                                Mobile
                            </th>

                            <th style={tableHeading}>
                                City
                            </th>

                            <th style={tableHeading}>
                                Service
                            </th>

                            <th style={tableHeading}>
                                Department
                            </th>

                            <th style={tableHeading}>
                                Date & Time
                            </th>

                            <th style={tableHeading}>
                                Status
                            </th>

                            <th style={tableHeading}>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            enquiries.map((enquiry, index) => (

                                <tr
                                    key={enquiry.id}
                                    style={{
                                        background:
                                            index % 2 === 0
                                                ? "#ffffff"
                                                : "#f8fafc"
                                    }}
                                >

                                    <td style={tableData}>
                                        {enquiry.fullName}
                                    </td>

                                    <td style={tableData}>
                                        {enquiry.mobileNumber}
                                    </td>

                                    <td style={tableData}>
                                        {enquiry.city || "-"}
                                    </td>

                                    <td style={tableData}>
                                        {enquiry.service}
                                    </td>

                                    <td style={tableData}>
                                        {enquiry.department}
                                    </td>

                                    <td style={tableData}>
                                        {
                                            new Date(
                                                enquiry.createdAt
                                            ).toLocaleString()
                                        }
                                    </td>

                                    <td style={tableData}>

                                        <span
                                            style={{
                                                background:
                                                    enquiry.status === "NEW"
                                                        ? "#dbeafe"
                                                        : "#dcfce7",

                                                color:
                                                    enquiry.status === "NEW"
                                                        ? "#1d4ed8"
                                                        : "#15803d",

                                                padding:
                                                    "7px 14px",

                                                borderRadius:
                                                    "30px",

                                                fontSize: "13px",

                                                fontWeight: "bold",

                                                display:
                                                    "inline-block"
                                            }}
                                        >
                                            {enquiry.status}
                                        </span>

                                    </td>

                                    <td style={tableData}>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    enquiry.id
                                                )
                                            }
                                            style={{
                                                background:
                                                    "#ef4444",

                                                color: "white",

                                                border: "none",

                                                padding:
                                                    "10px 16px",

                                                borderRadius:
                                                    "8px",

                                                cursor:
                                                    "pointer",

                                                fontWeight:
                                                    "bold",

                                                fontSize:
                                                    "13px"
                                            }}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}


const cardStyle = {

    background: "white",

    width: "220px",

    padding: "20px",

    borderRadius: "16px",

    boxShadow:
        "0 5px 20px rgba(0,0,0,0.08)",

    border: "1px solid #e2e8f0"
};


const cardTitle = {

    margin: 0,

    color: "#64748b",

    fontSize: "14px",

    marginBottom: "10px",

    fontWeight: "600"
};


const cardValue = {

    margin: 0,

    color: "#0f172a",

    fontSize: "34px",

    fontWeight: "bold"
};


const tableHeading = {

    padding: "18px",

    textAlign: "left",

    fontSize: "15px",

    fontWeight: "bold"
};


const tableData = {

    padding: "18px",

    fontSize: "14px",

    color: "#334155",

    borderBottom: "1px solid #e2e8f0"
};


export default Dashboard;