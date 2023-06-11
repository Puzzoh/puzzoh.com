import React, { useContext } from "react";
import { AuthContext } from "context/authContext";
import { useQuery } from "react-query";
import Voucher from "components/business-portal/Voucher";
import NewVoucherComponent from "components/business-portal/NewVoucher";
import { VoucherTypes } from "utils/types";
import { MdOutlineSwipe } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import api from "libs/api";

const MyVouchers = () => {
  const { data, status } = useQuery(["vouchers"], async () => {
    const res = await api.get("/vouchers");
    return res.data;
  });

  return (
    <div className="ml-4 mt-4 lg:ml-60">
      <div className="text-3xl leading-8 font-extrabold tracking-wide sm:text-4xl">
        {" "}
        Vouchers{" "}
      </div>

      <div className="stats shadow mb-2">
        <div className="stat">
          <div className="stat-figure text-primary">
            <RiCoupon2Line size="2rem" />
          </div>
          <div className="stat-title">Total number of vouchers</div>
          <div className="stat-value"> {data?.length} </div>
          <div className="stat-desc">* Active & inactive vouchers</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <MdOutlineSwipe size="2rem" />
          </div>
          <div className="stat-title">Total number of swipes</div>
          <div className="stat-value">100</div>
          <div className="stat-desc">↗︎ 20 compared to last month </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src="https://www.creativefabrica.com/wp-content/uploads/2021/02/12/FoodRestaurant-Gift-Voucher-Template-Graphics-8558430-1.jpg" />
              </div>
            </div>
          </div>
          <div className="stat-value">Today&apos;s voucher</div>
          <div className="stat-title">Voucher about to be expired</div>
          <div className="stat-desc text-primary">2 days left</div>
        </div>
      </div>

      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <AddVoucherModal />
          {data?.map((v: VoucherTypes) => (
            <Voucher
              key={v.id}
              id={v.id}
              title={v.title}
              description={v.description}
              category={v.category}
              priceBefore={v.priceBefore}
              priceAfter={v.priceAfter}
              maxRedeem={v.maxRedeem}
              expireDate={v.expireDate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const AddVoucherModal = () => {
  return (
    <div>
      <label
        htmlFor="my-modal-4"
        className="card w-full sm:w-72 h-80 bg-base-100 shadow-xl flex items-center justify-center h-screen"
      >
        <div>Create new voucher</div>
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <NewVoucherComponent />
        </label>
      </label>
    </div>
  );
};

export default MyVouchers;
