import React, { useNavigate, Link } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center space-y-5">
      <h1 className="text-6xl text-primary font-bold">
        404 - Page not found
      </h1>
      <p className="">The URL of this page is not found. Please try again.</p>
      <div>
        <Link to=".">
          <div className="btn mr-4 bg-black hover:bg-white text-white hover:text-black">Go to homepage</div>
        </Link>
        <div className="btn bg-black hover:bg-white text-white hover:text-black" onClick={() => navigate(-1)}>
          Go back to previous page
        </div>
      </div>
    </div>
  );
};

export default NotFound;
