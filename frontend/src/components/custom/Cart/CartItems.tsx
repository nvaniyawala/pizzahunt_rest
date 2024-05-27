import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  decrease,
  increase,
  removeItem,
} from "../../../features/slices/cartSlice";
import { useDispatch } from "react-redux";
function CartItems({
  item,
}: {
  item: {
    id: string;
    name: string;
    category: string;
    quantity: number;
    taxSlab: number;
    price: number;
  };
}) {
  const dispatch = useDispatch();
  return (
    <div className="item-list my-2 shadow-md rounded-md py-3 px-4">
      <div className="flex justify-between">
        <div>
          <div className="flex flex-wrap">
            <div className="item-heading text-2xl font-semibold mb-2">
              {item.name}
            </div>
            <div className="inline-block font-semibold text-sm px-2 py-1 bg-ph-yellow-soft h-fit rounded-xl mb-2 ml-3 self-center">
              {item.category}
            </div>
          </div>
          <div className="block mt-2">
            <div className="item-heading self-center me-4">
              <div>
                <span>Price: </span>
                <span className="text-green-700 font-semibold text-lg">
                  {item.price}
                  <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
                </span>{" "}
              </div>
              <div>
                <span>Tax slab: </span>
                <span className="text-green-700 font-semibold text-lg">
                  {item.taxSlab}%
                </span>{" "}
              </div>
              <div>
                <span>Payable amount: </span>
                <span className="text-green-700 font-semibold text-lg">
                  {item.price + item.price * (item.taxSlab / 100)}
                  <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
                </span>{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-col self-center">
          <div>
            <button
              className="btn-theme-filled-shadowed px-2"
              onClick={() => {
                dispatch(increase({ id: item.id }));
              }}
            >
              <AddIcon />
            </button>
            <div className="self-center inline-block mx-2">{item.quantity}</div>
            <button
              className="btn-theme-filled-shadowed px-2"
              onClick={() => {
                if (item.quantity === 1) {
                  dispatch(removeItem(item.id));
                  return;
                }
                dispatch(decrease({ id: item.id }));
              }}
            >
              <RemoveIcon />
            </button>
          </div>
          <div className="h-8"></div>
          <button
            className="self-center btn-danger-filled-shadowed mt-2 mx-auto flex rounded-full justify-center"
            onClick={() => {
              dispatch(removeItem(item.id));
            }}
          >
            <HighlightOffIcon className="mr-1" /> <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
