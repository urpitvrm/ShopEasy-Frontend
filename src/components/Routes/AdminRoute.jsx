

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const { auth } = useAuth();
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get(
          "https://shop-easy-backend-beta.vercel.app/api/v1/auth/admin-auth"
        );
        if (res.data.ok && auth?.user?.role === 1) {
          setOk(true);
        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };
    if (auth?.token) {
      checkAdmin();  
    }
    //  else {
    //   navigate("/login");
    // }
  }, [auth?.token, auth?.user?.role, navigate]);

  return ok ? <Outlet /> : <Spinner path="/login" />;
}
