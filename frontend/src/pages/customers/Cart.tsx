/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import CartItems from "../../components/custom/Cart/CartItems";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints, ConstantValues } from "../../types/enums";
import { IUser } from "../../types/interfaces";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { calculateTotals } from "../../features/slices/cartSlice";
import { closeModal, openModal } from "../../features/slices/modalSlice";
import PHModal from "../../components/custom/Modals/PHModal";
import OrderItem from "../../components/custom/Cart/OrderItem";
import { nanoid } from "@reduxjs/toolkit";

function Cart() {
  const { items, total, totalQuantity } = useSelector(
    (store: RootState) => store.cart
  );
  const { isOpen } = useSelector((store: RootState) => store.modal);
  const dispatch = useDispatch();
  const [user, setUser] = useState<IUser>();
  const [userCredit, setUserCredit] = useState<number>(
    ConstantValues.INIT_CREDIT
  );
  const userFetch = useFetch<IUser>(
    import.meta.env.VITE_CUSTOMER_SERVICE_URI +
      ApiEndpoints.GET_USER +
      `/${localStorage.getItem("user")}`,
    "GET",
    localStorage.getItem("token")
  );
  useEffect(() => {
    userFetch
      .MakeHttpRequest()
      .then((result) => {
        if (result.result) {
          setUser(result.result);
          setUserCredit(result.result.credits);
        }
      })
      .catch((ex) => console.error(ex));
  }, []);
  useEffect(() => {
    dispatch(calculateTotals());
  }, [items]);

  return (
    <>
      <div className="container mt-4">
        <div className="flex justify-end">
          <div className="bg-orange-100 inline-block rounded-lg px-4 py-2">
            <span className="lg">Available credits:</span>
            <span className="text-xl font-bold ml-1 text-green-700">
              {user && Number(userCredit).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="row">
          {items.length > 0 &&
            items.map(
              (i: {
                id: string;
                name: string;
                category: string;
                taxSlab: number;
                price: number;
                quantity: number;
              }) => {
                return (
                  <div key={nanoid()} className="col-md-12">
                    <CartItems item={i} />
                  </div>
                );
              }
            )}
        </div>
        {items.length > 0 ? (
          <div className="flex justify-around">
            <div className="bg-green-100 self-center px-4 py-2 rounded-lg">
              <span className="text-lg">Total: </span>
              <span className="text-xl font-bold text-green-800">
                {total.toFixed(2)}
                <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
              </span>
            </div>
            <button
              className="btn-theme-filled-shadowed flex h-fit self-center"
              onClick={() => {
                dispatch(openModal());
              }}
            >
              <CheckIcon className="self-center me-1" />{" "}
              <span className="self-center">Checkout</span>
            </button>
          </div>
        ) : (
          <div className="text-secondary flex justify-center my-2">
            <ErrorOutlineOutlinedIcon />
            <span className="ms-2">Your cart is empty</span>
          </div>
        )}
      </div>
      <PHModal
        headingText="Placing an order"
        isOpen={isOpen}
        onClose={() => {
          dispatch(closeModal());
        }}
        style={{ width: 400 }}
        component={
          <OrderItem
            order={{ items, total, totalQuantity }}
            user={user}
            setUserCredit={setUserCredit}
          />
        }
      />
    </>
  );
}

export default Cart;
