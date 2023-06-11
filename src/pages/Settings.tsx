import React, { useContext, useState } from "react";
import { AuthContext } from "context/authContext";
import { useMutation, useQueryClient } from "react-query";
import api from "libs/api";

const Settings = () => {
  const { currentVendor } = useContext(AuthContext);

  const [currentInfo, setCurrentInfo] = useState({
    email: currentVendor.email,
    vendorName: currentVendor.vendorName,
    vendorAddress: currentVendor.vendorAddress,
    vendorType: currentVendor.vendorType,
    vendorDescription: currentVendor.vendorDescription,
    representativeName: currentVendor.representativeName,
    contactNumber: currentVendor.contactNumber,
    vendorLink: currentVendor.vendorLink,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newInfo: any) => {
      return api.put("/vendor/updateInfo", newInfo);
    },
    {
      onSuccess: () => {
        // queryClient.invalidateQueries([""])
      },
    }
  );

  const handleInfoChange = (e: React.ChangeEvent<any>) => {
    setCurrentInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitProfileImgChange = (e: React.ChangeEvent<any>) => {};

  const submitInfoChange = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    mutation.mutate(currentInfo);
  };

  const submitPasswordChange = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
  };

  console.log(currentInfo);

  return (
    <div className="ml-4 mt-4 lg:ml-60">
      <div className="flex justify-between">
        <div className="text-3xl leading-8 font-extrabold tracking-wide sm:text-4xl mb-4">
          Settings
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 border-black border w-full h-full rounded-xl shadow-lg p-8">
          <div className="flex justify-between">
            <div className="text-2xl"> Vendor Information </div>
            <div className="text-gray-500">
              {" "}
              Vendor ID:{" "}
              <span className="text-black"> {currentVendor.id} </span>{" "}
            </div>
          </div>
          <div className="divider" />
          <form className="flex flex-col space-y-4" onSubmit={submitInfoChange}>
            <div className="flex flex-row space-x-3">
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="vendorName"
                  name="vendorName"
                  value={currentInfo.vendorName}
                  onChange={handleInfoChange}
                  className="border border-solid border-black h-14 px-8 py-0 w-full text-lg rounded-full"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="type"
                  className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
                >
                  Representative Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="representativeName"
                  value={currentInfo.representativeName}
                  onChange={handleInfoChange}
                  className="border border-solid border-black h-14 px-8 py-0 w-full text-lg rounded-full"
                />
              </div>
            </div>

            <div className="flex flex-row space-x-3">
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={currentInfo.email}
                  onChange={handleInfoChange}
                  className="border border-solid border-black h-14 px-8 py-0 w-full text-lg rounded-full"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="contact"
                  className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={currentInfo.contactNumber}
                  onChange={handleInfoChange}
                  className="border border-solid border-black h-14 px-8 py-0 w-full text-lg rounded-full"
                />
              </div>
            </div>

            <div className="flex flex-row space-x-3">
              <div className="mb-3">
                <label
                  htmlFor="link"
                  className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
                >
                  Vendor Link
                </label>
                <input
                  type="text"
                  name="vendorLink"
                  value={currentInfo.vendorLink}
                  onChange={handleInfoChange}
                  className="border border-solid border-black h-14 px-8 py-0 w-full text-lg rounded-full"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="type"
                  className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
                >
                  Vendor Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="vendorType"
                  value={currentInfo.vendorType}
                  onChange={handleInfoChange}
                  className="border border-solid border-black h-14 px-8 py-0 w-full text-lg rounded-full"
                />
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="name"
                className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="vendorAddress"
                value={currentInfo.vendorAddress}
                onChange={handleInfoChange}
                className="border border-solid border-black h-14 px-8 py-0 w-full text-lg rounded-full"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="description"
                className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
              >
                Description
              </label>
              <textarea
                name="vendorDescription"
                value={currentInfo.vendorDescription}
                onChange={handleInfoChange}
                className="border border-solid border-black px-8 py-4 w-full text-lg rounded-xl min-h-[10em]"
              />
            </div>

            <div className="flex inline-block self-end font-bold mt-10 gap-1">
              <button className="btn btn-md bg-white text-black hover:bg-black hover:text-white rounded-3xl px-8 uppecase text-sm">
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-md bg-black text-white hover:bg-white hover:text-black rounded-3xl px-8 uppecase text-sm"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="col-span-1 border-black border w-full rounded-xl shadow-lg p-8">
          <div className="flex justify-between">
            <div className="text-2xl"> Your password </div>
            <div className="text-gray-500"> Last updated on: </div>
          </div>
          <div className="divider" />
          <form className="w-full xl:w-24rem" onSubmit={submitPasswordChange}>
            <div className="flex flex-col gap-4">
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
                >
                  Current password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border border-solid border-black h-14 px-8 py-0 w-full text-lg rounded-full"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
                >
                  New password
                </label>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  className="border border-solid border-black h-14 px-8 py-0 w-full text-lg rounded-full"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
                >
                  Retype new password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border border-solid border-black h-14 px-8 py-0 w-full text-lg rounded-full"
                />
              </div>
              <div className="flex inline-block self-end font-bold gap-1">
                <button className="btn btn-md bg-white text-black hover:bg-black hover:text-white rounded-3xl px-8 uppecase text-sm">
                  Cancel
                </button>
                <button
                  className="btn btn-md bg-black text-white hover:bg-white hover:text-black rounded-3xl px-8 uppecase text-sm"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
