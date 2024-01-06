"use client";
import Navbar from "../../components/navbar";
import Table from "../../components/table"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

const Employee = () => {
    

    return (
        <>
            <Navbar />
            <Table />
        </>
    );
};

export default Employee;
