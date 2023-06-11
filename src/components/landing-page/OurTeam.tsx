import React from "react";
import {
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";

interface Props {
  innerRef: React.MutableRefObject<HTMLInputElement>;
}

const OurTeam: React.FC<Props> = ({ innerRef }) => {
  return (
    <div ref={innerRef}>
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-wide font-LexendMega sm:text-4xl">
              Our Team
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap px-4 py-8 text-center">
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src={require(`assets/images/Holly.jpg`)} alt="Headshot" />
            </div>
            <h3 className="font-LexendMega">Holly Ouyang</h3>
            <p>Product Manager</p>
            <div className="icons">
              <a href="https://www.linkedin.com/in/huige-holly-ouyang">
                <FaLinkedinIn />
              </a>
              <a>
                <FaInstagram />
              </a>
              <a href="mailto:houyang@villanova.edu">
                <a>
                  <FaEnvelope />
                </a>
              </a>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src={require(`assets/images/Minh.jpg`)} alt="Headshot" />
            </div>
            <h3 className="font-LexendMega">Minh Phung</h3>
            <p>Developer</p>
            <div className="icons">
              <a href="https://www.linkedin.com/in/minhphung1">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com/mphung1">
                <FaGithub />
              </a>
              <a href="mailto:mphung1@villanova.edu">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
