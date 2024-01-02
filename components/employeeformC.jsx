"use client";

import React, { useState } from "react";
import {useRouter} from 'next/navigation'

const EmployeeFormC = () => {
    const [swichForm, setSwitchForm] = useState(true);
    const router = useRouter()
    const [formPersonalInfo, setFormPersonalInfo] = useState({
        fullName: "",
        gender: "",
        dob: "",
        emailAddress: "",
        contactNumber: "",
        address: "",
    });
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

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setFormPersonalInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePersonalInfoSubmit = async(e) => {
        e.preventDefault();
        // try {
        //     const response = await fetch('http://localhost:8000/employeePerInfo', {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify(formPersonalInfo),
        //     });
      
        //     if (response.ok) {
        //       const data = await response.json();
        //       console.log('Success:', data);
              setSwitchForm(false);
        //     } else {
        //       console.error('Error:', response.statusText);
        //     }
        //   } catch (error) {
        //     console.error('Error:', error);
        //   }
        
    };



    const handleCareerInfoSubmit = async(e) => {
        e.preventDefault();
        // try {
        //     const response = await fetch('http://localhost:8000/employeeCarInfo', {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify(formCareerInfo),
        //     });
      
        //     if (response.ok) {
        //       const data = await response.json();
        //       console.log('Success:', data);
        //       router.push('/home')
        //     } else {
        //       console.error('Error:', response.statusText);
        //     }
        //   } catch (error) {
        //     console.error('Error:', error);
        //   }
        // console.log("Form data submitted:", formCareerInfo);
        try {
            // Insert into employeePersonalInfo
            const personalInfoResponse = await fetch('http://localhost:8000/employeePerInfo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formPersonalInfo),
            });
      
            if (personalInfoResponse.ok) {
              // Extract empId from the response
              const data = await personalInfoResponse.json();
              console.log(data)
      
              // Insert into employeeCareerInfo using the retrieved empId
              const careerInfoResponse = await fetch('http://localhost:8000/employeeCarInfo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  empId: data.data,
                  position: formCareerInfo.position,
                  salary: formCareerInfo.salary,
                  hiringDate: formCareerInfo.hiringDate,
                  experience: formCareerInfo.experience,
                  domain: formCareerInfo.domain,
                }),
              });
      
              if (careerInfoResponse.ok) {
                console.log('Data inserted successfully');
                router.push('/home')
              } else {
                console.error('Error inserting into employeeCareerInfo:', careerInfoResponse.statusText);
              }
            } else {
              console.error('Error inserting into employeePersonalInfo:', personalInfoResponse.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        
    };

    return (
        <>
            {swichForm ? (
                <form
                    className="max-w-md mx-auto mt-6"
                    onSubmit={handlePersonalInfoSubmit}
                >
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
                            required
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
                            required
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
                            required
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
                                required
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
                                required
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
                            required
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
                </form>
            ) : (
                <form
                    className="max-w-md mx-auto mt-8"
                    onSubmit={handleCareerInfoSubmit}
                >
                    <div className="text-3xl font-bold mb-4 text-center">
                        CAREER INFO
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="domain"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Domain
                        </label>
                        <select
                            id="domain"
                            name="domain"
                            value={formCareerInfo?.domain || ""}
                            onChange={handleCareerInfoChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select a domain</option>
                            <option value="Frontend Web Development">Frontend Web Development</option>
                            <option value="Backend Web Development">
                                Backend Web Development
                            </option>
                            <option value="Full Stack Web Development">
                                Full Stack Web Development
                            </option>
                            <option value="Quality Assurance Engineer">
                                Quality Assurance Engineer
                            </option>
                            <option value="HUI/UX Designers">UI/UX Designers</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="position"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Position
                        </label>
                        <select
                            id="position"
                            name="position"
                            value={formCareerInfo?.position || ""}
                            onChange={handleCareerInfoChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select a position</option>
                            <option value="Jr Front-end Developer">
                                Jr Front-end Developer
                            </option>
                            <option value="Senior Front-end Developer">
                                Senior Front-end Developer
                            </option>
                            <option value="Jr Back-end Developer">
                                Jr Back-end Developer
                            </option>
                            <option value="Senior Back-end Developer">
                                Senior Back-end Developer
                            </option>
                            <option value="Jr Full Stack Developer">
                                Jr Full Stack Developer
                            </option>
                            <option value="Senior Full Stack Developer">
                                Senior Full Stack Developer
                            </option>
                            <option value="Jr UI/UX Designer">
                                Jr Q/A Tester
                            </option>
                            <option value="Senior UI/UX Designer">
                                Senior Q/A Tester
                            </option>
                        </select>
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
                            required
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
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="experience"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Experience (Years)
                        </label>
                        <select
                            id="experience"
                            name="experience"
                            value={formCareerInfo?.experience || ""}
                            onChange={handleCareerInfoChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select experience level</option>
                            <option value="0 year">0 years</option>
                            <option value="1 year">1 year</option>
                            <option value="2 year">2 years</option>
                            <option value="3 year">3 years</option>
                            <option value="4 year">4 years</option>
                            <option value="5 year">5 years</option>
                            <option value="6 year">6 years</option>
                            <option value="7 year">7 years</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default EmployeeFormC;
