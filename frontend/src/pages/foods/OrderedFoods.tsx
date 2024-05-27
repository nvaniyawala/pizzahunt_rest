import { useEffect, useState } from "react";
import OrderedFoodCard from "../../components/custom/Cards/OrderedFoodCard";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints } from "../../types/enums";
import { OrderStatus } from "../../types/commons";
import { IOrderHistory } from "../../types/interfaces";
import { nanoid } from "@reduxjs/toolkit";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

function OrderedFoods() {
  const orderHistoryFetch = useFetch(
    import.meta.env.VITE_ORDER_SERVICE_URI +
      ApiEndpoints.GET_ORDER_HISTORY +
      `/${localStorage.getItem("user")}/`
  );
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("PREPARING");
  const [orders, setOrders] = useState<IOrderHistory[]>([]);
  useEffect(() => {
    console.log(orderStatus);
    orderHistoryFetch
      .MakeHttpRequest(orderStatus)
      .then((result) => {
        if (result.result) {
          setOrders(result.result);
        }
      })
      .catch((ex) => console.log(ex));
  }, [orderStatus]);
  return (
    <div>
      <div className="container mt-2">
        <div className="flex gap-2">
          <button
            className="btn-theme-filled-shadowed"
            onClick={() => {
              setOrderStatus("PREPARING");
            }}
          >
            Preparing
          </button>
          <button
            className="btn-success-filled-shadowed"
            onClick={() => {
              setOrderStatus("IN_TRANSIT");
            }}
          >
            In transit
          </button>
          <button
            className="btn-danger-filled-shadowed"
            onClick={() => {
              setOrderStatus("CANCELLED");
            }}
          >
            Cancelled
          </button>
          <button
            className="btn-info-filled-shadowed"
            onClick={() => {
              setOrderStatus("DELIVERED");
            }}
          >
            Delivered
          </button>
        </div>
        <div className="row">
          {orders.length > 0 ? (
            orders.map((item: IOrderHistory) => {
              return (
                <div key={nanoid()} className="col-md-4">
                  <OrderedFoodCard {...item} />
                </div>
              );
            })
          ) : (
            <div className="text-secondary flex justify-center my-2">
              <ErrorOutlineOutlinedIcon />
              <span className="ms-2">
                You have no record for {orderStatus} orders
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderedFoods;
