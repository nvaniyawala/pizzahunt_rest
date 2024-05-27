import { useEffect, useState } from "react";
import { IColumns, IDeliveryPerson } from "../../types/interfaces";
import PHModal from "../../components/custom/Modals/PHModal";
import { openModal, closeModal } from "../../features/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import PHDataTable from "../../components/custom/DataTables/PHDataTable";
import AddIcon from "@mui/icons-material/Add";
import DeliveryPersonForm from "../../components/custom/Forms/DeliveryPersonForm";
import Swal from "sweetalert2";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints, ConstantValues } from "../../types/enums";
const DeliveryStaffManager = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  const dispatch = useDispatch();
  const [isAdd, setisAdd] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const { isOpen } = useSelector((store: RootState) => {
    return store.modal;
  });

  const [deliveryPersons, setdeliveryPersons] = useState([]);
  const [deliveryPersonUpdate, setdeliveryPersonUpdate] =
    useState<IDeliveryPerson>({});

  const UpdateHook = useFetch(
    import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.UPDATE_STAFF,
    "POST"
  );
  const DisplayHook = useFetch(
    import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.GET_ALL_STAFF,
    "GET"
  );
  const DataAddHook = useFetch(
    import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.ADD_STAFF,
    "POST"
  );
  const columns: IColumns[] = [
    { key: "id", value: "ID" },
    { key: "outletId", value: "ADHAAR No." },
    { key: "outletId", value: "OUTLET" },
    { key: "username", value: "USERNAME" },
    { key: "name", value: "NAME" },
    { key: "phone_no", value: "PHONE" },
    { key: "email", value: "EMAIL" },
  ];
  useEffect(() => {
    console.log("Data fetchs");
    setLatestStaffData();
  }, []);
  const setLatestStaffData = () => {
    DisplayHook.MakeHttpRequest().then((result) => {
      if (result.result) {
        const data = result.result.map((x) => {
          const y: IDeliveryPerson = {
            id: x.id,
            aadharNumber: x.adhaarNumber,
            outletId: x.outletId.id,
            username: x.username.username,
            name: x.username.name,
            phone_no: x.username.phoneNo,
            email: x.username.email,
          };
          return y;
        });
        setdeliveryPersons(data);
      }
    });
  };
  const handleAddDeliveryPerson = (deliveryPerson: IDeliveryPerson) => {
    const tmp = deliveryPerson;
    tmp.phone_no = deliveryPerson.phone_no;
    tmp.aadharNumber = deliveryPerson.aadharNumber;
    tmp.role = "deliveryPerson";
    tmp.credits = ConstantValues.INIT_CREDIT;
    console.log(tmp);

    DataAddHook.setPayload(tmp);
    DataAddHook.MakeHttpRequest().then((result) => {
      console.log(result);
      if (result.result.status == 200) {
        Toast.fire({
          icon: "success",
          title: "Data Inserted !",
        });
        dispatch(closeModal());
        setisAdd(false);
        setLatestStaffData();
      } else {
        Toast.fire({
          title: "Error in insering Data !",
          icon: "error",
        });
      }
    });
  };

  const handleEditdeliveryPerson = (deliveryPerson: IDeliveryPerson) => {
    setdeliveryPersonUpdate(deliveryPerson);
    setisUpdate(true);
    dispatch(openModal());
  };

  const handleUpdate = (deliveryPerson: IDeliveryPerson) => {
    const tmp = deliveryPerson;
    tmp.phone_no = deliveryPerson.phone_no;
    tmp.aadharNumber = deliveryPerson.aadharNumber;
    tmp.role = "deliveryPerson";
    tmp.credits = ConstantValues.INIT_CREDIT;
    console.log(tmp);
    UpdateHook.setPayload(deliveryPerson);
    UpdateHook.MakeHttpRequest(deliveryPerson.id).then((result) => {
      if (result.error || result.result.status == 0) {
        Toast.fire({
          title: "Error in updating data !",
          icon: "error",
        });
      } else {
        Toast.fire({
          title: "Data updated !",
          icon: "success",
        });
        setLatestStaffData();
        dispatch(closeModal());
        setisUpdate(false);
      }
    });
  };
  const handleDeletedeliveryPerson = async (id: string) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    const response = await fetch(
      import.meta.env.VITE_MANAGEMENT_SERVICE_URI +
        ApiEndpoints.DELETE_STAFF +
        id,
      {
        method: "DELETE",
        headers: headersList,
      }
    );
    const data = await response.json();
    if (data.error != null || data.status == 0) {
      Toast.fire({
        icon: "error",
        title: "Internal Error!!",
      });
    } else {
      Toast.fire({
        icon: "success",
        title: "Data Deleted!!",
      });
    }
    setdeliveryPersons(
      deliveryPersons.filter((deliveryPerson) => deliveryPerson.id !== id)
    );
  };

  return (
    <div className="container px-4 py-10">
      <div className="flex justify-between flex-wrap">
        {/* <h1 className="text-3xl font-bold mb-4">Pizza Store deliveryPersons</h1> */}
        <button
          className="btn-theme flex gap-2"
          onClick={() => {
            setisAdd(true);
            dispatch(openModal());
          }}
        >
          <AddIcon /> Add delivery person
        </button>
      </div>

      {isAdd && (
        <PHModal
          isOpen={isOpen}
          onClose={() => {
            setisAdd(false);
            dispatch(closeModal());
          }}
          headingText="Add deliveryPerson"
          component={
            <DeliveryPersonForm
              update={null}
              onEvent={handleAddDeliveryPerson}
              action="Add deliveryPerson"
            />
          }
        />
      )}

      <PHDataTable
        title="Delivery Persons"
        cols={columns}
        data={deliveryPersons}
        onDelete={handleDeletedeliveryPerson}
        onUpdate={handleEditdeliveryPerson}
      />

      {isUpdate && (
        <PHModal
          isOpen={isOpen}
          onClose={() => {
            setisUpdate(false);
            dispatch(closeModal());
          }}
          headingText="Update deliveryPerson"
          component={
            <DeliveryPersonForm
              onEvent={handleUpdate}
              update={deliveryPersonUpdate}
              action="Update deliveryPerson"
            />
          }
        />
      )}
    </div>
  );
};

export default DeliveryStaffManager;
