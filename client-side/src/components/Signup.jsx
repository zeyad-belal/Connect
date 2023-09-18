/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Modal from "../UI/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch} from "react-redux"
import { signModalActions } from "./../store/signModalSlice"


function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [countryCode, setCountryCode] = useState("+20");
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const dispatch = useDispatch()



  async function onSubmit(data) {
    let { first_name, last_name, email, password, phone_number } = data;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/signup`,
        {
          first_name,
          last_name,
          email,
          password,
          phone_number: countryCode + phone_number,
        }
      );

      toast.success(
        `your account has been created successfully ${first_name}!`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );

      setCookie("User", JSON.stringify(response.data.newUser));
      setCookie("UserToken", response.data.token);
      window.localStorage.setItem("logged", true);
      dispatch(signModalActions.toggleModal());

    } catch (error) {
      console.error(error);
      error.response
        ? toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        : "";
    }
  }

  function handlePhoneNumber(e) {
    if (e.target.value[0] == 0) {
      e.target.value = e.target.value.slice(1);
    }
  }

  return (
    <>
      <Modal toggleModal={()=>dispatch(signModalActions.toggleModal())}>
        <div className="max-h-[500px] ">
          <h1 className="mx-auto w-fit text-2xl font-bold mb-3">
            Create an account
          </h1>
          <h1 className="mx-auto w-fit  text-sm mb-1">
            Already have an account?
            <a
              className="text-secondary cursor-pointer"
              onClick={()=>dispatch(signModalActions.toggleModalContent())}
            >
              {" "}
              Login
            </a>
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col items-center min-w-[300px] w-[400px] max-w-full   mx-auto py-2 px-7 bg-white rounded-lg "
          >
            {/* -------------------------------email------------------------------------------------ */}
            <div className="w-full mb-0">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-1 mt-3  text-sm" >
                Email
              </label>
              <input
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
                className="input mb-0"
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm  self-start" role="alert">
                email is required
              </p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-red-500 text-sm  self-start" role="alert">
                email must be valid{" "}
              </p>
            )}
            {/* ----------------------------------password-------------------------------------------- */}
            <div className="w-full mb-0">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-1 mt-2  text-sm"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                aria-invalid={errors.password ? "true" : "false"}
                className="input mb-0"
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm self-start" role="alert">
                password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm self-start" role="alert">
                password must be at least 6 chars{" "}
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-500 text-sm self-start" role="alert">
                password must be less than 20 chars
              </p>
            )}
            {/* ------------------------------------firstName------------------------------------------ */}
            <div className="w-full mb-3 flex gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="first_name"
                  className="block text-gray-700 font-semibold mb-2 mt-3 text-sm"
                >
                  First Name
                </label>

                <input
                  {...register("first_name", { required: true, maxLength: 20 })}
                  aria-invalid={errors.first_name ? "true" : "false"}
                  className="input mb-0"
                />
                {errors.first_name?.type === "required" && (
                  <p className="text-red-500 text-sm" role="alert">
                    first name is required
                  </p>
                )}
                {errors.first_name?.type === "maxLength" && (
                  <p className="text-red-500 text-sm" role="alert">
                    first name must be less than 20 chars
                  </p>
                )}
              </div>
              {/* -----------------------------------lastName------------------------------------------- */}
              <div className="">
                <div className="flex flex-col">
                  <label
                    htmlFor="last_name"
                    className="block text-gray-700 font-semibold mb-2 mt-3  text-sm"
                  >
                    Last Name
                  </label>
                  <input
                    {...register("last_name", {
                      required: true,
                      maxLength: 20,
                    })}
                    aria-invalid={errors.last_name ? "true" : "false"}
                    className="input mb-0"
                  />
                </div>
                {errors.last_name?.type === "required" && (
                  <p className="text-red-500 text-sm" role="alert">
                    last name is required
                  </p>
                )}
                {errors.last_name?.type === "maxLength" && (
                  <p className="text-red-500 text-sm" role="alert">
                    last name must be less than 20 chars
                  </p>
                )}
              </div>
            </div>

            {/* ----------------------------------phone number--------------------------------------- */}
            <div className="w-full mb-8">
              <label
                htmlFor="phone_number"
                className="block text-gray-700 font-semibold mb-2 mt-3  text-sm"
              >
                Phone Number
              </label>
              <div className="flex">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="input mr-2 max-w-[100px]"
                >
                  <option value="+20">+20</option>
                  <option value="+212">+212</option>
                </select>
                <input
                  onInput={(e) => handlePhoneNumber(e)}
                  type="text"
                  {...register("phone_number", {
                    required: true,
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Invalid Phone Number",
                    },
                  })}
                  aria-invalid={errors.phone_number ? "true" : "false"}
                  className="input"
                />
              </div>
              {errors.phone_number?.type === "pattern" && (
                <p className="text-red-500 text-sm" role="alert">
                  invalid phone number
                </p>
              )}
              {errors.phone_number?.type === "required" && (
                <p className="text-red-500 text-sm" role="alert">
                  phone number is required
                </p>
              )}
            </div>
            <input
              type="submit"
              value={"CREATE AN ACCOUNT"}
              className="primaryBtn py-3 px-2 rounded-lg"
            />
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Signup;
