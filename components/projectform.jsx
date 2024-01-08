"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProjectForm = () => {
    const router = useRouter()
    const [sameMembers, setSameMembers] = useState(false);
    const [updateForm, setUpdateForm] = useState();
    const [employeeList, setEmployeeList] = useState([]);
    const [formProjectInfo, setFormProjectInfo] = useState({
        projectName: "",
        projectDesc: "",
        projectStatus: "",
        startDate: "",
        endDate: "",
        member1: 0,
        member2: 0,
        member3: 0,
        teamLeader: 0,
    });

    // get id from list page
    useEffect(() => {
        const a = sessionStorage.getItem("updateProject");
        setUpdateForm(a);
        setUpdateForm((updatedForm) => {
            console.log(updatedForm);
            return updatedForm;
        });
    }, []);

    // to get list of employees on page refersh    
    const fetchData = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/employeeNameAndPosition"
            );
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

    
    // handle input change
    const handleProjectInfoChange = (e) => {
        const { name, value } = e.target;
        setFormProjectInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    // handle submit form
    const handleProjectInfoSubmit = async (e) => {
        e.preventDefault();
        console.log(formProjectInfo);
        try {
        if(!updateForm) {
            const response = await fetch("http://localhost:8000/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formProjectInfo),
            });
            
            const data = await response.json();
            console.log(data.message);
            if(data.message === "Same persons are not allowed") {
                setSameMembers(true)
                setTimeout(() => {
                    setSameMembers(false)                    
                },4000);
            }
            else{
                if(data.data.affectedRows >= 1) {
                    console.log("data inserted")
                    router.push('/projectList')
                }
                else{
                    console.log("data not inserted");
                }
            }
        }
        else{
            const id = sessionStorage.getItem("projectId");
            console.log(id)
            console.log(updateForm)
            const response = await fetch(`http://localhost:8000/projects/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formProjectInfo),
            });
            
            const data = await response.json();
            console.log(data.message);
            if(data.message === "Same persons are not allowed") {
                setSameMembers(true)
                setTimeout(() => {
                    setSameMembers(false)                    
                },4000);
            }
            else{
                if(data.data.affectedRows >= 1) {
                    console.log("data updated")
                    sessionStorage.setItem("updateProject", false);
                    sessionStorage.removeItem("projectId");
                    router.push('/projectList')
                }
                else{
                    console.log("data not updated");
                }
            }
        }
        
           
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {!updateForm ? (<h1 className="text-2xl font-bold mb-4 text-center">
                CREATE PROJECT
            </h1>) : (<h1 className="text-2xl font-bold mb-4 text-center">
                UPDATE PROJECT
            </h1>)}
            <form
                onSubmit={handleProjectInfoSubmit}
                className="max-w-md mx-auto"
            >
                <div className="mb-4">
                    <label
                        htmlFor="projectName"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Project Name
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        className="mt-1 p-2 border rounded-md w-full"
                        value={formProjectInfo?.projectName || ""}
                        onChange={handleProjectInfoChange}
                        required={!updateForm}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="projectDesc"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Project Description
                    </label>
                    <textarea
                        id="projectDesc"
                        name="projectDesc"
                        className="mt-1 p-2 border rounded-md w-full"
                        value={formProjectInfo?.projectDesc || ""}
                        onChange={handleProjectInfoChange}
                        required={!updateForm}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="projectStatus"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Project Status
                    </label>
                    <select
                        id="projectStatus"
                        className="mt-1 p-2 border rounded-md w-full"
                        name="projectStatus"
                        value={formProjectInfo.projectStatus}
                        onChange={handleProjectInfoChange}
                        required={!updateForm}
                    >
                        <option value="">Select Status</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Reopened">Reopened</option>
                    </select>
                </div>

                <div className="mb-4 flex">
                    <div className="flex-1 mr-4">
                        {" "}
                        {/* flex-1 takes up remaining space */}
                        <label
                            htmlFor="startDate"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="mt-1 p-2 border rounded-md w-full"
                            value={formProjectInfo?.startDate || ""}
                            onChange={handleProjectInfoChange}
                            required={!updateForm}
                        />
                    </div>

                    <div className="flex-1">
                        <label
                            htmlFor="endDate"
                            className="block text-sm font-medium text-gray-600"
                        >
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="mt-1 p-2 border rounded-md w-full"
                            value={formProjectInfo?.endDate || ""}
                            onChange={handleProjectInfoChange}
                            required={!updateForm}
                        />
                    </div>
                </div>

                {sameMembers && <h1 class="text-red-600 text-center">SAME PERSONS ARE NOT ALLOWED</h1>}

                <div className="mb-4 flex">
                    <div className="flex-1 mr-4">
                        <label
                            htmlFor="teamLeader"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Project Leader
                        </label>
                        <select
                            id="teamLeader"
                            className="mt-1 p-2 border rounded-md w-full"
                            name="teamLeader"
                            value={formProjectInfo.teamLeader}
                            onChange={handleProjectInfoChange}
                            required
                        >
                            <option value="">Select Leader</option>
                            {employeeList.map((element) => (
                                <option
                                    key={element.empId}
                                    value={Number(element.empId)}
                                >
                                    {element.fullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label
                            htmlFor="member1"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Project Members
                        </label>
                        <select
                            id="member1"
                            className="mt-1 p-2 border rounded-md w-full"
                            name="member1"
                            value={formProjectInfo.member1}
                            onChange={handleProjectInfoChange}
                            required
                        >
                            <option value="">Select Member</option>
                            {employeeList.map((element) => (
                                <option
                                    key={element.empId}
                                    value={Number(element.empId)}
                                >
                                    {element.fullName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-4 flex">
                    <div className="flex-1 mr-4">
                        <label
                            htmlFor="member2"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Project Members
                        </label>
                        <select
                            id="member2"
                            className="mt-1 p-2 border rounded-md w-full"
                            name="member2"
                            value={formProjectInfo.member2}
                            onChange={handleProjectInfoChange}
                            required
                        >
                            <option value="">Select Member</option>
                            {employeeList.map((element) => (
                                <option
                                    key={element.empId}
                                    value={Number(element.empId)}
                                >
                                    {element.fullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label
                            htmlFor="member3"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Project Members
                        </label>
                        <select
                            id="member3"
                            className="mt-1 p-2 border rounded-md w-full"
                            name="member3"
                            value={formProjectInfo.member3}
                            onChange={handleProjectInfoChange}
                            required
                        >
                            <option value="">Select Member</option>
                            {employeeList.map((element) => (
                                <option
                                    key={element.empId}
                                    value={Number(element.empId)}
                                >
                                    {element.fullName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
