import OrdersCard from "../../components/custom/OrdersCard";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints } from "../../types/enums";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";

const PlacedOrders = () => {
  const outletId = localStorage.getItem("outlet");
  const [placedOrders, setplacedOrders] = useState([]);
  const DisplayHook = useFetch(
    import.meta.env.VITE_PREPARATION_SERVICE_URI +
      ApiEndpoints.GET_ORDERS_BY_OUTLET +
      outletId,
    "GET"
  );
  const getAllOrders = () => {
    DisplayHook.MakeHttpRequest("/PREPARING").then((result) => {
      if (result.result) {
        console.log(result.result);
        setplacedOrders(result.result.orders);
      }
    });
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="container mt-4">
      <div className="text-3xl font-bold self-center mb-4">Placed Orders </div>
      <div className="row">
        {placedOrders.length > 0 ? (
          placedOrders.map((o) => {
            return (
              <div className="col-md-4" key={nanoid()}>
                <OrdersCard key={nanoid()} loadData={getAllOrders} order={o} />
              </div>
            );
          })
        ) : (
          <div className="text-secondary flex justify-center my-2">
            <ErrorOutlineOutlined />
            <span className="ms-2">No order to complete</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacedOrders;
