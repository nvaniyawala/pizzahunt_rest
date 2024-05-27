import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints } from "../../types/enums";

const PreparedOrders = () => {
  const DisplayHook = useFetch(
    import.meta.env.VITE_ORDER_SERVICE_URI +
      ApiEndpoints.GET_TODAYS_ORDERS_BY_OUTLET +
      localStorage.getItem("outlet"),
    "GET"
  );

  const [isNotFound, setIsNotFound] = useState(false);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const renderList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const newList = list.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search)
    );
    if (newList.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }

    if (
      newList.length === 0 ||
      e.target.value == null ||
      e.target.value == undefined ||
      (typeof e.target.value === "string" && e.target.value.trim().length === 0)
    ) {
      setList(list);
    } else {
      setList(newList);
    }
  };

  useEffect(() => {
    getAllTodaysOrders();
  }, []);

  const getAllTodaysOrders = () => {
    DisplayHook.MakeHttpRequest().then((result) => {
      if (result.result.orders.length != 0) {
        setList(result.result.orders);
        console.log(list);
      } else {
        setList([]);
      }
    });
  };

  return (
    <div className="mt-4 overflow-x-auto container">
      <div className="flex justify-between mb-2">
        <div className="text-3xl font-bold self-center">Today's Orders</div>
        <input
          type="text"
          className="ph-input-text w-[30%] mt-2"
          placeholder="Search through table"
          onChange={renderList}
          value={search}
        />
      </div>
      {list.length === 0 && (
        <div className="text-secondary flex justify-center my-2">
          <ErrorOutlineOutlinedIcon />
          <span className="ms-2">Table has no record</span>
        </div>
      )}
      {isNotFound && (
        <div className="text-secondary flex justify-center my-2">
          <ErrorOutlineOutlinedIcon />
          <span className="ms-2">No record found</span>
        </div>
      )}
      {list.length != 0 && !isNotFound && (
        <table className="table  table-hover">
          <thead>
            <tr>
              {list.length > 0 &&
                Object.keys(list[0]).map((item) => {
                  return (
                    <th key={nanoid()} scope="col">
                      {item}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {list.map((order) => (
              <tr
                key={order.id}
                className={
                  order.status == "DELIVERED"
                    ? "table-success"
                    : order.status == "CANCELLED"
                    ? "table-danger"
                    : order.status == "IN_TRANSIT"
                    ? ""
                    : ""
                }
              >
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.totalAmount}</td>
                <td
                  className={
                    order.status == "DELIVERED"
                      ? " text-success  font-bold"
                      : order.status == "CANCELLED"
                      ? " text-danger font-bold"
                      : order.status == "IN_TRANSIT"
                      ? "font-bold text-info"
                      : ""
                  }
                >
                  {order.status}
                </td>
                <td>{order.deliveryPerson}</td>

                <td className="flex flex-col ">
                  {order.items.map((item) => (
                    <span key={item.name}>
                      {item.name} - {item.quantity} &nbsp;
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PreparedOrders;
