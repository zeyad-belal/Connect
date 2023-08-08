/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// Styles
import { Link } from "react-router-dom";
import "./Category.scss";

const Category = (props) => {
  const { title, imageUrl, linkUrl, size } = props.category;

  return (
    <>
      <Link
        to={`/products?category=${title}`}
        className={`${size} category-item flex grow shrink basis-auto items-center justify-center rounded-lg mt-0 mr-2 ml-2 mb-4 overflow-hidden hover:cursor-pointer`}
      >
        <div
          className="background-image w-full h-full bg-center bg-cover "
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
        />
        <div className="content">
          <h1 className="title">{title.toUpperCase()}</h1>
          <span className="subtitle">SHOP NOW</span>
        </div>
      </Link>
    </>
  );
};

export default Category;
