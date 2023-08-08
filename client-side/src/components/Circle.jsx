const Circle = ({ srcImg, title }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 mx-5 md:mx-12">
        <div className=" w-32 h-32 rounded-full bg-orange-500">
          <img
            className="object-contain w-full h-full p-5"
            src={srcImg}
            alt={title}
          />
        </div>
        <div className="text-lg font-bold">{title}</div>
      </div>
    </>
  );
};

export default Circle;
