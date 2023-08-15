import backgroundImage from '../../public/main.png'
function HeroSection() {
  return (
    <div
      className=" bg-cover bg-center min-h-screen min-w-full  mt-[-30px] flex flex-col justify-center items-center  "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        
      }}
    >
      
      <div className="z-10 flex flex-col items-center text-center ">
        <div className="mx-6">
            <h1 className="text-bold text-text1 text-[30px] lg:text-[50px] md:text-[40px] mb-5">Where Talent Meets Opportunity </h1>
            <p className="text-semibold text-text1 text-[15px] lg:text-[20px] md:text-[17px]  mb-12">Join a Community of Talented Freelancers and Connect with Clients Worldwide.</p>
        </div>
        <div className="relative mx-5">
          <input name="text" type="text" required 
            className="rounded-md w-[350px] sm:w-[450px] md:w-[600px] lg:w-[700px] py-6  pl-18 mb-0  rounded-s-md pl-2 pr-12 focus:outline-none focus:ring-2 focus:ring-text1"
            placeholder="Try : logo desgin or web .."
            />
          <button className="absolute right-2 primaryBtn rounded-md  top-1/2 transform -translate-y-1/2 h-53"> search</button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
