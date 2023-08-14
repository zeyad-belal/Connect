import { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [btnVisibility, setBtnVisibility] = useState(false);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 0) {
        setBtnVisibility(true);
      } else {
        setBtnVisibility(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {btnVisibility && (
        <button
          className="bg-secondary z-999999 text-white px-3 py-2 rounded-full hover:bg-secHover fixed bottom-4 right-4"
          onClick={handleBackToTop}
        >
          <img
            className="w-5 h-5"
            src="/up-arrow-svgrepo-com.svg"
            alt="Back to Top"
          ></img>
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
