/* eslint-disable react/prop-types */
import ServicesItem from "./Service/ServicesItem";

function ServicesDisplay(props) {
  const filteredServices = [
    {
      id: 1,
      name : 'coding',
      category_id:{category_name : "programming"},
      images: [
        {
          url: "https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
        },
      ],
      price : 99,
      avg_rating : 4
    },
    {
      id: 2,
      name : 'mern app',
            category_id:{category_name : "programming"},
      images: [
        {
          url: "https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
        },
      ],
      price : 40,
      avg_rating : 2
    },
    {
      id: 3,
      name : 'logo',
            category_id:{category_name : "programming"},
      images: [
        {
          url: "https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
        },
      ],
      price : 99,
      avg_rating : 5
    },
    {
      id: 4,
      name : 'coding',
            category_id:{category_name : "programming"},
      images: [
        {
          url: "https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
        },
      ],
      price : 99,
      avg_rating : 1
    },
  ];
  // category_name
  // image
  // description
  // created_at
  // updated_at

  return (
    <div className="px-10 py-3  text-center flex flex-col justify-center ">
      <h1 className="text-semibold text-4xl text-text1 my-12 self-start">
        {props.category.category_name}
      </h1>
      <div className="gap-4 flex flex-col justify-around sm:flex-row flex-wrap">
        {filteredServices.map((item) => {
          return (
            <div key={item.id} className="w-100 sm:w-1/3 md:w-1/5 grow">
              <ServicesItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ServicesDisplay;
