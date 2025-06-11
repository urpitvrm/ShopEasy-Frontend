import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = ({path="/login"}) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count, navigate,path]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Redirecting you in <span className="text-pink-600">{count}</span>{" "}
          second{count !== 1 && "s"}...
        </h1>
        <div className="w-14 h-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default Spinner;