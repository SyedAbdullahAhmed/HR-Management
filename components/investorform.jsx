"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const InvestorForm = () => {
    const router = useRouter();
    const [updateInvestor, setUpdateInvestor] = useState(false);
    const [projectList, setInvestorList] = useState([]);
    const [formInvestorInfo, setFormInvestorInfo] = useState({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        linkedin: "",
        webiste: "",
        investement: 0,
    });

        // get id from list page
        useEffect(() => {
            const a = sessionStorage.getItem("updateInvestor");
            setUpdateInvestor(Boolean(a));
            setUpdateInvestor((updateInvestor) => {
                console.log(updateInvestor);
                console.log(!updateInvestor);
                console.log(typeof updateInvestor);
                return updateInvestor;
            });
        }, []);

        // to get list of employees on page refersh
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/projectsNames");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.results);
            setInvestorList(data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(projectList);
    }, [projectList]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInvestorInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

        // handle submit form
    const handleInvestorInfoSubmit = async (e) => {
           e.preventDefault();
           console.log(formInvestorInfo);
           console.log(typeof updateInvestor);
           if (updateInvestor === false) {
               console.log('condition false');
           }
           
           try {
           if(updateInvestor === false) {
               console.log('condidion false')
               const response = await fetch("http://localhost:8000/investor", {
                   method: "POST",
                   headers: {
                       "Content-Type": "application/json",
                   },
                   body: JSON.stringify(formInvestorInfo),
               });
               const data = await response.json();
               console.log(data.message);
                   if(data.data.affectedRows >= 1) {
                       console.log("data inserted")
                       router.push('/investor')
                   }
                   else{
                       console.log("data not inserted");
           }
          }
           else{
               const id = sessionStorage.getItem("investorId");
               console.log(id)
               console.log('condidtion rtue')
               const response = await fetch(`http://localhost:8000/investor/${id}`, {
                   method: "PUT",
                   headers: {
                       "Content-Type": "application/json",
                   },
                   body: JSON.stringify(formInvestorInfo),
               });
               const data = await response.json();
               console.log(data.message)
                   if(data.data.affectedRows >= 1) {
                       console.log("data updated")
                       sessionStorage.setItem("updateInvestor", false);
                       sessionStorage.removeItem("investorId");
                       router.push('/investor')
                   }
                   else{
                       console.log("data not updated");
                   }
           }
           } catch (error) {
               console.error("Error fetching data:", error);
           }
    };

    return (
        <div className="container mx-auto p-4">
            {updateInvestor === false ? (
                <h1 className="text-2xl font-bold mb-4 text-center">
                    CREATE PROJECT
                </h1>
            ) : (
                <h1 className="text-2xl font-bold mb-4 text-center">
                    UPDATE PROJECT
                </h1>
            )}
            <form
                onSubmit={handleInvestorInfoSubmit}
                className="max-w-md mx-auto"
            >
                <div className="mb-4">
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Investor Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="mt-1 p-2 border rounded-md w-full"
                        value={formInvestorInfo?.fullName || ""}
                        onChange={handleInputChange}
                        required={!updateInvestor}
                    />
                </div>

                <div className="flex space-x-4">
                    <div className="mb-4 flex-1">
                        <label
                            htmlFor="emailAddress"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="emailAddress"
                            name="emailAddress"
                            className="mt-1 p-2 border rounded-md w-full"
                            value={formInvestorInfo?.emailAddress || ""}
                            onChange={handleInputChange}
                            required={!updateInvestor}
                        />
                    </div>
                    <div className="mb-4 flex-1">
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            className="mt-1 p-2 border rounded-md w-full"
                            value={formInvestorInfo?.phoneNumber || ""}
                            onChange={handleInputChange}
                            required={!updateInvestor}
                        />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div className="mb-4 flex-1">
                        <label
                            htmlFor="linkedin"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Linkedin
                        </label>
                        <input
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            className="mt-1 p-2 border rounded-md w-full"
                            value={formInvestorInfo?.linkedin || ""}
                            onChange={handleInputChange}
                            required={!updateInvestor}
                        />
                    </div>
                    <div className="mb-4 flex-1">
                        <label
                            htmlFor="webiste"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Website
                        </label>
                        <input
                            type="text"
                            id="webiste"
                            name="webiste"
                            className="mt-1 p-2 border rounded-md w-full"
                            value={formInvestorInfo?.webiste || ""}
                            onChange={handleInputChange}
                            required={!updateInvestor}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="investement"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Investment Amount
                    </label>
                    <input
                        type="text"
                        id="investement"
                        name="investement"
                        className="mt-1 p-2 border rounded-md w-full"
                        value={parseInt(formInvestorInfo?.investement) || 0}
                        onChange={handleInputChange}
                        required={!updateInvestor}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="projectId"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Projects
                    </label>
                    <select
                        id="projectIds"
                        className="mt-1 p-2 border rounded-md w-full"
                        name="projectId"
                        value={formInvestorInfo.projectId}
                        onChange={handleInputChange}
                        required={!updateInvestor}
                    >    
                     <option value="">Select Project</option>
                        {projectList.map((element) => (
                            <option
                                key={element.projectId}
                                value={Number(element.projectId)}
                            >
                                {element.projectName}
                            </option>
                        ))}
                    </select>
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

export default InvestorForm;
