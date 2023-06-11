import React, { useEffect } from "react";
import { VoucherTypes } from "utils/types";
import DropdownMenu from "components/business-portal/VoucherDropdownMenu";
import { useQuery } from "react-query";
import moment from "moment";
import api from "libs/api";

const Voucher = ({
  id,
  title,
  description,
  category,
  priceBefore,
  priceAfter,
  maxRedeem,
  expireDate,
}: VoucherTypes) => {
  const { data, status } = useQuery(["voucher_imgs"], async () => {
    const res = await api.get("/voucher-imgs");
    return res.data;
  });

  const reformatExpireDate = moment(expireDate).format("YYYY-MM-DD");

  return (
    <div>
      <div className="card w-full sm:w-72 h-80 bg-base-100 shadow-xl">
        <figure>
          <div className="carousel w-full">
            <div id="img1" className="carousel-item relative w-full">
              <img
                src="https://cutewallpaper.org/cdn-cgi/mirage/dd19f2d06ebc24f541f142b37b4289ffa7de722a7607e39984c5c6dd4ce8defd/1280/24/upload-png/ico-convert-create-icons-from-png-amp-jpg-images-online.png"
                className="w-full"
              />

              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#img3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#img2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>

            <div id="img2" className="carousel-item relative w-full">
              <img
                src="https://cutewallpaper.org/cdn-cgi/mirage/dd19f2d06ebc24f541f142b37b4289ffa7de722a7607e39984c5c6dd4ce8defd/1280/24/upload-png/ico-convert-create-icons-from-png-amp-jpg-images-online.png"
                className="w-full"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#img1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#img3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>

            <div id="img3" className="carousel-item relative w-full">
              <img
                src="https://cutewallpaper.org/cdn-cgi/mirage/dd19f2d06ebc24f541f142b37b4289ffa7de722a7607e39984c5c6dd4ce8defd/1280/24/upload-png/ico-convert-create-icons-from-png-amp-jpg-images-online.png  "
                className="w-full"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#img2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#img1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <DropdownMenu voucherId={id} voucherImgs={data} />
        </figure>

        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge bg-primary border-none">{category}</div>
          </h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline mr-auto">
              {maxRedeem} remaining
            </div>
            <div>
              <span className="text-gray-500 line-through">${priceBefore}</span>
              <span className="text-black"> ${priceAfter}</span>
            </div>
          </div>
          <div>
            <span className="font-semibold">Expired on: {""}</span>
            <span className="italic">{reformatExpireDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voucher;
