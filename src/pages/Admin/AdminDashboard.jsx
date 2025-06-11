import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

function AdminDashboard() {
  const { auth } = useAuth();

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="shadow-sm sm:h-70  md:h-screen p-3 w-auto">
          <AdminMenu />
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="border border-gray-300 rounded-md shadow-md p-6 w-full max-w-md bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Admin Details
            </h2>
            <div className="space-y-4 text-lg">
              <p>
                <span className="font-bold">Name:</span>{" "}
                <span className="font-medium">{auth?.user?.name}</span>
              </p>
              <p>
                <span className="font-bold">Email:</span>{" "}
                <span className="font-medium">{auth?.user?.email}</span>
              </p>
              <p>
                <span className="font-bold">Contact:</span>{" "}
                <span className="font-medium">{auth?.user?.phone}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
