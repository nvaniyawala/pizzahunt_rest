import { useEffect, useState } from "react";
import { IItem } from "../../../types/interfaces";
import { convertByteArrayToImage } from "../../../utils/utils";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addItem } from "../../../features/slices/cartSlice";

function FoodItemCard({ data }: { data: IItem }) {
  const [imageUri, setImageUri] = useState("");
  useEffect(() => {
    convertByteArrayToImage(data.itemImage)
      .then((result: string) => {
        setImageUri(result);
      })
      .catch((ex) => console.log(ex));
  }, [data]);
  const dispatch = useDispatch();
  const addToCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart && cart.length > 0) {
      const cartData = JSON.parse(localStorage.getItem("cart"));
      const isItemExistInCart = cartData.find((item) => item.id === data.id);
      if (!isItemExistInCart) {
        const newData = [
          ...cartData,
          {
            id: data.id,
            name: data.name,
            category: data.categoryId.name,
            taxSlab: data.taxSlabId.percentage,
            price: data.price,
            quantity: 1,
          },
        ];
        localStorage.setItem("cart", JSON.stringify(newData));
        dispatch(addItem(JSON.parse(localStorage.getItem("cart"))));
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Added ${data.name} to cart.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#ffedd5",
          iconColor: "#2b2f2d",
        });

        Toast.fire({
          icon: "info",
          title: "You already had this item in cart",
        });
      }
    } else {
      const newData = [
        {
          id: data.id,
          name: data.name,
          category: data.categoryId.name,
          taxSlab: data.taxSlabId.percentage,
          price: data.price,
          quantity: 1,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(newData));
      dispatch(addItem(JSON.parse(localStorage.getItem("cart"))));
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Added ${data.name} to cart.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="card my-2" style={{ border: 0 }}>
        <img src={imageUri} className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title flex justify-between">
            {data.name}
            <span className="font-semibold text-sm px-2 py-1 h-fit bg-ph-yellow-soft rounded-xl">
              {data.categoryId.name}
            </span>
          </h5>
          <div className="card-text">
            <div className="Description">{data.description}</div>
            <div className="mt-2">
              <div className="font-semibold text-green-700">
                <div className="inline-block bg-green-100 py-1 px-2 rounded-lg">
                  <span className="text-xl">{data.price}</span>
                  <CurrencyRupeeIcon
                    className="mb-1"
                    style={{ fontSize: "14px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button className="btn-theme-filled-shadowed" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FoodItemCard;
