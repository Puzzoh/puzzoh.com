import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineExtension,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
  MdOutlinePeopleAlt,
  MdOutlineDocumentScanner,
} from "react-icons/md";
import { RiCustomerServiceLine } from "react-icons/ri";
import api from "libs/api";
import { AuthContext } from "context/authContext";

const SideNavbar = () => {
  const { currentVendor } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    try {
      await api.get("/auth/logout");
      await localStorage.removeItem("vendor");
      navigate("/business/app/login");
    } catch (err: any) {
      alert(err.response.data);
    }
  };

  return (
    <div>
      <Disclosure>
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>

        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-primary border-b border-gray-100 pb-4 w-full">
              Welcome, {currentVendor.vendorName}
            </h1>
            <div className="my-4 border-b border-gray-100 pb-4">
              <Link to="/business/app">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white" />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                    My Dashboard
                  </h3>
                </div>
              </Link>

              <Link to="/business/app/vouchers">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineExtension className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Vouchers
                  </h3>
                </div>
              </Link>

              <Link to="/business/app/customers">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlinePeopleAlt className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Customers
                  </h3>
                </div>
              </Link>

              <Link to="/business/app/files">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineDocumentScanner className="text-2xl text-gray-600 group-hover:text-white" />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                    Files
                  </h3>
                </div>
              </Link>

              <Link to="/business/app/settings">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white" />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                    Settings
                  </h3>
                </div>
              </Link>
            </div>

            <div className="my-4 border-b border-gray-100 pb-4">
              <Link to="/business/app/support">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <RiCustomerServiceLine className="text-2xl text-gray-600 group-hover:text-white" />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                    Live Support
                  </h3>
                </div>
              </Link>
            </div>

            <div className="my-4" onClick={handleLogout}>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};

export default SideNavbar;
