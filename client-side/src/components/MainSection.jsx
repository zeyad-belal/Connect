/* eslint-disable no-unused-vars */
import { useState } from "react";
import CategoryDisplay from "./ServiceDisplay"

function MainSection() {
  
  const categoriesData = [
    {
      category_name: "Design",
      id: 1,
    },
    {
      category_name: "logo",
      id: 2,
    },
    {
      category_name: "code",
      id: 3,
    },
    {
      category_name: "web",
      id: 4,
    },
    {
      category_name: "cyber",
      id: 5,
    },
    {
      category_name: "translate",
      id: 6,
    },
    {
      category_name: "crypto",
      id: 7,
    },
    {
      category_name: "hack",
      id: 8,
    }
  ];

  const [categories, setCategories] = useState(categoriesData);
    // useEffect(()=>{
    //   const data = axios.get(`${import.meta.env.VITE_API_URL}/categories`)
    //   setCategories(data)
    // },[])

  return (
    <div className="bg-primary px-3">
    {categories.map((category)=>
      <CategoryDisplay key={category.id} category={category} />
    )
  }
    </div>
  )
}

export default MainSection