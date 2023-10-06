/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import Modal from "../UI/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch} from "react-redux"
import { signModalActions } from "./../store/signModalSlice"


function Login() {
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch()

  const oneYearFromNow = new Date();
oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  async function onSubmit(data) {
    const { email, password, rememberMe } = data;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        { email, password,rememberMe }
      );

      window.localStorage.setItem("logged", true);

      if(rememberMe){
        setCookie("UserToken", response.data.token, { expires: oneYearFromNow })
        setCookie("User", JSON.stringify(response.data.user), { expires: oneYearFromNow })
      }else{
        setCookie("UserToken", response.data.token )
        setCookie("User", JSON.stringify(response.data.user))
      }

      dispatch(signModalActions.toggleModal())
      window.location.reload();

    } catch (error) {
      // console.error(error);
      error.response
        ? toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        : "";
    }
  }

  return (
    <>
      <Modal toggleModal={()=> dispatch(signModalActions.toggleModal())}>
        <h1 className="mx-auto w-fit  text-lg mb-4 font-bold mt-3">Sign in to your account</h1>
        <p className="mx-auto w-fit  text-sm mb-4">
          Don't have an account?{" "}
          <a onClick={()=> dispatch(signModalActions.toggleModalContent())}
            className="text-secondary cursor-pointer" >
            Sign Up
          </a>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start min-w-[300px] w-[400px] max-w-full mx-auto py-3 px-10 bg-white rounded-lg " >
          {/* -------------------------------email------------------------------------------------ */}
          <div className="w-full mb-2">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2 mt-3  text-sm" >
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
              className="input mb-0" />
          </div>
          {errors.email?.type === "required" && (
            <p className="text-red-500 mb-3 text-sm" role="alert">
              email is required
            </p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-red-500 mb-3 text-sm " role="alert">
              email must be valid{" "}
            </p>
          )}
          {/* ----------------------------------password-------------------------------------------- */}
          <div className="w-full mb-2">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2 mt-3  text-sm" >
              Password
            </label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
              type="password"
              aria-invalid={errors.password ? "true" : "false"}
              className="input mb-0" />
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-500 mb-3 text-sm" role="alert">
              password is required
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 mb-3 text-sm" role="alert">
              password must be at least 6 chars{" "}
            </p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="text-red-500 text-sm" role="alert">
              password must be less than 20 chars
            </p>
          )}
          {/* -----------------rememberMe---------------- */}
          <div className="flex gap-2 my-1">
            <input 
              {...register("rememberMe", {
              })}
              type="checkbox"
              id="rememberMe"
              className="cursor-pointer self-center w-4 h-4"
              />
              <label className="text-sm cursor-pointer" htmlFor="rememberMe" >remember me ?</label>
            </div>

          <input
            type="submit"
            value={"Login"}
            className="primaryBtn rounded-lg py-3 px-5 mt-3 self-center cursor-pointer" />
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Login;
