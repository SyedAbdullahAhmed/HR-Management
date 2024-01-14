"use client";
import {useRouter} from 'next/navigation'
import { useState, useEffect } from "react";
const InestorList = () => {
    const router = useRouter()
    const [investor, setInvestor] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/investorsPro");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.results);
            setInvestor(data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(investor);
    }, [investor]);

    const handleDelete = async(investorId) => {
        console.log(investorId)
        try {
            const response = await fetch(
                `http://localhost:8000/investor/${investorId}`,
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
            setInvestor((prevData) =>
                prevData.filter((element) => element.investorId !== investorId)
            );

            console.log("Project deleted successfully.");
        } catch (error) {
            console.error("Error deleting Project:", error);
        }
    }
    const handleUpdate = (investorId) => {
        sessionStorage.setItem("investorId", investorId);
        sessionStorage.setItem("updateInvestor", true);
        router.push('/investorform')
    }


    return (
        <table className="min-w-full bg-white border border-black-300 shadow-md ">
            <thead>
                <tr className="bg-gray-800 text-white">
                    
                        <>
                            <th className="py-2 px-3 text-sm">NAME</th>
                            <th className="py-2 px-3 text-sm">PROJECT</th>
                            <th className="py-2 px-3 text-sm">INVESTEMENT</th>
                            <th className="py-2 px-3 text-sm">
                               EMAIL
                            </th>
                            <th className="py-2 px-3 text-sm">
                                PHONE
                            </th>
                            <th className="py-2 px-3 text-sm">LINKEDIN</th>
                            <th className="py-2 px-3 text-sm">WEBSITES</th>
                            <th 
                            onClick={()=>{ sessionStorage.setItem("updateInvestor", false);router.push('/investorform')}}
                            className="py-2 px-3 text-sm cursor-pointer">+NEW INVESTOR</th>
                        </>
                </tr>
            </thead>
            <tbody>
                {investor.map((element,index) => (
                    <tr key={element.investorId} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                       
                            <>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.fullName}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.projectName}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.investement}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.emailAddress}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.phoneNumber}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.linkedin}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.webiste}
                                </td>
                                <td className="py-2 px-3 text-center">
                                    <button 
                                    onClick={()=>handleUpdate(element.investorId)}
                                    className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 mr-2 rounded-2xl transition duration-300 transform hover:scale-105">
                                        UPDATE
                                    </button>
                                    <button 
                                    onClick={()=>handleDelete(element.investorId)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-2xl transition duration-300 transform hover:scale-105">
                                        DELETE
                                    </button>
                                </td>
                            </>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InestorList;
