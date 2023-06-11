import { ChangeEvent, useState, useRef, useEffect } from "react";
import { IoLogoInstagram, IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const MailingList = ({ innerRef }) => {
  const MAILCHIMP_URL = process.env.REACT_APP_MAILCHIMP_URL;

  const CustomForm = ({ status, message, onValidated }) => {
    const [msg, renderMsg] = useState(false);
    let email;
    const onSubmit = () => {
      email &&
        email.value.indexOf("@") > -1 &&
        onValidated({
          EMAIL: email.value,
        });
      renderMsg(true);
    };

    useEffect(() => {
      setTimeout(() => {
        renderMsg(false);
      }, 5000);
    }, [status]);

    return (
      <div ref={innerRef}>
        <div className="flex md:flex-row gap-2 md:justify-center w-full">
          <input
            ref={(node) => (email = node)}
            type="email"
            placeholder="Your email"
            className="input input-bordered bg-white text-black w-full max-w-xs "
          />
          <button onClick={onSubmit} className="btn btn-md text-white  w-30">
            Subscribe
          </button>
        </div>
        {status === "sending" && msg === true && (
          <div className="toast toast-end z-50">
            <div className="alert alert-success bg-black">
              <div>
                <span className="text-white ">Sending...</span>
              </div>
            </div>
          </div>
        )}
        {status === "error" && msg === true && (
          <div className="toast toast-end z-50">
            <div className="alert alert-success bg-black">
              <div>
                <span className="text-white ">{message}</span>
              </div>
            </div>
          </div>
        )}
        {status === "success" && msg === true && (
          <div className="toast toast-end z-50">
            <div className="alert alert-success bg-black">
              <div>
                <span className="text-white ">{message}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center lg:items-center lg:content-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-wide font-LexendMega sm:text-4xl">
            Connect with
          </p>
          <span className="mt-2 text-3xl leading-8 font-extrabold tracking-wide font-LexendMega sm:text-4xl text-primary">
            Puzzoh
          </span>

          <div className="flex my-2 md:space-x-2 lg:justify-center w-full">
            <button className="btn rounded-3xl bg-white hover:bg-white border-none">
              <IoLogoInstagram className="text-black hover:text-primary text-3xl" />
            </button>
            <button className="btn rounded-3xl bg-white hover:bg-white border-none">
              <IoLogoLinkedin className="text-black hover:text-primary text-3xl " />
            </button>
            <a href="https://github.com/Puzzoh">
              <button className="btn rounded-3xl bg-white hover:bg-white border-none">
                <IoLogoGithub className="text-black hover:text-primary text-3xl" />
              </button>
            </a>
          </div>

          <div className="text-base lg:w-full my-5 tracking-wide">
            Join the emailing list today to receive the latest updates about our
            upcoming app!
          </div>

          <MailchimpSubscribe
            url={MAILCHIMP_URL}
            render={({ status, message, subscribe }) => (
              <CustomForm
                status={status}
                message={message}
                onValidated={(formData) => subscribe(formData)}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default MailingList;
