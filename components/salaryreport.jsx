"use client";
import { useState, useEffect } from "react";
const SalaryReport = () => {
    const [reset, setReset] = useState(false);
    const [list, setList] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/salary");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.results)
            setList(data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-8">
                EMPLOYEE SALARY
            </h1>
            <div className="container mx-auto mt-8">
                <table className="min-w-full border-collapse border border-gray-800">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-2 px-4">NAME</th>
                            <th className="py-2 px-4">ATTENDANCE PERCENTAGE</th>
                            <th className="py-2 px-4">BASIC SALARY</th>
                            <th className="py-2 px-4">CALCULATED SALARY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((element, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-gray-100" : ""}
                            >
                                <td className="py-2 px-4 text-center">
                                    {element.name}
                                </td>
                                <td className="py-2 px-4 text-center">
                                    {!reset ?( element.attendence/element.totalDays * 100).toFixed(2) : 0}%
                                </td>
                                <td className="py-2 px-4 text-center">
                                    {!reset ? element.salary : 0}
                                </td>
                                <td className="py-2 px-4 text-center">
                                    {!reset ? (element.salary / element.totalDays * element.attendence).toFixed(2) : 0}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end mt-8">
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        RECALCULATE
                    </button>
                </div>
            </div>
        </>
    );
};

export default SalaryReport;
