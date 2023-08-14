
function HeroSection() {
  return (
    <div
      className="bg-primary bg-cover bg-center min-h-screen min-w-full  mt-[-30px] flex flex-col justify-center items-center mb-12 "
      style={{
        // backgroundImage: `url(${backgroundImage})`,
        
      }}
    >
      
      <div className="z-20 flex flex-col items-center">
        <h1 className="text-bold text-text1 text-[50px] mb-5">Connect with The Right Talent </h1>
        <p className="text-semibold text-text1 text-[20px]  mb-12">With ease and safety, complete your tasks for prices starting from $5</p>
        <div className="relative ">
          <input name="text" type="text" required 
            className="rounded-md w-[700px] py-6  pl-18 mb-0  rounded-s-md pl-2 pr-12 focus:outline-none focus:ring-2 focus:ring-text1"
            placeholder="Try : logo desgin or web .."
            />
          <button className="absolute right-2 primaryBtn rounded-md  top-1/2 transform -translate-y-1/2 h-53"> search</button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
