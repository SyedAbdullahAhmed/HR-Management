"use client";
// import Navbar from "./navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
    const [employeeInfo, setEmployeeInfo] = useState([]);
    const [switchTable, setSwitchTable] = useState(true);
    const router = useRouter();

    const fetchData = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/employeeInfo"
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // console.log(data.results);
            setEmployeeInfo(data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(employeeInfo);
    }, [employeeInfo]);

    const handlePersonalInfoDelete = async (empId) => {
        try {
            const response = await fetch(
                `http://localhost:8000/employeePerInfo/${empId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setEmployeeInfo((prevData) =>
                prevData.filter((employee) => employee.empId !== empId)
            );

            console.log("Employee deleted successfully.");
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const handlePersonalInfoUpdate = (empId) => {
        sessionStorage.setItem("employeeId", empId);
        sessionStorage.setItem("update", true);
        router.push('/employeeform')
    };

    return (
        <>
            {/* <Navbar /> */}
            {switchTable ? (
                <table className="min-w-full bg-white border border-black-300 shadow-md ">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-2 px-3">Name</th>
                            <th className="py-2 px-3">Gender</th>
                            <th className="py-2 px-3">Date Of Birth</th>
                            <th className="py-2 px-3">Email</th>
                            <th className="py-2 px-3">Contact</th>
                            <th className="py-2 px-3">Address</th>
                            <th className="py-2 px-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeInfo.map((employee) => (
                            <tr key={employee.empId} className="bg-gray-100">
                                <td className="py-2 px-3 text-center text-sm">
                                    {employee.fullName}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {employee.gender}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {employee.dob}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {employee.emailAddress}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {employee.contactNumber}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {employee.address}
                                </td>
                                <td className="py-2 px-3 text-center">
                                    <button
                                        onClick={() => setSwitchTable(false)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 mr-2 rounded-2xl transition duration-300 transform hover:scale-105"
                                    >
                                        More
                                    </button>
                                    <button
                                        onClick={() =>
                                            handlePersonalInfoUpdate(employee.empId)
                                        }
                                        className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 mr-2 rounded-2xl transition duration-300 transform hover:scale-105"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() =>
                                            handlePersonalInfoDelete(
                                                employee.empId
                                            )
                                        }
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-2xl transition duration-300 transform hover:scale-105"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <table className="min-w-full bg-white border border-black-300 shadow-md ">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-2 px-3">Name</th>
                            <th className="py-2 px-3">Position</th>
                            <th className="py-2 px-3">Salary</th>
                            <th className="py-2 px-3">Experience</th>
                            <th className="py-2 px-3">Domain Experience</th>
                            <th className="py-2 px-3">Hiring Date</th>
                            <th className="py-2 px-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeInfo.map((employee) => (
                            <tr key={employee.empId} className="bg-gray-100">
                                <td className="py-2 px-3 text-center text-sm">
                                    {employee.fullName}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {employee.position}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {employee.salary}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {employee.experience}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {employee.domain}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {employee.hiringDate}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    <button
                                        onClick={() => setSwitchTable(true)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 mr-2 rounded-2xl transition duration-300 transform hover:scale-105"
                                    >
                                        Back
                                    </button>
                                    {/* <button
                                        onClick={() => handleUpdate(employee)}
                                        className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 mr-2 rounded-2xl transition duration-300 transform hover:scale-105"
                                    >
                                        Update
                                    </button> */}
                                    {/* <button
                                        onClick={() => handleCareerInfoDelete(employee.empId)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-2xl transition duration-300 transform hover:scale-105"
                                    >
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Home;
