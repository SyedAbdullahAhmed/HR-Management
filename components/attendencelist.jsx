"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AttendenceList = () => {
  const router = useRouter()
    const [employeeList, setEmployeeList] = useState([]);
    const [date, setDate] = useState();
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/employeeNames");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.results);
            setEmployeeList(data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(employeeList);
    }, [employeeList]);

    const [attendanceList, setAttendanceList] = useState([]);

    const handleAttendanceChange = (index, status, empId) => {
        setAttendanceList((prevList) => {
            const newList = [...prevList];
            console.log();
            newList[index] = { empId, status };
            return newList;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(attendanceList);
        try {
            const response = await fetch(
                `http://localhost:8000/attendence/${date}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(attendanceList),
                }
            );

            const data = await response.json();
            console.log(data.message);
            if (data.data.affectedRows >= 1) {
                console.log("data inserted");
                router.push('/attendencereport')
            } else {
                console.log("data not inserted");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            
            <div className="container mx-auto mt-8">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Attendance Table
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date:
                        </label>
                        <input
                            type="date"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">
                                    Name
                                </th>
                                <th className="border border-gray-300 p-2">
                                    Attendance
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeList.map((name, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {name.fullName}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <label className="mr-2">
                                            <input
                                                className="mx-8 cursor-pointer"
                                                type="radio"
                                                name={`attendance-${index}`}
                                                value="present"
                                                onChange={() =>
                                                    handleAttendanceChange(
                                                        index,
                                                        "Present",
                                                        name.empId
                                                    )
                                                }
                                                required
                                            />
                                            Employee is Present
                                        </label>
                                        <label>
                                            <input
                                                className="mx-8 cursor-pointer"
                                                type="radio"
                                                name={`attendance-${index}`}
                                                value="absent"
                                                onChange={() =>
                                                    handleAttendanceChange(
                                                        index,
                                                        "Absent",
                                                        name.empId
                                                    )
                                                }
                                                required
                                            />
                                            Employee is Absent
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-8 flex justify-end items-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
export default AttendenceList;
