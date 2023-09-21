/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Category = ({category}) => {

  return (
    <>
    {category && 
      <Link
      to={`/services?category=${category.category_name}`}
        className={`category-item rounded-md   flex grow h-[200px] overflow-hidden hover:cursor-pointer`}
      >
        <div
          className="background-image w-full h-full bg-center bg-cover "
          style={{
            backgroundImage: `url(${category.image.url})`
          }} >
            <div className="bg-center bg-cover bg-black bg-opacity-30 w-full h-full text-white flex justify-center items-center" >
              <h1 className="text-xl">{category.category_name.toUpperCase()}</h1>
            </div>
        </div>
      </Link>
    }
    </>
  );
};

export default Category;
