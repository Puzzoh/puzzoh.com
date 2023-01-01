import React from "react";
import { ReactPhotoCollage } from "react-photo-collage";
import { FaAppStore, FaGooglePlay } from "react-icons/fa"

const setting = {
  width: "600px",
  height: ["250px", "170px"],
  layout: [3, 4],
  photos: [
    { source: require(`assets/images/Collage1.jpeg`) },
    { source: require(`assets/images/Collage2.jpeg`) },
    { source: require(`assets/images/Collage3.jpeg`) },
    { source: require(`assets/images/Collage8.jpeg`) },
    { source: require(`assets/images/Collage5.jpeg`) },
    { source: require(`assets/images/Collage6.jpeg`) },
    { source: require(`assets/images/Collage7.jpeg`) },
  ],
  showNumOfRemainingPhotos: false,
};

const Hero: React.FC = () => {
  return (
    <section>
      <div className="container flex flex-col lg:flex-row items-center gap-12 mt-16 lg:mt-8">
        <div className="flex flex-1 flex-col items-center lg:items-start">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center lg:text-left mb-6 font-LexendMega font-semibold">
            Stop Swiping <br className="sm:block hidden" />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-second to-primary font-LexendMega">
              Start Meeting
            </span>{" "}
          </h1>
          <p className="text-lg text-center lg:text-left mb-6">
            Choose a voucher for food or an activity & share the experience in
            real life with your match(es).
          </p>
          <div className="flex justify-center flex-wrap gap-6 ">
            <button
              type="button"
              className="btn bg-white text-black hover:bg-black hover:text-white"
            >
              Get it on App Store
              <FaAppStore className="text-4xl pl-3" />
            </button>
            <button
              type="button"
              className="btn bg-white text-black hover:bg-black hover:text-white"
            >
              Get it on Google Play
              <FaGooglePlay className="text-3xl pl-3" />
            </button>
            <p className="text-base text-center lg:text-left mt-0 lg:mt-10">
              Own a restaurant/place?{" "}
              <a href="/business">
                <button>
                  <span className="underline font-bold hover:text-primary">
                    Partner with Puzzoh!
                  </span>
                </button>
              </a>
            </p>
          </div>
        </div>

        <div className="w-screen flex justify-center flex-1 mb-0">
          <ReactPhotoCollage {...setting} />
        </div>
      </div>

      <div
        className="
          hidden
          md:block
          overflow-hidden
          bg-bookmark-purple
          rounded-l-full
          absolute
          h-80
          w-2/4
          top-32
          right-0
          lg:-bottom-28
        "
      ></div>
    </section>
  );
};

export default Hero;
