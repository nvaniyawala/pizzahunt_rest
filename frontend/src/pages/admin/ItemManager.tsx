import { useEffect, useState } from "react";
import ItemForm from "../../components/custom/Forms/ItemForm";
import { openModal, closeModal } from "../../features/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import PHModal from "../../components/custom/Modals/PHModal";
import PHDataTable from "../../components/custom/DataTables/PHDataTable";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints } from "../../types/enums";
import Swal from "sweetalert2";
import { ObjectFlatter } from "../../utils/utils";
import { IColumns } from "../../types/interfaces";
import AddIcon from "@mui/icons-material/Add";

const ItemManager = () => {
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
  const dispatch = useDispatch();
  const [isAdd, setisAdd] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const columns: IColumns[] = [
    { key: "categoryId_id", value: "CATEGORY_ID" },
    { key: "categoryId_isSizeVarient", value: "SIZE_VARIENT" },
    { key: "categoryId_name", value: "CATEGORY" },
    { key: "description", value: "DESCRIPTION" },
    { key: "id", value: "ID" },
    { key: "isVeg", value: "VEG" },
    { key: "itemImage", value: "IMAGE" },
    { key: "name", value: "NAME" },
    { key: "price", value: "PRICE" },
    { key: "taxSlabId_id", value: "TAX_ID" },
    { key: "taxSlabId_percentage", value: "TAX_SLAB" },
  ];
  const UpdateHook = useFetch(
    import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.UPDATE_ITEM,
    "POST"
  );
  const DisplayHook = useFetch(
    import.meta.env.VITE_MANAGEMENT_SERVICE_URI +
      ApiEndpoints.GET_ALL_ITEMS_ADMIN,
    "GET"
  );
  const DataAddHook = useFetch(
    import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.ADD_ITEM,
    "POST"
  );
  const { isOpen } = useSelector((store: RootState) => {
    return store.modal;
  });

  const [items, setItems] = useState<Item[]>([]);
  const [itemupdate, setitemupdate] = useState<Item>({});
  useEffect(() => {
    console.log("Data fetchs");
    setLatestItemData();
  }, []);
  const setLatestItemData = () => {
    DisplayHook.MakeHttpRequest().then((result) => {
      if (result.result) {
        const data = result.result.map((ot) => {
          ot.itemImage = JSON.stringify(ot.itemImage);
          const so = ObjectFlatter(ot);
          console.log(so);
          so.itemImage = JSON.parse(so.itemImage);
          return so;
        });
        setItems(data);
      }
    });
  };
  const handleAddItem = (item: any) => {
    console.log(item);
    DataAddHook.setPayload(item);
    DataAddHook.MakeHttpRequest().then((result) => {
      console.log(result);
      if (result.error || result.result.status == 0) {
        Toast.fire({
          title: "Error in inserting data !",
          icon: "error",
        });
      } else {
        Toast.fire({
          icon: "success",
          title: "Data Inserted !",
        });
        setLatestItemData();
        dispatch(closeModal());
        setisAdd(false);
      }
    });
  };

  const handleEdititem = (item) => {
    setitemupdate(item);
    setisUpdate(true);
    dispatch(openModal());
  };

  const handleUpdate = (item) => {
    UpdateHook.setPayload(item);
    UpdateHook.MakeHttpRequest(item.id).then((result) => {
      if (result.error || result.result.status == 0) {
        Toast.fire({
          title: "Error in updating data !",
          icon: "error",
        });
      } else {
        setLatestItemData();
        dispatch(closeModal());
        setisUpdate(false);
        Toast.fire({
          icon: "success",
          title: "Outlet Inserted !",
        });
      }
    });

    dispatch(closeModal());
    setisUpdate(false);
  };
  const handleDeleteitem = async (id: string) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    const response = await fetch(
      import.meta.env.VITE_MANAGEMENT_SERVICE_URI +
        ApiEndpoints.DELETE_ITEM +
        id,
      {
        method: "DELETE",
        headers: headersList,
      }
    );
    const data = await response.json();
    if (data.error != null) {
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
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container px-4 py-10">
      <div className="flex justify-between flex-wrap">
        <button
          className="btn-theme flex gap-2"
          onClick={() => {
            setisAdd(true);
            dispatch(openModal());
          }}
        >
          <AddIcon />
          Add New item
        </button>
      </div>

      {isAdd && (
        <PHModal
          isOpen={isOpen}
          onClose={() => {
            setisAdd(false);
            dispatch(closeModal());
          }}
          headingText="Add item"
          component={
            <ItemForm update={null} onEvent={handleAddItem} action="Add item" />
          }
        />
      )}

      <PHDataTable
        title="Pizza Store Items"
        data={items}
        cols={columns}
        onDelete={handleDeleteitem}
        onUpdate={handleEdititem}
      />

      {isUpdate && (
        <PHModal
          isOpen={isOpen}
          onClose={() => {
            setisUpdate(false);
            dispatch(closeModal());
          }}
          headingText="Update item"
          component={
            <ItemForm
              onEvent={handleUpdate}
              update={itemupdate}
              action="Update item"
            />
          }
        />
      )}
    </div>
  );
};

export default ItemManager;
