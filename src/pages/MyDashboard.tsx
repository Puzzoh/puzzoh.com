import React from "react";
import { MdOutlineSwipe } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";

const MyDashboard = () => {
  return (
    <div className="ml-4 mt-4 lg:ml-60">
      <div className="text-3xl leading-8 font-extrabold tracking-wide sm:text-4xl mb-4">
        My Dashboard
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
        <div className="col-span-2 card w-full h-52 bg-black shadow-xl flex items-center justify-center h-screen"></div>

        <div className="col-span-1 card w-full h-4/5 bg-base-100 shadow-xl flex items-center justify-center h-screen"></div>

        <div className="col-span-2 card w-full h-80 bg-base-100 shadow-xl flex items-center justify-center h-screen"></div>

        <div className="col-span-1 card w-full h-full bg-black shadow-xl flex items-center justify-center h-screen"></div>
      </div>
    </div>
  );
};

export default MyDashboard;
