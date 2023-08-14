/* eslint-disable no-unused-vars */
import { useState } from "react";

import Category from "./Category";

const categoriesData = [
  {
    title: "TVs",
    imageUrl:
      "https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    id: 1,
    linkUrl: "categories/televisions"
  },
  {
    title: "Mobiles",
    imageUrl:
      "https://img.freepik.com/free-psd/dark-mobile-device-mockup_149660-801.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    id: 2,
    linkUrl: "categories/mobiles"
  },
  {
    title: "Laptops",
    imageUrl:
      "https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    id: 3,
    linkUrl: "categories/laptops"
  },
  {
    title: "Gaming",
    imageUrl:
      "https://img.freepik.com/premium-photo/professional-e-sports-gamer-rejoices-victory-non-existent-person-generative-ai-digital-il_777271-2605.jpg?size=626&ext=jpg&ga=GA1.2.1326869177.1680443547&semt=sph",
    id: 5,
    linkUrl: "categories/gaming"
  },
  {
    title: "Accessories",
    imageUrl:
      "https://img.freepik.com/premium-photo/collection-apple-services-including-apple-services_896360-1985.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=ais",
    id: 6,
    linkUrl: "categories/accessories"
  },
  {
    title: "Accessories",
    imageUrl:
      "https://img.freepik.com/premium-photo/collection-apple-services-including-apple-services_896360-1985.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=ais",
    id: 6,
    linkUrl: "categories/accessories"
  },
  {
    title: "Accessories",
    imageUrl:
      "https://img.freepik.com/premium-photo/collection-apple-services-including-apple-services_896360-1985.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=ais",
    id: 6,
    linkUrl: "categories/accessories"
  },
  {
    title: "Accessories",
    imageUrl:
      "https://img.freepik.com/premium-photo/collection-apple-services-including-apple-services_896360-1985.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=ais",
    id: 6,
    linkUrl: "categories/accessories"
  },
];

const Categories = () => {
  const [categories, setCategories] = useState(categoriesData);

  return (
<>
  <section className="px-10 h-[100vh] bg-white text-center flex flex-col justify-center overflow-hidden">
    <h1 className="text-semibold text-4xl text-text1 my-12">
      Professional Services to Grow Your Business
    </h1>
    <div className="gap-5 flex flex-col justify-around sm:flex-row flex-wrap">
      {categories.map((category) => {
        return (
          <div
            key={category.id}
            className="w-100  sm:w-1/3 md:w-1/5"
          >
            <Category category={category} />
          </div>
        );
      })}
    </div>
  </section>
</>

  );
};

export default Categories;
