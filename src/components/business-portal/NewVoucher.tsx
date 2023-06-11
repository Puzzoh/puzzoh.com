import React, { Fragment, useState, useContext, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { AuthContext } from "context/authContext";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { VoucherTypes } from "utils/types";
import api from "libs/api";

const NewVoucher = () => {
  const { currentVendor } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newVoucher: VoucherTypes) => {
      return api.post("/voucher", newVoucher, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["vouchers"]);
      },
    }
  );

  const category = [{ name: "Meal" }, { name: "Activity" }];

  const [chosenDate, setChosenDate] = useState(new Date());

  const [selected, setSelected] = useState(category[0]);

  const [discount, setDiscount] = useState(0);
  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(discount * 100) / 100}% 100%`,
    };
  };

  const [voucherInputs, setVoucherInputs] = useState<any>({
    title: "",
    description: "",
    category: "Meal",
    priceBefore: 0,
    priceAfter: 0,
    maxRedeem: 0,
    image: [],
    expireDate: new Date(),
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setVoucherInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNumChange = (e: React.ChangeEvent<any>) => {
    setVoucherInputs((prev) => ({
      ...prev,
      [e.target.name]: Math.round(parseFloat(e.target.value) * 100) / 100,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<any>) => {
    const images = e.target.files;
    if (images.length != 0) {
      for (const single_image of images) {
        voucherInputs.image.push(single_image);
      }
    }
  };

  const createNewVoucher = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    await setVoucherInputs((voucherInputs) => {
      return {
        ...voucherInputs,
        category: selected.name,
        expireDate: chosenDate,
      };
    });
    let submitData: any = new FormData();
    submitData.append("title", voucherInputs.title);
    submitData.append("description", voucherInputs.description);
    submitData.append("category", voucherInputs.category);
    submitData.append("priceBefore", voucherInputs.priceBefore);
    submitData.append("priceAfter", voucherInputs.priceAfter);
    submitData.append("maxRedeem", voucherInputs.maxRedeem);
    submitData.append("image", voucherInputs.image[0]);
    submitData.append("image", voucherInputs.image[1]);
    submitData.append("expireDate", voucherInputs.expireDate);

    mutation.mutate(submitData);
  };

  return (
    <form
      className="flex flex-col space-y-6 border-black border-solid border-1"
      encType="multipart/form-data"
      onSubmit={createNewVoucher}
    >
      <div>
        <h2>Voucher Title*</h2>
        <input
          id="title"
          name="title"
          required
          maxLength={128}
          type="text"
          placeholder="New Voucher #1"
          className="bg-white outline-none border border-black rounded-3xl px-6 py-2 w-full"
          onChange={handleChange}
        />
      </div>

      <div>
        <h2>Description</h2>
        <textarea
          id="description"
          name="description"
          placeholder="Voucher Description (optional)"
          className="bg-white outline-none border border-black rounded-3xl px-6 py-4 min-h-[5em] w-full"
          onChange={handleChange}
        />
      </div>

      <div>
        <h2>Category*</h2>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <HiChevronUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {category.map((c, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={c}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {c.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      <div className="flex flex-row space-x-3">
        <h2>Price Before*</h2>
        <input
          id="priceBefore"
          name="priceBefore"
          required
          type="number"
          step="0.01"
          placeholder="20"
          className="bg-white outline-none border border-black rounded-3xl px-6 py-1 w-full"
          onChange={handleNumChange}
        />
        <h2>Price After*</h2>
        <input
          id="priceAfter"
          name="priceAfter"
          required
          type="number"
          step="0.01"
          placeholder="15"
          className="bg-white outline-none border border-black rounded-3xl px-6 py-1 w-full"
          onChange={handleNumChange}
        />
      </div>

      <div>
        <h2>% of discount willing to give</h2>
        <input
          type="range"
          min="0"
          max="100"
          className="range max-w-xs"
          step="5"
          value={discount}
          onChange={(e: any) => setDiscount(e.target.value)}
          style={getBackgroundSize()}
        />
        <div className="w-full flex justify-between text-xs px-1 max-w-xs">
          <span>0</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>40</span>
          <span>50</span>
          <span>60</span>
          <span>70</span>
          <span>80</span>
          <span>90</span>
          <span>100</span>
        </div>
      </div>

      <div>
        <h2>Images related to voucher (up to 3)</h2>
        <input
          type="file"
          multiple
          accept="image/*, application/pdf"
          className="file-input file-input-bordered w-full max-w-xl"
          name="image"
          onChange={handleFileChange}
        />
        <span className="text-sm italic">
          {" "}
          (Please upload in PDF or image format){" "}
        </span>
      </div>

      <div>
        <h2>Maximum number of people that redeem*</h2>
        <input
          id="maxRedeem"
          name="maxRedeem"
          required
          type="number"
          placeholder="Number"
          className="bg-white outline-none border border-black rounded-3xl px-6 py-2 w-full"
          onChange={handleNumChange}
        />
      </div>

      <div>
        <h2>Expiration Date</h2>
        <input
          type="date"
          id="start"
          name="trip-start"
          className="border-l-4 border-primary w-full p-3 rounded text-sm outline-none focus:ring-0 bg-transparent"
          onChange={(date: any) => setChosenDate(date)}
        />
        <span className="text-sm italic">
          {" "}
          (The voucher will be marked as `non-expiring` if no date is chosen){" "}
        </span>
      </div>

      <div className="mt-10">
        <div className="inline-block font-bold mr-16">
          <button
            type="button"
            onClick={() => console.log("preview voucher")}
            className="btn btn-md bg-white text-black hover:bg-black hover:text-white rounded-3xl px-8 uppecase text-sm"
          >
            Preview
          </button>
        </div>

        <div className="inline-block font-bold">
          <button
            type="submit"
            className="btn btn-md bg-black text-white hover:bg-white hover:text-black rounded-3xl px-8 uppecase text-sm"
          >
            Create a new voucher
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewVoucher;
