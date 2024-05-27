import { useEffect, useState } from "react";
import FoodItemCard from "../../components/custom/Cards/FoodItemCard";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints } from "../../types/enums";
import { IItem } from "../../types/interfaces";

function FoodsHome() {
  const [foodItems, setFoodItems] = useState<IItem[]>([]);
  const { MakeHttpRequest } = useFetch<IItem[]>(
    import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.GET_ALL_ITEMS
  );
  useEffect(() => {
    MakeHttpRequest()
      .then((result) => {
        if (result.result.length > 0) {
          setFoodItems(result.result);
        }
      })
      .catch((ex) => console.log(ex));
  }, []);
  return (
    <div className="container mt-2">
      <div className="row">
        {foodItems.map((item: IItem) => {
          return (
            <div key={item.id} className="col-md-4 col-lg-3">
              <FoodItemCard data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FoodsHome;
