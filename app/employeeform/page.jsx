"use client";

import React, { useState } from "react";

const EmployeeForm = () => {
     const [swichForm,setSwitchForm] = useState(true)
    const [formPersonalInfo, setFormPersonalInfo] = useState({
        fullName: "",
        gender: "",
        dob: "",
        emailAddress: "",
        contactNumber: "",
        address: "",
    });

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setFormPersonalInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePersonalInfoSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle the form submission, such as making an API call
        console.log("Form data submitted:", formPersonalInfo);
        setSwitchForm(false)
    };

    const [formCareerInfo, setFormCareerInfo] = useState({
        position: "",
        salary: "",
        hiringDate: "",
        experience: "",
        domain: "",
    });

    const handleCareerInfoChange = (e) => {
        const { name, value } = e.target;
        setFormCareerInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCareerInfoSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle the form submission, such as making an API call
        console.log("Form data submitted:", formCareerInfo);
    };

    return (
        <>
            {swichForm ? (<form className="max-w-md mx-auto mt-6" onSubmit={handlePersonalInfoSubmit}>
                <div className="text-3xl font-bold mb-2 text-center">
                    PERSONAL INFO
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formPersonalInfo?.fullName || ""}
                        onChange={handlePersonalInfoChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formPersonalInfo?.gender || ""}
                        onChange={handlePersonalInfoChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    >
                        <option value="" disabled>
                            Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="emailAddress"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email Address
                    </label>
                    <input
                        type="text"
                        id="emailAddress"
                        name="emailAddress"
                        value={formPersonalInfo?.emailAddress || ""}
                        onChange={handlePersonalInfoChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex">
                    <div className="mb-4 mr-4">
                        <label
                            htmlFor="contactNumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contact Number
                        </label>
                        <input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            value={formPersonalInfo?.contactNumber || ""}
                            onChange={handlePersonalInfoChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formPersonalInfo?.address || ""}
                            onChange={handlePersonalInfoChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formPersonalInfo?.dob || ""}
                        onChange={handlePersonalInfoChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>):
            (<form className="max-w-md mx-auto mt-8" onSubmit={handleCareerInfoSubmit}>
                <div className="text-3xl font-bold mb-4 text-center">
                    CAREER INFO
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="position"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Position
                    </label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={formCareerInfo?.position || ""}
                        onChange={handleCareerInfoChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="salary"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Salary
                    </label>
                    <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={formCareerInfo?.salary || ""}
                        onChange={handleCareerInfoChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="hiringDate"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Hiring Date
                    </label>
                    <input
                        type="date"
                        id="hiringDate"
                        name="hiringDate"
                        value={formCareerInfo?.hiringDate || ""}
                        onChange={handleCareerInfoChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Experience
                    </label>
                    <input
                        type="text"
                        id="experience"
                        name="experience"
                        value={formCareerInfo?.experience || ""}
                        onChange={handleCareerInfoChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="domain"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Domain
                    </label>
                    <input
                        type="text"
                        id="domain"
                        name="domain"
                        value={formCareerInfo?.domain || ""}
                        onChange={handleCareerInfoChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>)}
        </>
    );
};

export default EmployeeForm;
