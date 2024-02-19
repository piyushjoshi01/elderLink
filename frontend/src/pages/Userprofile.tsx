import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "../components/ui/Footer";

const UserProfile = ({ }) => {
    const res = {
        firstName: "Vyansi",
        lastName: "Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        birthDate: "01/01/1990",
        password: "********",
        userType: "Regular",
        creditBalance: 1000,
        address: {
            street_name: "123 Main St",
            suite_number: "Apt 101",
            city: "New York",
            state: "NY",
            country: "USA",
            pincode: "10001"
        },
        photoUrl: "src/assets/images/10.png"
    };
    // const { state } = userLocation;
    // const { res } = state;
    const handleNewRequest = () => {
        console.log("Creating new request...");
    };

    const handleSubmitRequest = () => {
        console.log("Submitting request...");
    };

   
   
    const getInitials = (firstName: string | any[], lastName: string | any[]) => {
        return `${firstName[0]}${lastName[0]}`;
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
                <div className="flex flex-grow">
                    <div className="w-1/2 bg-gray-100 p-6 mr-4">
                        <h1 className="text-3xl font-bold tracking-wider text-lime-800 mb-4">User Profile </h1>
                        
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex-shrink-0">
                                
                                <div className="w-48 h-48 flex items-center justify-center bg-gray-300 text-gray-600 text-4xl font-bold rounded-full">
                                    {getInitials(res.firstName, res.lastName)}
                                </div>
                            </div>
                            <div className="ml-6 text-right">
                                <div className="rounded-md bg-gray-200 p-2 mb-2 font-medium">
                                    <p className="text-lime-800"><strong>User Type:</strong> {}</p>
                                </div>
                                <div className="rounded-md bg-lime-800 text-white p-2 mb-4">
                                    <p className=" "><strong>Credit Balance:</strong> {res.creditBalance}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-lime-800 mb-4"><strong>First Name:</strong> {res.firstName}</p>
                            <p className="text-lime-800 mb-4"><strong>Last Name:</strong> {res.lastName}</p>
                            <p className="text-lime-800 mb-4"><strong>Email:</strong> {res.email}</p>
                            <p className="text-lime-800 mb-4"><strong>Phone:</strong> {res.phone}</p>
                            <p className="text-lime-800 mb-4"><strong>Birth Date:</strong> {res.birthDate}</p>
                            <div className="flex items-center mb-2">
                                <strong className="text-lime-800 mr-2">Address:</strong>
                                <span>{`${res.address.street_name}, ${res.address.suite_number}, ${res.address.city}, ${res.address.state}, ${res.address.country}, ${res.address.pincode}`}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 bg-gray-100 p-6 ml-4">
                        <h1 className="text-3xl font-bold tracking-wider text-lime-800 mb-4">Help Requests</h1>
                        <form className="w-full">
                            <div className="mb-4">
                                <label htmlFor="request" className="block text-lime-800 font-bold mb-2">Post Request:</label>
                                <textarea id="request" name="request" className="w-full border h-full rounded-md p-2"></textarea>
                            </div>
                            <div className="flex justify-between">
                                <button type="button" onClick={handleNewRequest} className="px-4 py-2 bg-lime-800 text-white rounded-md">New Request</button>
                                <button type="button" onClick={handleSubmitRequest} className="px-4 py-2 bg-lime-800 text-white rounded-md">Submit Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserProfile;
