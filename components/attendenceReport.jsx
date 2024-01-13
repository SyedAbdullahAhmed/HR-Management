"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {useRouter} from 'next/navigation'

const AttendenceList = () => {
    const router = useRouter()
    const [employeeList, setEmployeeList] = useState([]);
    const [allDates, setAllDates] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);
    const [updateAttendence, setUpdateAttendence] = useState(true);


    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/attendence");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            setAllDates([
                ...new Set(
                    data.results.map((employee) => employee.attendenceDate)
                ),
            ]);
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
        console.log(allDates);
    }, [employeeList]);


    const [selectedDate, setSelectedDate] = useState("");

    const handleDateChange = async (event) => {
        console.log(event.target.value);
        setSelectedDate(event.target.value);
        if (event.target.value === "") {
            try {
                const response = await fetch(
                    "http://localhost:8000/attendence"
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setEmployeeList(data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            try {
                const response = await fetch(
                    `http://localhost:8000/attendence/${event.target.value}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setEmployeeList(data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        
    };


    const handleAttendanceChange = (index, status, empId,attendenceDate) => {
        setAttendanceList((prevList) => {
            const newList = [...prevList];
            console.log();
            newList[index] = { empId, status,attendenceDate };
            return newList;
        });
    };

    const handleSubmit = async() => {
        console.log(attendanceList);
        const response = await fetch(
            `http://localhost:8000/attendence`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(attendanceList),
            }
        );

        const data = await response.json()
        if(data.response) {
            console.log('attendence data updated')
            setUpdateAttendence(true)
            router.refresh();
        }
        else{
            console.log('attendence data not updated')
        }
    }

    const handleBackButton = () => {
        setUpdateAttendence(true)
        setAttendanceList([])
    }

    return (
        <>
            <div className="flex justify-end p-4">
                <label className="mr-2">Select Date:</label>
                <select
                    className="px-2 py-1 border border-gray-300"
                    value={selectedDate}
                    onChange={handleDateChange}
                >
                    <option value="">All</option>
                    {allDates.map((element) => (
                        <option key={element} value={element}>
                            {element}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col items-center p-4">
                <h1 className="text-2xl font-bold mb-4">ATTENDANCE REPORT</h1>
                <div>
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className=" mx-2 border p-2 text-lg text-[1.2rem]">
                                    NAME
                                </th>
                                <th className=" mx-2 border p-2 text-lg text-[1.2rem]">
                                    DATE
                                </th>
                                <th className=" mx-2 border p-2 text-lg text-[1.2rem]">
                                    ATTENDANCE STATUS
                                </th>
                                <th className=" mx-2 border p-2 text-lg text-[1.2rem]">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeList.map((item,index) => (
                                <tr key={item.empId}>
                                    <td className="border p-2 mx-2 px-10 text-[1.1rem]">
                                        {item.fullName}
                                    </td>
                                    <td className="border p-2 mx-2 px-10 text-[1.1rem]">
                                        {item.attendenceDate}
                                    </td>
                                    <td className="border p-2 mx-2 px-10 text-[1.1rem] text-center">
                                        {item.attendenceStatus}
                                    </td>
                                    {updateAttendence ? (
                                        <td
                                            onClick={() =>
                                                setUpdateAttendence(false)
                                            }
                                            className="border p-2 mx-2 px-10 text-[1.1rem] bg-blue-500 text-white rounded-md cursor-pointer jover:bg-blue-800  transition duration-300 transform hover:scale-105"
                                        >
                                            Update
                                        </td>
                                    ) : (
                                        <td className="border border-gray-300 p-2 text-center">
                                            <label className="mr-2">
                                                <input
                                                    className="mx-2 cursor-pointer"
                                                    type="radio"
                                                    name={`attendance-${index}`}
                                                    value="present"
                                                    onChange={() =>
                                                        handleAttendanceChange(
                                                            index,
                                                            "Present",
                                                            item.empId,
                                                            item.attendenceDate
                                                        )
                                                    }
                                                    required
                                                />
                                                Present
                                            </label>
                                            <label>
                                                <input
                                                    className="mx-2 cursor-pointer"
                                                    type="radio"
                                                    name={`attendance-${index}`}
                                                    value="absent"
                                                    onChange={() =>
                                                        handleAttendanceChange(
                                                            index,
                                                            "Absent",
                                                            item.empId,
                                                            item.attendenceDate
                                                        )
                                                    }
                                                    required
                                                />
                                                Absent
                                            </label>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!updateAttendence && (
                       <div className="flex justify-end mt-8">
                       <button
                           type="button"
                           onClick={handleBackButton}
                           className="mx-2 bg-blue-500 text-white px-4 py-2 rounded"
                       >
                           Back
                       </button>
                       <button
                           type="button"
                           onClick={handleSubmit}
                           className="bg-blue-500 text-white px-4 py-2 rounded"
                       >
                           Submit
                       </button>
                   </div>
                   
                    )}
                </div>
            </div>
        </>
    );
};
export default AttendenceList;
