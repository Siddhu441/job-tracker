import React from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../components/UserNavBar';

const UserDashboard = () => {
  return (
    <div>
        <UserNavbar/>
      <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
        <p className="text-lg">This is where you can manage your account, view your information, and access other features.</p>
        <div className="mt-6 space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-xl">Recent Activity</h3>
            <p className="text-sm">You haven’t made any recent updates yet. Check back later!</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-xl">Upcoming Tasks</h3>
            <ul className="list-disc pl-5 text-sm">
              <li>Review your account settings</li>
              <li>Complete your profile information</li>
              <li>Update your password</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
