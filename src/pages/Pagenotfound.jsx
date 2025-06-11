import React from 'react'
import Layout from "../components/Layout/Layout";
import { Link } from 'react-router-dom';
function Pagenotfound() {
  return (
    <Layout title={"Page Not Found - E-commerce App"}>
      <div className='flex flex-col items-center justify-center h-[84vh]'>
        <h1 className='text-9xl'>404</h1>
        <h2 className='font-bold text-xl'>Oops ! Page Not Found</h2>
        <Link to="/" className='bg-blue-500 text-white px-4 py-2 rounded mt-4'>
          Go to Home
        </Link>
      </div>
    </Layout>
  );
}

export default Pagenotfound