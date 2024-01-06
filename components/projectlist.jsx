"use client";
import {useRouter} from 'next/navigation'
import { useState, useEffect } from "react";
const ProjectList = () => {
    const router = useRouter()
    const [moreInfo, setMoreInfo] = useState(true);
    const [project, setProject] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/projects");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.results);
            setProject(data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(project);
    }, [project]);

    const handleDelete = async(projectId) => {
        try {
            const response = await fetch(
                `http://localhost:8000/projects/${projectId}`,
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
            setProject((prevData) =>
                prevData.filter((element) => element.projectId !== projectId)
            );

            console.log("Project deleted successfully.");
        } catch (error) {
            console.error("Error deleting Project:", error);
        }
    }
    const handleUpdate = (projectId) => {
        sessionStorage.setItem("projectId", projectId);
        sessionStorage.setItem("updateProject", true);
        router.push('/projectform')
    }

    const handleMore = (projectId) => {
        console.log(projectId)
        router.push(`/moreprojectinfo/${projectId}`)
    }


    return (
        <table className="min-w-full bg-white border border-black-300 shadow-md ">
            <thead>
                <tr className="bg-gray-800 text-white">
                    {moreInfo ? (
                        <>
                            <th className="py-2 px-3 text-sm">Project Name</th>
                            <th className="py-2 px-3 text-sm">
                                Project Status
                            </th>
                            <th className="py-2 px-3 text-sm">
                                Project Description
                            </th>
                            <th className="py-2 px-3 text-sm">Actions</th>
                        </>
                    ) : (
                        <>
                            {/* <th className="py-2 px-3 text-sm">
                                Team Leader Name
                            </th>
                            <th className="py-2 px-3 text-sm">
                                Team Leader Position
                            </th>
                            <th className="py-2 px-3 text-sm">Member1 Name</th>
                            <th className="py-2 px-3 text-sm">
                                Member1 Position
                            </th>
                            <th className="py-2 px-3 text-sm">Member2 Name</th>
                            <th className="py-2 px-3 text-sm">
                                Member2 Position
                            </th>
                            <th className="py-2 px-3 text-sm">Member3 Name</th>
                            <th className="py-2 px-3 text-sm">
                                Member3 Position
                            </th>
                            <th className="py-2 px-3 text-sm">Actions</th> */}
                        </>
                    )}
                </tr>
            </thead>
            <tbody>
                {project.map((element) => (
                    <tr key={element.projectId} className="bg-gray-100">
                        {moreInfo ? (
                            <>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.projectName}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.projectStatus}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.projectDesc}
                                </td>
                                <td className="py-2 px-3 text-center">
                                    <button 
                                    // onClick={()=>setMoreInfo(false)}
                                    onClick={()=>handleMore(element.projectId)}
                                    className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 mr-2 rounded-2xl transition duration-300 transform hover:scale-105">
                                        More
                                    </button>
                                    <button 
                                    onClick={()=>handleUpdate(element.projectId)}
                                    className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 mr-2 rounded-2xl transition duration-300 transform hover:scale-105">
                                        Update
                                    </button>
                                    <button 
                                    onClick={()=>handleDelete(element.projectId)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-2xl transition duration-300 transform hover:scale-105">
                                        Delete
                                    </button>
                                </td>
                            </>
                        ) : (
                            <>
                                {/* <td className="py-2 px-1 text-center text-sm">
                                    {element.tlFullName}
                                </td>
                                <td className="py-2 px-1 text-center text-sm">
                                    {element.tlPosition}
                                </td>
                                <td className="py-2 px-1 text-center text-sm">
                                    {element.member1FullName}
                                </td>
                                <td className="py-2 px-1 text-center text-sm">
                                    {element.member1Position}
                                </td>
                                <td className="py-2 px-1 text-center text-sm">
                                    {element.member2FullName}
                                </td>
                                <td className="py-2 px-1 text-center text-sm">
                                    {element.member2Position}
                                </td>
                                <td className="py-2 px-1 text-center text-sm">
                                    {element.member3FullName}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.member3Position}
                                </td>
                                <td className="py-2 px-3 text-center">
                                    <button 
                                    onClick={()=>setMoreInfo(true)}
                                    className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 mr-2 rounded-2xl transition duration-300 transform hover:scale-105">
                                        Back
                                    </button>
                                </td> */}
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProjectList;
