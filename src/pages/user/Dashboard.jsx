import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

function Dashboard() {
  const { auth } = useAuth();

  return (
    <Layout title="User Dashboard">
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="shadow-sm p-3 w-full md:w-1/5 bg-white">
          <UserMenu />
        </div>
        <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
          <div className="border border-gray-300 rounded-xl shadow-lg p-8 w-full max-w-lg bg-white">
            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
              User Details
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <span className="font-semibold">Name:</span> {auth?.user?.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {auth?.user?.email}
              </p>
              <p>
                <span className="font-semibold">Contact:</span>{" "}
                {auth?.user?.phone}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {auth?.user?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
