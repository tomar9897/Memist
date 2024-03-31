import React from 'react';

const PasswordandSecurity = () => {
  return (
    <div className="p-4 md:p-8 lg:p-16">
      <h1 className="font-bold text-xl md:text-2xl mb-4">Change Password:</h1>
      <p className="text-sm md:text-base mb-4">
        Your password must be at least 6 characters long and for more security, use symbols like @#!.
      </p>
      <div className="w-full md:w-2/3 lg:w-full mx-auto">
        <form>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:border-orange-500"
              type="password"
              placeholder="Current password"
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:border-orange-500"
              type="password"
              placeholder="New password"
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:border-orange-500"
              type="password"
              placeholder="Confirm password"
            />
          </div>
          <button
            className="w-full bg-orange-300 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
            type="submit"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordandSecurity;
