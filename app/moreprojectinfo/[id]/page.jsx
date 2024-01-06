"use client";
import { useState, useEffect } from "react";

const MoreProjectInfo = ({ params }) => {
    const [projectMoreInfo, setProjectMoreInfo] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/projects/${params.id}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.results);
            setProjectMoreInfo(data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(projectMoreInfo);
    }, [projectMoreInfo]);

    return (
        <>
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-8 text-center">
                    PROJECT INFORMATION
                </h1>
                <div className="grid grid-cols-2 gap-8">
                    {projectMoreInfo.length > 0 ? (
                        <>
                            <div className="border p-6 rounded-lg shadow-lg bg-white">
                                <h2 className="text-2xl font-bold mb-2 text-gray-700 text-center">
                                    {projectMoreInfo[0].tlFullName}
                                </h2>
                                <p className="text-gray-700 text-center">
                                    {projectMoreInfo[0].tlPosition}
                                </p>
                                <p className="text-gray-600 text-center">
                                    Team Leader
                                </p>
                            </div>
                            <div className="border p-6 rounded-lg shadow-lg bg-white">
                                <h2 className="text-2xl font-bold mb-2 text-gray-700 text-center">
                                    {projectMoreInfo[0].member1FullName}
                                </h2>
                                <p className="text-gray-700 text-center">
                                    {projectMoreInfo[0].member1Position}
                                </p>
                                <p className="text-gray-600 text-center">
                                    Team Member
                                </p>
                            </div>
                            <div className="border p-6 rounded-lg shadow-lg bg-white">
                                <h2 className="text-2xl font-bold mb-2 text-gray-700 text-center">
                                    {projectMoreInfo[0].member2FullName}
                                </h2>
                                <p className="text-gray-700 text-center">
                                    {projectMoreInfo[0].member2Position}
                                </p>
                                <p className="text-gray-600 text-center">
                                    Team Member
                                </p>
                            </div>
                            <div className="border p-6 rounded-lg shadow-lg bg-white">
                                <h2 className="text-2xl font-bold mb-2 text-gray-700 text-center">
                                    {projectMoreInfo[0].member3FullName}
                                </h2>
                                <p className="text-gray-700 text-center">
                                    {projectMoreInfo[0].member3Position}
                                </p>
                                <p className="text-gray-600 text-center">
                                    Team Member
                                </p>
                            </div>
                        </>
                    ) : (
                         <div ></div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MoreProjectInfo;
