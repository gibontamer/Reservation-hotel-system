import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Page = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Page;
