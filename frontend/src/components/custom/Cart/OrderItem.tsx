/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICartItemState, IUser } from "../../../types/interfaces";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";
import { pincodeValidation } from "../../../utils/ValidationRules";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  ApiEndpoints,
  ConstantValues,
  NavigateToRoute,
} from "../../../types/enums";
import { ICustomerOrder } from "../../../types/interfaces";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../features/slices/modalSlice";
import { clearCart } from "../../../features/slices/cartSlice";
import { setProgress } from "../../../features/slices/loadingSlice";
import { useNavigate } from "react-router-dom";
interface IOrderItemProps {
  order: ICartItemState;
  user: IUser;
  setUserCredit?: (number) => void;
}
function OrderItem(props: IOrderItemProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addAddressRequest = useFetch(
    import.meta.env.VITE_CUSTOMER_SERVICE_URI + ApiEndpoints.ADD_USER_ADDRESS,
    "POST"
  );
  const updateAddressRequest = useFetch(
    import.meta.env.VITE_CUSTOMER_SERVICE_URI +
      ApiEndpoints.UPDATE_USER_ADDRESS,
    "POST"
  );
  const placeCustomerOrder = useFetch(
    import.meta.env.VITE_ORDER_SERVICE_URI + ApiEndpoints.ADD_ORDER,
    "POST"
  );

  const addressRegister = {
    ...register("address", {
      required: "Address is required",
      minLength: { value: 10, message: "Describe address properly" },
    }),
  };
  const pincodeRegister = { ...register("pincode", pincodeValidation) };

  // Showcasing older address values if exists
  useEffect(() => {
    if (props.user.address.length > 0) {
      setValue("address", props.user.address[0]?.address);
      setValue("pincode", props.user.address[0]?.pincode);
    }
  }, []);

  // Method which placing order along with managing customer address
  const placeOrder = (data) => {
    dispatch(setProgress(70));
    // preparing payloads
    const addressPayload: {
      address: string;
      pincode: string;
      user_id?: string;
      addressid?: string;
    } = {
      address: data.address,
      pincode: data.pincode,
    };
    const orderItem = props.order.items.map((item) => {
      return { itemId: item.id, quantity: item.quantity };
    });

    const orderPayload: ICustomerOrder = {
      items: orderItem,
      amount: (
        props.order.total + Number(ConstantValues.DELIVERY_CHARGE)
      ).toFixed(2),
      outletId: localStorage.getItem("outlet"),
      userId: localStorage.getItem("user"),
      paymentMethod: data.paymentType,
    };

    // Checking for address conditions
    if (props.user.address.length === 0) {
      addAddressRequest.setPayload({
        ...addressPayload,
        user_id: props.user.userid,
      });
      addAddressRequest
        .MakeHttpRequest()
        .then((result) => {})
        .catch((ex) => {
          console.log(ex);
          return;
        });
    } else {
      updateAddressRequest.setPayload({
        ...addressPayload,
        addressid: props.user.address[0].id,
      });
      updateAddressRequest
        .MakeHttpRequest()
        .then((result) => {
          console.log(result);
        })
        .catch((ex) => {
          console.log(ex);
          return;
        });
    }

    // Placing order api request
    placeCustomerOrder.setPayload(orderPayload);
    placeCustomerOrder
      .MakeHttpRequest()
      .then((result) => {
        console.log(result);
        if (result.result) {
          props.setUserCredit(Number(result.result?.message).toFixed(2));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your order has been placed",
            showCloseButton: false,
            timer: 1500,
          });
          dispatch(setProgress(100));
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Unable to place an order",
            showCloseButton: true,
            timer: 3000,
          });
          return;
        }
      })
      .catch((ex) => {
        console.log(ex);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Unable to place an order",
          showCloseButton: true,
          timer: 3000,
        });
      });
    dispatch(closeModal());
    dispatch(clearCart());
    localStorage.setItem("cart", JSON.stringify([]));
    navigate(`/${NavigateToRoute.ORDERED_FOODS}`);
  };

  return (
    <div>
      <small className="mt-2 bg-blue-100 px-2 py-2 block rounded-lg mb-3">
        <InfoOutlinedIcon fontSize="small" className="mb-[2px]" /> Your money
        will be deducted from your credits.
      </small>
      <form onSubmit={handleSubmit(placeOrder)}>
        <div className="input-field">
          <label htmlFor="address" className="ph-label">
            Enter your address
          </label>
          <textarea
            id="address"
            rows={3}
            placeholder="Enter address to which your food will be delivered"
            className={`peer ${
              errors?.address ? "ph-input-invalid" : "ph-input-text"
            }`}
            {...addressRegister}
          />
          {errors?.address && (
            <div className="error-message">
              <ErrorOutlineOutlinedIcon
                fontSize="small"
                style={{ margin: "3px 2px 0px 2px" }}
              />
              <p className="mb-0">{errors?.address.message}</p>
            </div>
          )}
        </div>
        <div className="input-field">
          <label htmlFor="pincode" className="ph-label">
            Enter pincode
          </label>
          <input
            id="pincode"
            type="number"
            className={`peer ${
              errors?.pincode ? "ph-input-invalid" : "ph-input-text"
            }`}
            {...pincodeRegister}
          />
          {errors?.pincode && (
            <div className="error-message">
              <ErrorOutlineOutlinedIcon
                fontSize="small"
                style={{ margin: "3px 2px 0px 2px" }}
              />
              <p className="mb-0">{errors?.pincode.message}</p>
            </div>
          )}
        </div>
        <div className="input-field">
          <label htmlFor="paymentType" className="ph-label">
            Select payment type
          </label>
          <select
            id="paymentType"
            className={`peer ${
              errors?.paymentType ? "ph-input-invalid" : "ph-input-text"
            }`}
            {...register("paymentType", {
              required: "Select payment method",
              minLength: { value: 1, message: "Select payment method" },
            })}
          >
            <option value="">--Payment method--</option>
            <option value="CASH">Cash</option>
            <option value="CREDIT">Credit</option>
          </select>
          {errors?.paymentType && (
            <div className="error-message">
              <ErrorOutlineOutlinedIcon
                fontSize="small"
                style={{ margin: "3px 2px 0px 2px" }}
              />
              <p className="mb-0">{errors?.paymentType.message}</p>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <div className="self-center">
            <small className="mr-1">Delivery charge:</small>
            <span className="font-semibold text-lg">
              {ConstantValues.DELIVERY_CHARGE} Rs.
            </span>
            <br />
            <small className="mr-1">Payable amount:</small>
            <span className="font-semibold text-lg">
              {(
                props.order.total + Number(ConstantValues.DELIVERY_CHARGE)
              ).toFixed(2)}{" "}
              Rs.
            </span>
          </div>
          <div className="flex justify-end self-center">
            <button type="submit" className="btn-theme h-fit">
              Place order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderItem;
