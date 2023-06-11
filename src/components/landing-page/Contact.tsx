import React, { useRef, useState, useCallback } from "react";
import {
  IoMail,
  IoLocation,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoGithub,
} from "react-icons/io5";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const form = useRef<any>();
  const [message, showMessage] = useState<boolean>(false);

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_y261qcm",
        "template_qe182jm",
        form.current,
        process.env.REACT_APP_EMAILJS_KEY
      )
      .then((err: any) => {
        console.log(err.text);
      });
    e.target.reset();
    showMessage(true);
    setTimeout(() => {
      showMessage(false);
    }, 3000);
  };

  return (
    <div className="flex w-full min-h-screen justify-center items-center bg-white">
      <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0 md:items-stretch w-full max-w-4xl p-8 sm:px-12 sm:py-10 rounded-xl shadow-lg overflow-hidden bg-white">
        <div className="md:py-4 flex-grow flex flex-col space-y-8 md:justify-between">
          <div>
            <h1 className="text-4xl font-bold font-LexendMega tracking-wide">
              Contact Us
            </h1>
            <p className="pt-2 text-black  text-sm">
              Please leave us a comment, question or suggestion.
            </p>
          </div>
          <div className="flex flex-col space-y-6">
            <div className="inline-flex space-x-2 items-center">
              <IoMail className="text-primary text-xl" />
              <span className="  select-all">admin@puzzoh.com</span>
            </div>
            <div className="inline-flex space-x-2 items-center">
              <IoLocation className="text-primary text-xl" />
              <span className="  select-all">
                800 E Lancaster Ave, Villanova, PA 19085, US
              </span>
            </div>
          </div>
          <div className="flex space-x-4 text-lg">
            <button>
              <IoLogoInstagram className="text-primary text-2xl" />
            </button>
            <button>
              <IoLogoLinkedin className="text-primary text-2xl" />
            </button>
            <a href="https://github.com/Puzzoh">
              <button>
                <IoLogoGithub className="text-primary text-2xl" />
              </button>
            </a>
          </div>
        </div>

        <div className="relative z-10">
          <div className="relative z-10 w-full md:w-80 h-full rounded-xl shadow-lg p-8 bg-primary">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="flex flex-col space-y-4"
            >
              <input
                id="name"
                name="name"
                maxLength={128}
                type="text"
                placeholder="Name"
                className="bg-white outline-none border-2 border-none rounded-3xl px-6 py-2 "
              />
              <input
                id="email"
                name="email"
                required
                maxLength={128}
                type="email"
                placeholder="Email"
                className="bg-white outline-none border-2 border-none rounded-3xl px-6 py-2 "
              />
              <textarea
                id="message"
                name="message"
                placeholder="Your message"
                className="bg-white outline-none border-2 border-none rounded-3xl px-6 py-6 min-h-[15em] "
              ></textarea>
              <div className="inline-block self-end font-bold mt-10">
                <button
                  type="submit"
                  className="btn btn-sm bg-black text-white hover:bg-white hover:text-black rounded-3xl px-8 uppecase text-sm "
                >
                  Send message
                </button>
              </div>

              {message ? (
                <div className="toast toast-end">
                  <div className="alert alert-success bg-black">
                    <div>
                      <span className="text-white ">
                        Message sent successfully.
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
