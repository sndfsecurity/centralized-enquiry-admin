import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [enquiries, setEnquiries] = useState([]);

    useEffect(() => {

        fetchEnquiries();

    }, []);

    const fetchEnquiries = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
            "https://centralized-enquiry-backend-production.up.railway.app/api/enquiries",
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


       const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.reload();
};

    return (

        <div style={{ padding: "20px" }}>

            <h2>Dashboard</h2>

            <button
    onClick={handleLogout}
    style={{
        marginBottom: "20px",
        padding: "10px 20px",
        background: "red",
        color: "white",
        border: "none",
        cursor: "pointer"
    }}
>
    Logout
</button>

            <table
                border="1"
                cellPadding="10"
                width="100%"
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Service</th>
                        <th>Department</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        enquiries.map((enquiry) => (

                            <tr key={enquiry.id}>

                                <td>{enquiry.id}</td>

                                <td>{enquiry.fullName}</td>

                                <td>{enquiry.service}</td>

                                <td>{enquiry.department}</td>

                                <td>{enquiry.status}</td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default Dashboard;