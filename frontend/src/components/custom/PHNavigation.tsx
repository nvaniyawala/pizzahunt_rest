import { TokenValidation } from "../../utils/utils";
import { Navigate } from "react-router";
import { NavigateToRoute } from "../../types/enums";

function PHNavigation() {
  const tokenValidation = TokenValidation();
  // const navigate = useNavigate();
  return (
    <>
      {!tokenValidation.isExpired && tokenValidation.role === "customer" && (
        <Navigate to={`/${NavigateToRoute.FOOD}`} />
      )}
      {!tokenValidation.isExpired &&
        tokenValidation.role === "deliveryPerson" && (
          <Navigate to={`/staff/${NavigateToRoute.DELIVERY_ORDERS}`} />
        )}
      {!tokenValidation.isExpired && tokenValidation.role === "admin" && (
        <Navigate to={"/admin/" + NavigateToRoute.ADD_DELIVERY_STAFF} />
      )}
      {!tokenValidation.isExpired && tokenValidation.role === "restaurant" && (
        <Navigate to={"/outlet/" + NavigateToRoute.ADD_DELIVERY_STAFF} />
      )}
    </>
  );
}

export default PHNavigation;
