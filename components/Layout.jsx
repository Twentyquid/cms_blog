import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <div className="bg-green-100">
        <Header />
        {children}
      </div>
    </>
  );
}

export default Layout;
