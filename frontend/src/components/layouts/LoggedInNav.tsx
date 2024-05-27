import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ApiEndpoints, NavigateToRoute } from "../../types/enums";
// import SearchIcon from "@mui/icons-material/Search";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { useFetch } from "../../hooks/useFetch";
import { IUser } from "../../types/interfaces";
import { clearCart } from "../../features/slices/cartSlice";
import { useDispatch } from "react-redux";
import { TokenValidation } from "../../utils/utils";

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import GradingIcon from "@mui/icons-material/Grading";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
// import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

function LoggedInNav() {
  const navList = useRef<HTMLUListElement>(null);
  const HamBurger = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [currentDeliveryPerson, setCurrentDeliveryPerson] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = TokenValidation();
  const { MakeHttpRequest } = useFetch(
    import.meta.env.VITE_CUSTOMER_SERVICE_URI +
      ApiEndpoints.GET_USER +
      `/${localStorage.getItem("user")}`,
    "GET",
    localStorage.getItem("token")
  );
  const getDeliveryPerson = useFetch(
    import.meta.env.VITE_MANAGEMENT_SERVICE_URI +
      ApiEndpoints.GET_DELIVERY_PERSON_BY_ID +
      `/${localStorage.getItem("user")}`,
    "GET",
    localStorage.getItem("token")
  );
  useEffect(() => {
    if (role == "deliveryPerson") {
      getDeliveryPerson
        .MakeHttpRequest()
        .then((result) => {
          if (result.result) {
            setCurrentDeliveryPerson(result.result);
          } else {
            console.log("No delivery person found");
          }
        })
        .catch((ex) => console.log(ex));
    } else {
      MakeHttpRequest()
        .then((result) => {
          if (result.result) {
            setCurrentUser(result.result);
          }
        })
        .catch((ex) => console.log(ex));
    }
  }, []);
  const checkSize = () => {
    if (window.innerWidth >= 768) {
      navList.current?.classList.add("nav-list");
      navList.current?.classList.remove("nav-mobile-list");
    } else {
      navList.current?.classList.add("nav-mobile-list");
      navList.current?.classList.remove("nav-list");
    }
  };
  const toggleHam = () => {
    HamBurger.current?.classList.toggle("ham-active");
    if (navList.current?.classList.contains("nav-mobile-list")) {
      navList.current?.classList.toggle("left-full");
    }
  };

  const logOut = () => {
    dispatch(clearCart());
    localStorage.clear();
    navigate(NavigateToRoute.HOME);
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);
  return (
    <nav className="navbar py-0 z-10" style={{ position: "sticky", top: 0 }}>
      <div className="container d-flex justify-content-start">
        <div className="self-center">
          <img
            src="/src/assets/icon_name_logo.svg"
            alt="no svg found"
            className="w-[60%] md:w-2/3"
          />
        </div>
        <ul
          className={
            window.innerWidth >= 768
              ? "nav-list ms-auto left-full"
              : "nav-mobile-list left-full"
          }
          ref={navList}
        >
          {role === "admin" && (
            <>
              <li className="nav-list-items">
                {" "}
                <NavLink
                  className={`link-a font-semibold`}
                  to={NavigateToRoute.ADD_DELIVERY_STAFF}
                  onClick={toggleHam}
                  style={({ isActive }) => {
                    return isActive
                      ? {
                          backgroundColor: "#E1701A",
                          color: "white",
                          TextDecoration: "none",
                        }
                      : {
                          TextDecoration: "none",
                        };
                  }}
                >
                  <PeopleOutlineIcon style={{ marginBottom: "2px" }} /> Staff
                </NavLink>
              </li>
              <li className="nav-list-items">
                {" "}
                <NavLink
                  className={`link-a font-semibold`}
                  to={NavigateToRoute.ADD_ITEM}
                  onClick={toggleHam}
                  style={({ isActive }) => {
                    return isActive
                      ? {
                          backgroundColor: "#E1701A",
                          color: "white",
                          TextDecoration: "none",
                        }
                      : {
                          TextDecoration: "none",
                        };
                  }}
                >
                  <CategoryOutlinedIcon style={{ marginBottom: "2px" }} /> Items
                </NavLink>
              </li>
              <li className="nav-list-items">
                {" "}
                <NavLink
                  className={`link-a font-semibold`}
                  to={NavigateToRoute.ADD_OUTLET}
                  onClick={toggleHam}
                  style={({ isActive }) => {
                    return isActive
                      ? {
                          backgroundColor: "#E1701A",
                          color: "white",
                          TextDecoration: "none",
                        }
                      : {
                          TextDecoration: "none",
                        };
                  }}
                >
                  <StoreOutlinedIcon style={{ marginBottom: "2px" }} /> Outlets
                </NavLink>
              </li>
            </>
          )}

          {role == "deliveryPerson" && (
            <>
              <li className="nav-list-items">
                {" "}
                <NavLink
                  className={`link-a font-semibold`}
                  to={NavigateToRoute.DELIVERY_ORDERS}
                  onClick={toggleHam}
                  style={({ isActive }) => {
                    return isActive
                      ? {
                          backgroundColor: "#E1701A",
                          color: "white",
                          TextDecoration: "none",
                        }
                      : {
                          TextDecoration: "none",
                        };
                  }}
                >
                  <GradingIcon style={{ marginBottom: "2px" }} /> Orders
                </NavLink>
              </li>
              <li className="nav-list-items">
                {" "}
                <NavLink
                  className={`link-a font-semibold`}
                  to={NavigateToRoute.DELIVERY_COMPLETED}
                  onClick={toggleHam}
                  style={({ isActive }) => {
                    return isActive
                      ? {
                          backgroundColor: "#E1701A",
                          color: "white",
                          TextDecoration: "none",
                        }
                      : {
                          TextDecoration: "none",
                        };
                  }}
                >
                  <AssignmentTurnedInOutlinedIcon
                    style={{ marginBottom: "2px" }}
                  />{" "}
                  Delivered
                </NavLink>
              </li>
            </>
          )}

          {role == "restaurant" && (
            <>
              <li className="nav-list-items">
                {" "}
                <NavLink
                  className={`link-a font-semibold`}
                  to={NavigateToRoute.ADD_DELIVERY_STAFF}
                  onClick={toggleHam}
                  style={({ isActive }) => {
                    return isActive
                      ? {
                          backgroundColor: "#E1701A",
                          color: "white",
                          TextDecoration: "none",
                        }
                      : {
                          TextDecoration: "none",
                        };
                  }}
                >
                  <PeopleOutlineIcon style={{ marginBottom: "2px" }} /> Add
                  staff
                </NavLink>
              </li>
              <li className="nav-list-items">
                {" "}
                <NavLink
                  className={`link-a font-semibold`}
                  to={NavigateToRoute.ORDER_P}
                  onClick={toggleHam}
                  style={({ isActive }) => {
                    return isActive
                      ? {
                          backgroundColor: "#E1701A",
                          color: "white",
                          TextDecoration: "none",
                        }
                      : {
                          TextDecoration: "none",
                        };
                  }}
                >
                  <InventoryOutlinedIcon style={{ marginBottom: "2px" }} />{" "}
                  Placed
                </NavLink>
              </li>
              <li className="nav-list-items">
                {" "}
                <NavLink
                  className={`link-a font-semibold`}
                  to={NavigateToRoute.ORDER_PRE}
                  onClick={toggleHam}
                  style={({ isActive }) => {
                    return isActive
                      ? {
                          backgroundColor: "#E1701A",
                          color: "white",
                          TextDecoration: "none",
                        }
                      : {
                          TextDecoration: "none",
                        };
                  }}
                >
                  <CheckCircleOutlineOutlinedIcon
                    style={{ marginBottom: "2px" }}
                  />{" "}
                  Prepared
                </NavLink>
              </li>
            </>
          )}

          {role == "customer" && (
            <>
              <li className="nav-list-items">
                {" "}
                <NavLink
                  className={`link-a font-semibold`}
                  to={NavigateToRoute.FOOD}
                  onClick={toggleHam}
                  style={({ isActive }) => {
                    return isActive
                      ? {
                          backgroundColor: "#E1701A",
                          color: "white",
                          TextDecoration: "none",
                        }
                      : {
                          TextDecoration: "none",
                        };
                  }}
                >
                  <LocalPizzaIcon style={{ marginBottom: "2px" }} /> Menu
                </NavLink>
              </li>
              {/* <li className="nav-list-items">
            {" "}
            <NavLink
              className={`link-a font-semibold`}
              to={NavigateToRoute.SEARCH_FOOD}
              onClick={toggleHam}
              style={({ isActive }) => {
                return isActive
                  ? {
                      backgroundColor: "#E1701A",
                      color: "white",
                      TextDecoration: "none",
                    }
                  : {
                      TextDecoration: "none",
                    };
              }}
            >
              <SearchIcon style={{ marginBottom: "2px" }} /> Search
            </NavLink>
          </li> */}
              <li className="nav-list-items">
                <NavLink
                  className={`link-a font-semibold`}
                  to={NavigateToRoute.CART}
                  onClick={toggleHam}
                  style={({ isActive }) => {
                    return isActive
                      ? {
                          backgroundColor: "#E1701A",
                          color: "white",
                          TextDecoration: "none",
                        }
                      : {
                          TextDecoration: "none",
                        };
                  }}
                >
                  <ShoppingCartOutlinedIcon /> Cart
                </NavLink>
              </li>
              <li className="nav-list-items">
                <NavLink
                  className={`link-a font-semibold`}
                  to={NavigateToRoute.ORDERED_FOODS}
                  onClick={toggleHam}
                  style={({ isActive }) => {
                    return isActive
                      ? {
                          backgroundColor: "#E1701A",
                          color: "white",
                          TextDecoration: "none",
                        }
                      : {
                          TextDecoration: "none",
                        };
                  }}
                >
                  <ReceiptLongIcon /> Orders
                </NavLink>
              </li>
            </>
          )}
          <li className="nav-list-items self-center">
            {/* <NavLink
              className={`link-a font-semibold`}
              to={NavigateToRoute.USER_PROFILE}
              onClick={toggleHam}
              style={({ isActive }) => {
                return isActive
                  ? {
                      backgroundColor: "#E1701A",
                      color: "white",
                      TextDecoration: "none",
                    }
                  : {
                      TextDecoration: "none",
                    };
              }}
            >
              <AccountCircleOutlinedIcon style={{ marginBottom: "2px" }} />{" "}
              {currentUser?.name}
            </NavLink> */}
            <div className="text-lg font-semibold bg-slate-300 px-4 py-2 rounded-full mx-2">
              <AccountCircleOutlinedIcon style={{ marginBottom: "2px" }} />{" "}
              {role === "deliveryPerson"
                ? currentDeliveryPerson?.username?.name
                : currentUser?.name}
            </div>
          </li>

          <li className="md:hidden">
            <button className="btn-theme my-3" onClick={logOut}>
              Logout
            </button>
          </li>
        </ul>
        <div className="hidden md:flex">
          {/* Hardcoded for now */}
          {/* <div className="self-center mx-2 font-semibold ">
            {localStorage.getItem("user")}
          </div> */}
          <button className="btn-theme-outlined" onClick={logOut}>
            <LogoutOutlinedIcon /> Logout
          </button>
        </div>
        <div ref={HamBurger} className="hamburger ms-auto" onClick={toggleHam}>
          <hr className="slice" />
          <hr className="slice" />
          <hr className="slice" />
        </div>
      </div>
    </nav>
  );
}

export default LoggedInNav;
