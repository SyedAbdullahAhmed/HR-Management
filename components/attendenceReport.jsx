"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const AttendenceList = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [allDates, setAllDates] = useState([]);
    const [partialDates, setPartialDates] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/attendence");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            setEmployeeList(data.results);
            const uniqueDates = [
               ...new Set(
                   employeeList.map((employee) => employee.attendenceDate)
               ),
           ];
           setAllDates(uniqueDates);

           
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(allDates)

    useEffect(() => {
     //    if (employeeList.length > 0) {
     //        const uniqueDates = [
     //            ...new Set(
     //                employeeList.map((employee) => employee.attendenceDate)
     //            ),
     //        ];
     //        setAllDates(uniqueDates);
     //        console.log(uniqueDates);
     //    }
    }, [employeeList]);

    const [selectedDate, setSelectedDate] = useState("");

    const handleDateChange = async(event) => {
     console.log(event.target.value)
     if(event.target.value === '') {
          try {
               const response = await fetch("http://localhost:8000/attendence");
               if (!response.ok) {
                   throw new Error(`HTTP error! Status: ${response.status}`);
               }
               const data = await response.json();
               setEmployeeList(data.results);
           } catch (error) {
               console.error("Error fetching data:", error);
           }
     }
     else {
          try {
               const response = await fetch(`http://localhost:8000/attendence/${event.target.value}`);
               if (!response.ok) {
                   throw new Error(`HTTP error! Status: ${response.status}`);
               }
               const data = await response.json();
               console.log(data)
               setEmployeeList(data.results);
           } catch (error) {
               console.error("Error fetching data:", error);
           }
     }
     
    };

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
                                    ATTENDANCE STATUS
                                </th>
                                <th className=" mx-2 border p-2 text-lg text-[1.2rem]">
                                    DATE
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeList.map((item) => (
                                <tr key={item.id}>
                                    <td className="border p-2 mx-2 px-10 text-[1.1rem]">
                                        {item.fullName}
                                    </td>
                                    <td className="border p-2 mx-2 px-10 text-[1.1rem]">
                                        {item.attendenceDate}
                                    </td>
                                    <td className="border p-2 mx-2 px-10 text-[1.1rem]">
                                        {item.attendenceStatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
export default AttendenceList;
