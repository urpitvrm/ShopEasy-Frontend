// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// import {useSearch} from "../context/search.jsx";
// import axios from "axios";
// function SearchInput() {
//   const [values, setValues] = useSearch(); 
//   const navigate = useNavigate(); 

//   const handleSubmit = async(e) => {
//     e.preventDefault(); 

//     try{
//         const {data}=await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`);
//         if(data.success){
//             setValues({...values, results:data.products});
//             navigate(`/search/${values.keyword}`);

//         }
//         else{
//             console.log("No products found!");
//         }
//     }
//     catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <form
//         className="flex items-center justify-center mt-4"
//         onSubmit={handleSubmit}
//       >
//         <input
//           type="text"
//           placeholder="Search for products..."
//           className="w-full max-w-md p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//           value={values.keyword}
//           onChange={(e) => setValues({ ...values, keyword: e.target.values })}
//         />
//         <button
//           type="submit"
//         //   disabled={!values.keyword}
//           className="ml-2 px-4 py-2 bg-pink-800 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
//         >
//           Search
//         </button>
//       </form>
//     </>
//   );
// }

// export default SearchInput;

import React from "react"; // No need for useState if useSearch provides state
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/search.jsx";
import axios from "axios";

function SearchInput() {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add this check for robustness, as discussed previously
    if (!values.keyword.trim()) {
      console.log("Search keyword cannot be empty.");
      return; // Stop execution if keyword is empty
    }

    try {
      const searchKeyword = values.keyword.trim(); // Trim before API call
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${searchKeyword}`
      );

      if (data.success) {
        setValues({ ...values, results: data.products });
        navigate(`/search/${searchKeyword}`); // Navigate with the trimmed keyword
      } else {
        console.log("No products found for the given keyword.");
        setValues({ ...values, results: [] }); // Clear results if no success
      }
    } catch (error) {
      console.error("Error while fetching products:", error); // Use console.error
      setValues({ ...values, results: [] }); // Clear results on error
    }
  };

  return (
    <>
      <form
        className="flex items-center justify-center mt-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full max-w-md p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={values.keyword}
          // FIX IS HERE: Changed e.target.values to e.target.value
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          type="submit"
          // Re-enable disabled prop for better UX, using .trim()
          disabled={!values.keyword.trim()}
          className="ml-2 px-4 py-2 bg-pink-800 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          Search
        </button>
      </form>
    </>
  );
}

export default SearchInput;