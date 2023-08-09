import backgroundImage from "../../public/main.jpg";

function HeroSection() {
  return (
    <div
      className=" bg-cover bg-center min-h-screen min-w-full absolute top-1 flex flex-col justify-center items-center "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1 className="text-semibold text-primary text-[50px] mb-5">Connect with The Right Talent </h1>
      <p className="text-semibold text-primary text-[20px] mb-12">With ease and safety, complete your tasks for prices starting from $5</p>
      <div className="relative ">
        <input name="text" type="text" required 
          className="w-[700px] py-7 pl-18 mb-0  rounded-s-md pl-2 pr-12"
          placeholder="Try : logo desgin or web .."
          />
        <button className="absolute right-2 text-white text-lg hover:bg-yellow-400 bg-secondary px-6 py-5  top-1/2 transform -translate-y-1/2 h-53"> search</button>
          </div>
    </div>
  );
}

export default HeroSection;
