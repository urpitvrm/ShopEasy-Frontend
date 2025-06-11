import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
function Layout({ title, description, keywords, children }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Himanshu Verma" />
        <meta name="keywords" content={keywords} />
      </Helmet>

      <Header />
      <main className="min-h-[88vh] flex flex-col justify-between">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// ✅ Move defaultProps outside the component body
Layout.defaultProps = {
  title: "Welcome to E-Commerce",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics, cheap electronics",
};

export default Layout;
