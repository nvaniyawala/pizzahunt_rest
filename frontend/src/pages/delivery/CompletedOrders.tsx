import { useEffect, useState } from "react";
import { ApiEndpoints } from "../../types/enums";
import { useFetch } from "../../hooks/useFetch";
import Swal from "sweetalert2";

const CompletedOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(); // Track selected order
  const [orders, setOrders] = useState([]);
  const dpid = localStorage.getItem("user");
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
  const DisplayHook = useFetch(
    import.meta.env.VITE_ORDER_SERVICE_URI +
      ApiEndpoints.GET_ORDERS_FOR_DELIVERY +
      dpid +
      "/" +
      "DELIVERED",
    "GET"
  );
  useEffect(() => {
    getAllDeliveredOrders();
  }, []);

  const getAllDeliveredOrders = () => {
    DisplayHook.MakeHttpRequest().then((result) => {
      if (result.error) {
        Toast.fire({
          title: "Server Error !",
          icon: "error",
        });
      } else {
        setOrders(result.result.orders);
      }
    });
  };

  const handleOrderClick = (order) => {
    Swal.fire({
      html: `
        <h3>Order Details for ${order.name}</h3><br/>
        <div className="my-2">
          ${order.items.map(
            (item) =>
              `<div key=${item.name}>
              ${item.quantity} x ${item.name}
            </div>`
          )}
        </div>
      </div>`,
      showCloseButton: true,

      focusConfirm: false,
      confirmButtonText: "Close",
      confirmButtonAriaLabel: "Thumbs up, great!",
    });

    // Set selected order on click
  };
  return (
    <div className="container px-4 py-10">
      <div className="flex flex-col ">
        <h2 className="text-3xl font-bold self-center mb-4">
          Delivered Orders
        </h2>
        <div className="">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-md shadow-md p-4 flex  justify-between items-center cursor-pointer hover:bg-gray-100"
              onClick={() => handleOrderClick(order)}
            >
              <div className="mr-4 flex flex-col flex-wrap">
                <span className="text-xl mr-4 font-bold">{order.name} </span>
                <span className="text-base font-semibold text-gray-500">
                  {order.phoneNo} <br />
                  {order.address}
                </span>
              </div>
              <div className=" flex flex-col flex-wrap w-1/3 text-right">
                <span className="text-xl font-semibold">
                  ₹{order.payable_amount}
                </span>
                <span className="text-base text-gray-500 ml-2">
                  {order.items.length} items
                </span>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedOrders;
