import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [enquiries, setEnquiries] = useState([]);
    const [username, setUsername] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [departmentFilter, setDepartmentFilter] = useState("");
    const [role, setRole] = useState("");

    const [search, setSearch] = useState("");

    const [dateFilter, setDateFilter] = useState("");

    const [stats, setStats] = useState({
        totalEnquiries: 0,
        newEnquiries: 0,
        departments: 0
    });


    useEffect(() => {

    fetchEnquiries();

        }, 
        
        [ currentPage, departmentFilter, search, dateFilter]
    );

    useEffect(() => {

    fetchDashboardStats();

    }, []);


    useEffect(() => {

            const interval = setInterval(() => {

                if (!search) {

                    fetchEnquiries();

                    fetchDashboardStats();
                }

            }, 5000);

            return () => clearInterval(interval);

        }, 
        [currentPage, departmentFilter, search, dateFilter]

    );

    


// `https://centralized-enquiry-backend-production.up.railway.app/api/enquiry/${id}`

    const fetchEnquiries = async () => {

    try {

        const token =
            localStorage.getItem("token");

        const payload =
            JSON.parse(
                atob(token.split(".")[1])
            );

        setUsername(payload.sub);
        setRole(payload.role);

        const response =
            await axios.get(

            // `https://centralized-enquiry-backend-production.up.railway.app/api/enquiry/my-enquiries?page=${currentPage}&size=5&filterDepartment=${departmentFilter}&search=${search}&dateFilter=${dateFilter}`,

            `https://centralized-enquiry-backend-production.up.railway.app/api/enquiry/my-enquiries?page=${currentPage}&size=5&filterDepartment=${departmentFilter}&search=${search}&dateFilter=${dateFilter}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        setEnquiries(
            response.data.content
        );

        setTotalPages(
            response.data.totalPages
        );

    } catch (error) {


        if (error.response?.status === 401) {

           localStorage.removeItem("token");

           window.location.href = "/";

            return;
        }

        console.log(error);
    }
};
   

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
               "Are you sure you want to delete this enquiry?"
            );

        if (!confirmDelete) return;

        try {

            const token =
                localStorage.getItem("token");

            await axios.delete(

                // `http://localhost:8080/api/enquiry/${id}`,

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


    const handleStatusChange = async (id, status) => {

    try {

        const token =
            localStorage.getItem("token");

        await axios.put(

            // `http://localhost:8080/api/enquiry/${id}/status`,

        `https://centralized-enquiry-backend-production.up.railway.app/api/enquiry/${id}/status`,

            {
                status: status
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchEnquiries();

    } catch (error) {

        alert(error.response?.data || "Status update failed");

        console.log(error);
    }
};



const fetchDashboardStats = async () => {

    try {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.get(

                // "http://localhost:8080/api/enquiry/dashboard-stats",

          "https://centralized-enquiry-backend-production.up.railway.app/api/enquiry/dashboard-stats",

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        setStats(response.data);

    } catch (error) {

        console.log(error);
    }
};



// export data to excel................
const handleExportExcel = async () => {

    try {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.get(

                // `http://localhost:8080/api/enquiry/export/excel?dateFilter=${dateFilter}`,

                `https://centralized-enquiry-backend-production.up.railway.app/api/enquiry/export/excel?dateFilter=${dateFilter}`,

                {
                    responseType: "blob",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const url =
            window.URL.createObjectURL(
                new Blob([response.data])
            );

        const link =
            document.createElement("a");

        link.href = url;

        link.setAttribute(
            "download",
            "enquiries.xlsx"
        );

        document.body.appendChild(
            link
        );

        link.click();

        link.remove();

    } catch (error) {

        console.log(error);

        alert(
            "Excel export failed"
        );
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
            }} >

            {/* HEADER */}

            <div
                style={{
                    background:
                        "linear-gradient(135deg, #0f172a, #1e3a8a)",

                    borderRadius: "18px",

                    padding: "30px",

                    color: "white",

                    marginBottom: "25px",

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    flexWrap: "wrap",

                    gap: "15px",

                    boxShadow:
                        "0 10px 25px rgba(0,0,0,0.15)",

                    position: "sticky",

                    top: "0px",

                    zIndex: "1000",

                   
                }}>

                <div>

                    <h1
                        style={{
                            margin: 0,
                            color: "white",
                            fontSize: "42px",
                            fontWeight: "700",
                            textTransform: "capitalize",
                            letterSpacing: "1px"
                        }}>
                        {username} Dashboard
                    </h1>

                    <p
                        style={{
                            marginTop: "14px",
                            color: "#dbeafe",
                            fontSize: "20px",
                            letterSpacing: "0.5px"
                        }}>
                        Centralized Enquiry Management System
                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "14px 28px",
                        borderRadius: "12px",
                        fontWeight: "700",
                        cursor: "pointer",
                        fontSize: "18px",
                        letterSpacing: "0.5px",
                        boxShadow:
                            "0 4px 12px rgba(239,68,68,0.35)"
                    }}>
                    Logout
                </button>

            </div>


            {/* STATS CARDS */}

             <div
                style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "20px",

                    position: "sticky",

                    top: "165px",

                    zIndex: "999",

                    background:
                        "linear-gradient(to bottom right, #eef2ff, #f8fafc)",

                    paddingTop: "10px",
                    paddingBottom: "10px",
                    marginBottom: "20px"
                }}>

                <div
                    style={{
                        background: "#2563eb",
                        color: "white",

                        padding: "14px 24px",

                        borderRadius: "10px",

                        fontSize: "20px",
                        fontWeight: "600",

                        letterSpacing: "1px",

                        boxShadow: "0 4px 10px rgba(37,99,235,0.25)"
                    }}>
                    Total Enquiries :
                            <span
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "800",
                                    marginLeft: "8px"
                                }}>
                                {stats.totalEnquiries}
                            </span>
                        </div>



                    <div
                        style={{
                            background: "#f97316",
                            color: "white",

                            padding: "14px 24px",

                            borderRadius: "10px",

                            fontSize: "20px",
                            fontWeight: "600",

                            letterSpacing: "1px",

                            boxShadow: "0 4px 10px rgba(249,115,22,0.25)"
                        }}>

                        New Enquiries :
                        <span
                            style={{
                                fontSize: "24px",
                                fontWeight: "800",
                                marginLeft: "8px"
                            }}>
                            
                            {stats.newEnquiries}
                        </span>
                    </div>



                    <div
                        style={{
                            background: "#10b981",
                            color: "white",

                            padding: "14px 24px",

                            borderRadius: "10px",

                            fontSize: "20px",
                            fontWeight: "600",
                            letterSpacing: "1px",

                            boxShadow: "0 4px 10px rgba(16,185,129,0.25)"
                        }}>
                        Departments :
                        <span
                            style={{
                                fontSize: "24px",
                                fontWeight: "800",
                                marginLeft: "8px"
                            }}>
                           {stats.departments}
                        </span>
                    </div>

           </div>


{/* DEPARTMENT FILTER.......................... */}

<div
    style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
    }}>

    {role === "SUPER_ADMIN" && (

        <select
            value={departmentFilter}
            onChange={(e) => {

                setCurrentPage(0);

                setDepartmentFilter(
                    e.target.value
                );
            }}
            style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                fontWeight: "600",
                minWidth: "100px",
                background: "#ffffff",
                cursor: "pointer",
                boxShadow:
                 "0 2px 8px rgba(0,0,0,0.08)",
                letterSpacing: "1px",
                transition: "all 0.2s ease"
          }}>

            <option value="">
                All Departments
            </option>

            <option value="detectiveinvestigation.in">
                Investigation
            </option>

            <option value="sndfpunesecurity.in">
                Sndf Guard
            </option>

            <option value="mumbai.detectiveinvestigation.in">
                Mumbai Detective
            </option>

            <option value="TRAINING">
                Training
            </option>

        </select>

    )}

    {role !== "SUPER_ADMIN" && <div></div>}

    <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
        }}>

        <input
            type="text"
            placeholder="Search by Name / Mobile"
            value={search}
            onChange={(e) => {

                setSearch(e.target.value);

                setCurrentPage(0);

            }}
            style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                width: "190px",
                fontSize: "14px",
                fontWeight: "500",
                background: "#ffffff",
                boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)",
                outline: "none",
                letterSpacing: "1px",
                 marginRight: "10px"
            }}/>

        <select
            value={dateFilter}
            onChange={(e) => {

                setDateFilter(e.target.value);

                setCurrentPage(0);

            }}
            style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                width: "135px",
                fontSize: "14px",
                background: "#ffffff",
                boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)",
                cursor: "pointer",
                letterSpacing: "1px",
                marginRight: "10px"
            }}>

            <option value="">
                All Dates
            </option>

            <option value="TODAY">
                Today
            </option>

            <option value="LAST_7_DAYS">
                Last 7 Days
            </option>

            <option value="LAST_30_DAYS">
                Last 30 Days
            </option>

        </select>

        <button
            onClick={handleExportExcel}
            style={{
                background: "#10b981",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "17px",
                letterSpacing: "1px",
                marginRight: "15px",
                boxShadow:
                    "0 2px 8px rgba(16,185,129,0.25)"
            }}>
            Export Excel
        </button>

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
                }} >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        minWidth: "1200px"
                    }}>

                    <thead>

                        <tr
                            style={{
                                background:
                                    "linear-gradient(to right, #1e293b, #334155)",
                                color: "white"
                            }}>

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
                                                : "#f8fafc",

                                        transition: "0.3s ease"
                                    }}

                                    onMouseEnter={(e) =>
                                        e.currentTarget.style.background =
                                        "#eef4ff"
                                    }

                                    onMouseLeave={(e) =>
                                        e.currentTarget.style.background =
                                        index % 2 === 0
                                            ? "#ffffff"
                                            : "#f8fafc"
                                    }
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

                                    
                                  {/* stautss........................ */}
                                
                        <td style={tableData}>

                            {
                                enquiry.status === "COMPLETED" ? (

                                    <select
                                        disabled
                                        value={enquiry.status}
                                        style={{
                                            padding: "10px",
                                            borderRadius: "8px",
                                            background: "#dcfce7",
                                            color: "#15803d",
                                            fontWeight: "700",
                                            border: "none"
                                        }}>
                                        <option>
                                            COMPLETED
                                        </option>
                                    </select>

                                ) : (

                                    <select
                                        value={enquiry.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                enquiry.id,
                                                e.target.value
                                            )
                                        }

                                    style={{
                                    padding: "10px",
                                    borderRadius: "8px",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    border: "none",
                                    textAlign: "center",
                                    textAlignLast: "center",

                            background:
                                enquiry.status === "NEW"
                                    ? "#dbeafe"
                                    : "#fef3c7",

                            color:
                                enquiry.status === "NEW"
                                    ? "#1d4ed8"
                                    : "#d97706"
                        }}>

                {
                    enquiry.status === "NEW" && (
                        <>
                            <option value="NEW">
                                NEW
                            </option>

                            <option value="IN_PROGRESS">
                                IN_PROGRESS
                            </option>
                        </>
                    )
                }

                {
                    enquiry.status === "IN_PROGRESS" && (
                        <>
                            <option value="IN_PROGRESS">
                                IN_PROGRESS
                            </option>

                            <option value="COMPLETED">
                                COMPLETED
                            </option>
                        </>
                    )
                }

            </select>
        )
    }

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
                                                    "11px 18px",

                                                borderRadius:
                                                    "10px",

                                                cursor:
                                                    "pointer",

                                                fontWeight:
                                                    "700",

                                                fontSize:
                                                    "15px",

                                                letterSpacing:
                                                    "0.5px",

                                                transition:
                                                    "0.3s",

                                                boxShadow:
                                                    "0 4px 10px rgba(239,68,68,0.25)"
                                            }}>
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>


           

           {/* pagination..................................... */}


           <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "24px",
                    marginBottom: "24px"
                }} >

                <button
                    disabled={currentPage === 0}
                    onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                    style={{
                        padding: "10px 16px",
                        border: "none",
                        borderRadius: "10px",
                        background:
                            currentPage === 0
                                ? "#d1d5db"
                                : "#1e293b",
                        color: "#fff",
                        cursor:
                            currentPage === 0
                                ? "not-allowed"
                                : "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        letterSpacing: "0.5px",
                        transition: "0.3s"
                    }}>
                    ← Previous
                </button>

                <div
                    style={{
                        padding: "10px 18px",
                        background: "#ffffff",
                        borderRadius: "10px",
                        boxShadow:
                            "0 4px 12px rgba(0,0,0,0.08)",
                        fontWeight: "700",
                        fontSize: "15px",
                        color: "#1e293b",
                        letterSpacing: "0.8px"
                    }}>
                    Page {currentPage + 1} of {totalPages}
                </div>

                        <button
                            disabled={
                                currentPage === totalPages - 1
                            }
                            onClick={() =>
                                setCurrentPage(currentPage + 1)
                            }
                            style={{
                                padding: "10px 16px",
                                border: "none",
                                borderRadius: "10px",
                                background:
                                    currentPage === totalPages - 1
                                        ? "#d1d5db"
                                        : "#2563eb",
                                color: "#fff",
                                cursor:
                                    currentPage === totalPages - 1
                                        ? "not-allowed"
                                        : "pointer",
                                fontWeight: "600",
                                fontSize: "14px",
                                letterSpacing: "0.5px",
                                transition: "0.3s"
                            }}>
                            Next →
                        </button>

                    </div>

        </div>
    );
}


const tableHeading = {

    padding: "22px 20px",

    textAlign: "left",

    fontSize: "18px",

    fontWeight: "700",

    color: "#ffffff",

    letterSpacing: "0.5px",

    textTransform: "uppercase",

    borderBottom: "2px solid rgba(255,255,255,0.08)"
};


const tableData = {

    padding: "22px 20px",

    fontSize: "17px",

    color: "#1e293b",

    borderBottom: "1px solid #e2e8f0",

    fontWeight: "500",

    letterSpacing: "0.3px",

    lineHeight: "1.6"
};


export default Dashboard;