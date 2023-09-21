import { Link } from "react-router-dom";
import BackToTopButton from "../BackToTopButton";
import emailjs from "emailjs-com";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaCcVisa,
  FaCcMastercard,
  FaMoneyBill
} from "react-icons/fa";
import { useRef, useState } from "react";

const Footer = () => {

  const [emailSent, setEmailSent] = useState(false);
  const form = useRef();
  emailjs.init("ieyQAv01RBSvsmGou");

  function submitHandler(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_97xavkg",
        "template_puu3859",
        form.current,
        "ieyQAv01RBSvsmGou"
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
          setEmailSent(true);

          // Hide the confirmation message after 3 seconds
          setTimeout(() => {
            setEmailSent(false);
          }, 3000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  const sendBtnClasses = emailSent
    ? "bg-secHover p-2 text-white text-md rounded-e-md px-5"
    : "bg-secondary hover:bg-secHover p-2 text-white text-md rounded-e-md px-5";




  return (
    <>
      <footer className="bg-white">
        <header className=" flex flex-col justify-center pb-2 pt-5 mx-2 gap-5 ">

          <h3 className="text-text1 font-semibold text-center ">
            Subscribe To Get The Latest Services Available
          </h3>

          <form
            ref={form}
            onSubmit={(e) => submitHandler(e)}
            className="flex mx-auto sm:w-[450px] mb-2"
          >
            <input
              name="email"
              type="email"
              required
              className="border w-full  rounded-s-md pl-2 pr-12 py-3 focus:outline-none  focus:border-secondary transition-colors"
              placeholder="Email Address"
            />
            <button className={sendBtnClasses}> send</button>
          </form>
          {emailSent && (
            <div className=" flex items-center fixed bottom-0 left-0 mb-4 mr-4 bg-green-500 text-text1 rounded-lg p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 10a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zm1 2a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2">Kindly check your email !</span>
            </div>
          )}

        </header>


            <div className="flex justify-center my-3 items-center gap-x-1 mr-1">
              <a
                href="https://www.facebook.com/"
                className="bg-[#33332f] hover:bg-[#4267B2] p-2 rounded-full"
              >
                <FaFacebook size={20} color="white" />
              </a>
              <a
                href="https://twitter.com/"
                className=" bg-[#33332f] hover:bg-[#1DA1F2] p-2 rounded-full"
              >
                <FaTwitter size={20} color="white" />
              </a>
              <a
                href="https://www.linkedin.com/"
                className="bg-[#33332f] hover:bg-[#2867B2] p-2 rounded-full"
              >
                <FaLinkedin size={20} color="white" />
              </a>
              <a
                href="https://www.instagram.com/"
                className="bg-[#33332f] hover:bg-gradient-to-br from-pink-500 via-purple-600 to-yellow-400 p-2 rounded-full"
              >
                <FaInstagram size={20} color="white" />
              </a>
            </div>



        <section className="flex justify-between py-3 px-5 bg-[#0c0c0c]">
        <div className="">
            <p className="text-white">
              Developed by <span className="text-secondary text-sm"> zeyad belal </span>|
              Contact : <a href="mailto:zeyadbelal00@gmail.com" className="text-secondary hover:text-secHover text-sm">
                zeyadbelal00@gmail.com</a> 
            </p>
          </div>
          <div className=" mx-12 gap-3 ">
            <div className="flex gap-x-1 ">
              <a href="https://eg.visamiddleeast.com/en_EG">
                <FaCcVisa size={25} color="gray" />
              </a>
              <a href="https://www.parliament.uk/site-information/glossary/money-bills/">
                <FaMoneyBill size={25} color="gray" />
              </a>
              <a href="https://www.mastercard.us/en-us.html">
                <FaCcMastercard size={25} color="gray" />
              </a>
            </div>
          </div>

        </section>
      </footer>
      <BackToTopButton />
    </>
  );
};

export default Footer;
