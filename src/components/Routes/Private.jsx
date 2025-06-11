import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const { auth } = useAuth();
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          "https://shop-easy-backend-beta.vercel.app/api/v1/auth/user-auth"
        );
        if (res.data?.ok) {
          setOk(true);
        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };
    if (auth?.token) {
      authCheck();
    } else {
      navigate("/login");
    }
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : <Spinner path="/login" />;
}
