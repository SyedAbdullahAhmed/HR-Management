"use client"
import { useState,useEffect } from "react"
const ProjectList = () => {
     const [project, setProject] = useState([])
     const fetchData = async () => {
          try {
              const response = await fetch(
                  "http://localhost:8000/projects"
              );
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
     
     return (
          <table className="min-w-full bg-white border border-black-300 shadow-md ">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-2 px-3 text-sm">Project Name</th>
                            <th className="py-2 px-3 text-sm">Project Description</th>
                            <th className="py-2 px-3 text-sm">Project Status</th>
                            <th className="py-2 px-3 text-sm">Team Leader Name</th>
                            <th className="py-2 px-3 text-sm">Team Leader Position</th>
                            <th className="py-2 px-3 text-sm">Member1 Name</th>
                            <th className="py-2 px-3 text-sm">Member1 Position</th>
                            <th className="py-2 px-3 text-sm">Member2 Name</th>
                            <th className="py-2 px-3 text-sm">Member2 Position</th>
                            <th className="py-2 px-3 text-sm">Member3 Name</th>
                            <th className="py-2 px-3 text-sm">Member3 Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {project.map((element) => (
                            <tr key={element.empId} className="bg-gray-100">
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.fullName}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.gender}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.dob}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.emailAddress}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.contactNumber}
                                </td>
                                <td className="py-2 px-3 text-center text-sm">
                                    {element.address}
                                </td>
                                <td className="py-2 px-3 text-center">
                                    <button
                                        // onClick={() =>
                                        //     handlePersonalInfoUpdate(project.empId)
                                        // }
                                        className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 mr-2 rounded-2xl transition duration-300 transform hover:scale-105"
                                    >
                                        Update
                                    </button>
                                    <button
                                        // onClick={() =>
                                        //     handlePersonalInfoDelete(
                                        //         project.empId
                                        //     )
                                        // }
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-2xl transition duration-300 transform hover:scale-105"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
  );
};


export default ProjectList