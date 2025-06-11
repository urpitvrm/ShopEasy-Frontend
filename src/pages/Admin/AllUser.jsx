import Layout from "../../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";

function AllUser() {
  const [user, setUser] = useState([]);

  const alluser = async () => {
    try {
      const { data } = await axios.get(
        "https://shop-easy-backend-beta.vercel.app/api/v1/auth/get-users"
      );
      if (!data?.data) {
        console.log("No user is found");
        return;
      }
      setUser(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    alluser();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="shadow-sm sm:h-70  md:h-screen p-3 w-auto">
          <AdminMenu />
        </div>
        <div className=" p-5  overflow-x-auto max-h-190">
          <h1 className="text-2xl font-semibold mb-6 text-center">All Users</h1>
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              {user.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.phone}</td>
                  <td className="px-4 py-2">{u.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AllUser;
