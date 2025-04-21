import React from "react";
import { ConfigureAccountsProvider, useConfigureAccounts } from "../../contexts/ConfigureAccountsContext.tsx";

const ConfigureAccountsForm: React.FC = () => {
    const {
        users,
        selectedUser,
        form,
        message,
        handleUserChange,
        handleInputChange,
        handleSave
      } = useConfigureAccounts();
      
    return (
        <div className = "p-6 bg-[#F7F7F2]">
            <h1 className="text-2xl font-bold mb-4">Configure Accounts</h1>
            <p className = "text-gray-600 mb-8"> Configure User Permissions</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User selection part*/}
                <div>
                    <label className="block mb-2">Select User below: </label>
                    <select className= "w-full p-2 border border-gray-300 rounded-md"
                                        onChange={handleUserChange}
                                        value={selectedUser?.ID || "Select User"}>
                        <option> Select User </option>
                        {users.map(user => (
                            <option key = {user.ID} value={user.ID}> {user.Username} </option>
                        ))}
                    </select>
                </div>
                {/* User Change form*/}
                <div>
                    {selectedUser && selectedUser.Account_type === "assistant" && (
                        <div className = "mb-4">
                            <label className = "block mb-2" > Change Account Type</label>
                            <select name="Account_type"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={form.Account_type}
                                    onChange={handleInputChange}
                                    disabled={!selectedUser}>
                                
                                <option> Account Type </option>
                                <option value="technician"> technician </option>
                            </select>
                        </div> 
                    )}
                    {selectedUser && selectedUser.Account_type === "assistant" && form.Account_type !== selectedUser.Account_type && (
                        <div className="mb-4">
                            <label className="block mb-2">Certificate ID</label>
                            <input type="text"
                                   name="Certificate_id"
                                   placeholder="Format: CERT555777"
                                   className="w-full p-2 border border-gray-300 rounded-md"
                                   value={form.Certificate_id}
                                   onChange={handleInputChange}
                            />
                        </div>
                    )}
                    
                    {/* Name*/}
                    <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className = "mb-4">
                            <label className = "block mb-2"> Update First Name </label>
                            <input type ="test"
                                    name = "First_name" 
                                    placeholder = "First Name"
                                    className ="w-full p-2 border border-gray-300 rounded-md"
                                    value = {form.First_name}
                                    onChange={handleInputChange}
                                    disabled={!selectedUser}
                                    />
                        </div>
                        <div className = "mb-4">
                            <label className = "block mb-2"> Update Last Name </label>
                                <input type ="test"
                                        name = "Last_name" 
                                        placeholder = "Last Name"
                                        className ="w-full p-2 border border-gray-300 rounded-md"
                                        value = {form.Last_name}
                                        onChange={handleInputChange}
                                        disabled={!selectedUser}
                                        />
                        </div>
                    </div>
                    {/* Email and phone number */}
                    <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className = "mb-4">
                            <label className = "block mb-2"> Update Email </label>
                            <input type ="test"
                                    name = "Email" 
                                    placeholder = "Email"
                                    className ="w-full p-2 border border-gray-300 rounded-md"
                                    value = {form.Email}
                                    onChange={handleInputChange}
                                    disabled={!selectedUser}
                                    />
                        </div>
                        <div className = "mb-4">
                            <label className = "block mb-2"> Update Phone Number </label>
                                <input type ="test"
                                        name = "Phone_number" 
                                        placeholder = "Phone number"
                                        className ="w-full p-2 border border-gray-300 rounded-md"
                                        value = {form.Phone_number}
                                        onChange={handleInputChange}
                                        disabled={!selectedUser}
                                        />
                        </div>
                    </div>

                    <div className="flex justify-center">
                    <div className = "flex justify-center">
                    <button className = "w-40  py-3 center p-3 bg-dark1 hover:bg-dark_green text-white rounded-md transition-colors"
                            onClick={handleSave}
                            disabled={!selectedUser}>
                        Save Details
                    </button>
                    </div>

                    {message && (
                        <div className={"mt-4 p-2 rounded-md bg-red-100 text-red-700"}>
                        {message}
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ConfigureAccounts() {
    return (
      <ConfigureAccountsProvider>
            <div className="min-h-screen bg-[#F7F7F2]">
                <ConfigureAccountsForm />
            </div>
          </ConfigureAccountsProvider>
    );
}
