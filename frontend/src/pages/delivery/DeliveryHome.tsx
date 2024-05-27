import { useEffect, useState } from "react";
import { ApiEndpoints } from "../../types/enums";
import { useFetch } from "../../hooks/useFetch";
import OrdersCard from "../../components/custom/OrdersCard";
import { nanoid } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { ErrorOutlineOutlined } from "@mui/icons-material";

function DeliveryHome() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
  const dpid = localStorage.getItem("user");
  const [myOrders, setmyOrders] = useState([]);
  const DisplayHook = useFetch(
    import.meta.env.VITE_ORDER_SERVICE_URI +
      ApiEndpoints.GET_ORDERS_FOR_DELIVERY +
      dpid +
      "/" +
      "IN_TRANSIT",
    "GET"
  );
  const getAllOrders = () => {
    DisplayHook.MakeHttpRequest().then((result) => {
      if (result.result) {
        setmyOrders(result.result.orders);
      } else {
        Toast.fire({
          title: "Server Error !",
          icon: "error",
        });
      }
    });
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div className="container my-4">
      <div className="text-3xl font-bold px-4 self-center mb-4">
        Placed Orders{" "}
      </div>
      <div className="row">
        {myOrders.length > 0 ? (
          myOrders.map((o) => {
            return (
              <div className="col-md-4" key={nanoid()}>
                <OrdersCard key={nanoid()} loadData={getAllOrders} order={o} />
              </div>
            );
          })
        ) : (
          <div className="text-secondary flex justify-center my-2">
            <ErrorOutlineOutlined />
            <span className="ms-2">You don't have any order to deliver</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default DeliveryHome;
