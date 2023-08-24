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
    ? "bg-green-500 p-2 text-white text-md rounded-e-md px-5"
    : "bg-secondary p-2 text-white text-md rounded-e-md px-5";




  return (
    <>
      <footer className="bg-white">
        <header className=" flex flex-col justify-center pb-5 pt-12 mx-2 gap-5 ">
          <h1 className="text-center text-text1 font-extrabold ">
            BE THE FIRST TO KNOW
          </h1>

          <h3 className="text-text1 font-bold text-center ">
            Subscribe and know all the new offers and news now
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
            <div className="flex items-center fixed bottom-0 left-0 mb-4 mr-4 bg-green-500 text-text1 rounded-lg p-2">
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
          <img
            className="flex items-center w-36 my-6 mx-auto"
            src="/assets/logo/main-gray.png"
            alt="Connect"
          />
        </header>
        <section className="grid grid-cols-2 pb-5 border-b gap-7 border-[#3d3d38]   mx-12">
          <div className="col-span-1 md:col-span-1 flex flex-col items-center ">
            <h2 className="text-text1 font-serif font-semibold">
              CONNECT WITH US
            </h2>
            <Link to={"/about"}>
              <p className="text-text1  hover:text-text1  text-sm">
                About company
              </p>
            </Link>

            <p className="text-text1  text-sm">call us: 442266</p>
          </div>
          <div className="col-span-1 md:col-span-1 flex flex-col items-center ">
            <h2 className="text-text1 font-serif font-semibold">
              ARITHMETIC
            </h2>

            <p className="text-text1 text-sm mb-1">my personal account</p>

            <p className="text-text1  text-sm mb-1">Order history</p>

            <p className="text-text1  text-sm mb-1">Track your order</p>
          </div>


        </section>
        <section className="grid grid-cols-4 py-5 gap-7  px-12 mx-10">
          <div className="col-span-4 md:col-span-1">
            <div className="flex gap-x-1 mr-1">
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
          </div>
          <div className="col-span-4 md:col-span-1">
            <p className=" text-[#A8A8A8]">Main Features</p>
          </div>
          <div className="col-span-4 md:col-span-1">
            <p className=" text-[#A8A8A8]">Super Fast Shipping</p>
            <br />
            <p className=" text-text1">
              Return and exchange service ”T & C applied”
            </p>
          </div>
          <div className="col-span-4 md:col-span-1">
            <p className=" text-[#A8A8A8]">Maintenance Center to help you</p>
            <br />
            <p className=" text-[#A8A8A8]">
              More than 50 Stores at your service anywhere
            </p>
            <br />
            <p className=" text-[#A8A8A8]">Buy Online or Pickup in Store </p>
          </div>
        </section>
        <section className="grid grid-cols-2 py-5 bg-[#0c0c0c]">
          <div className="col-span-3 md:col-span-1 mx-12 gap-3 ">
            <div className="flex gap-x-1 ">
              <a href="https://eg.visamiddleeast.com/en_EG">
                <FaCcVisa size={32} color="gray" />
              </a>
              <a href="https://www.parliament.uk/site-information/glossary/money-bills/">
                <FaMoneyBill size={32} color="gray" />
              </a>
              <a href="https://www.mastercard.us/en-us.html">
                <FaCcMastercard size={32} color="gray" />
              </a>
            </div>
          </div>
          <div className="col-span-1 md:col-span-1 ml-12 ">
            <p className="text-text1">
              ©Copyright 2023 by Zeyad Belal. All Rights Reserved.
            </p>
          </div>
        </section>
      </footer>
      <BackToTopButton />
    </>
  );
};

export default Footer;
