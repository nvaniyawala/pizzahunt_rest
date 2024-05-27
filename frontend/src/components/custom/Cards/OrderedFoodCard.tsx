import { IOrderHistory } from "../../../types/interfaces";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BusinessIcon from "@mui/icons-material/Business";
import { nanoid } from "@reduxjs/toolkit";
interface HistoryItem {
  name: string;
  price: number;
  quantity: number;
  tax: number;
}
function OrderedFoodCard(props: IOrderHistory) {
  return (
    <div>
      <div className="card my-2" style={{ border: 0 }}>
        <div className="card-body">
          <h5 className="card-title flex justify-between">
            {props.orderStatus === "PREPARING" && (
              <span className="text-ph-primary">{props.orderStatus}</span>
            )}
            {props.orderStatus === "DELIVERED" && (
              <span className="text-blue-600">{props.orderStatus}</span>
            )}
            {props.orderStatus === "IN_TRANSIT" && (
              <span className="text-green-600">{props.orderStatus}</span>
            )}
            {props.orderStatus === "CANCELLED" && (
              <span className="text-red-500">{props.orderStatus}</span>
            )}
          </h5>
          <small className="mt-1 mb-2">{props.orderDate}</small>
          <div className="card-text">
            <div className="flex justify-between">
              <div className="font-bold">Items</div>
              <div className="flex gap-3 font-bold">
                <span>Price</span>
                <span>tax</span>
              </div>
            </div>
            {props.items.map((i: HistoryItem) => {
              return (
                <div key={nanoid()} className="flex justify-between">
                  <div>
                    <span className="font-semibold mr-2">{i.name}</span>
                    <span>({i.quantity})</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold text-green-700">
                      {i.price} * {i.quantity}
                    </span>
                    <span className="font-semibold text-orange-800">
                      {i.tax}%
                    </span>
                  </div>
                </div>
              );
            })}
            <hr />
            <div className="flex justify-between">
              <div>
                <div>Total</div>
                <div>Delivery charge</div>
                <div>Payable</div>
              </div>
              <div>
                <div className="text-green-700 font-semibold">
                  {props.amount} Rs.
                </div>
                <div className="text-green-700 font-semibold">25 Rs.</div>
                <div className="text-green-700 font-semibold">
                  {props.payableAmount} Rs.
                </div>
              </div>
            </div>
            <hr />
            {props.deliveryPersonId && (
              <>
                <div className="sub-card">
                  <h5 className="mb-2">Delivery person</h5>
                  <div className="content">
                    <div>
                      <DeliveryDiningIcon />
                      <span className="ml-2">
                        {props.deliveryPersonId.name}
                      </span>
                    </div>
                    <div>
                      <LocalPhoneIcon />
                      <span className="ml-2">
                        {props.deliveryPersonId.phoneNo}
                      </span>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            )}
            <div className="sub-card">
              <h5 className="mb-2">Outlet</h5>
              <div className="content">
                <div>
                  <StorefrontIcon />
                  <span className="ml-2">{props.outletId.name}</span>
                </div>
                <div>
                  <LocalPhoneIcon />
                  <span className="ml-2">{props.outletId.phoneNo}</span>
                </div>
                <div>
                  <BusinessIcon />
                  <span className="ml-2">
                    {props.outletId.address},{props.outletId.pincode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderedFoodCard;
