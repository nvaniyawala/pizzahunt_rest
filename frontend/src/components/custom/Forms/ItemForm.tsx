/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  nameValidation,
  CategoryValidation,
  DescriptionValidation,
  taxslabValidation,
  priceValidation,
  imgValidation,
  is_vegValidation,
} from "../../../utils/ValidationRules";
import { useFetch } from "../../../hooks/useFetch";
import { ApiEndpoints } from "../../../types/enums";
import { convertImageToBlob } from "../../../utils/utils";

const ItemForm = ({
  onEvent,
  update,
  action,
}: {
  onEvent: (item: any) => void;
  update: any;
  action: string;
}) => {
  const [categories, setcategories] = useState([]);
  const [taxSlabs, settaxSlabs] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const CategoryHook = useFetch(
    import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.GET_CATEGORY,
    "GET"
  );
  const TaxSlabHook = useFetch(
    import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.GET_TAX_SLAB,
    "GET"
  );
  useEffect(() => {
    CategoryHook.MakeHttpRequest().then((result) => {
      if (result.result) {
        setcategories(result.result);
      } else {
        console.log(result.error);
      }
    });
    TaxSlabHook.MakeHttpRequest().then((result) => {
      if (result.result) {
        settaxSlabs(result.result);
      } else {
        console.log(result.error);
      }
    });

    if (update != null) {
      setValue("price", update.price);
      setValue("name", update.name);
      setValue("categoryId", update.category_id);
      setValue("description", update.description);
      setValue("itemImage", update.img);
      setValue("isVeg", update.is_veg);
      setValue("taxSlabId", update.tax_slab_id);
    }
  }, []);

 
  const onSubmit = async (data: any) => {
    const blob = await convertImageToBlob(data.itemImage[0]);
    data.itemImage = blob;
    data.price = ""+data.price;
    data.isVeg == 1 ? (data.isVeg = true) : (data.isVeg = false);
    console.log(data, "After ");
    if (update != null) {
      data.id = update.id;
    }
    onEvent(data);
    reset({
      price: "",
      name: "",
      categoryId: null,
      description: "",
      itemImage: null,
      isVeg: null,
      taxSlabId: null,
    });
  };

  const nameRegister = register("name", nameValidation);
  const priceRegister = register("price", priceValidation);
  const categoryRegister = register("categoryId", CategoryValidation);
  const descriptionRegister = register("description", DescriptionValidation);
  const imgRegister = register("itemImage", imgValidation);
  const isVegRegister = register("isVeg", is_vegValidation);
  const taxslabRegister = register("taxSlabId", taxslabValidation);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <h3 className="text-xl font-bold mb-4">{action}</h3> */}
      <div className="flex flex-col mb-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...nameRegister}
          className="ph-input-text"
        />
        <p style={{ color: "red" }}>{errors?.name && errors?.name.message}</p>
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="category">Category</label>
        <select id="category" {...categoryRegister} className="ph-select">
          {categories.map((cat) => {
            return <option value={cat.id}>{cat.name}</option>;
          })}
        </select>
        <p style={{ color: "red" }}>
          {errors?.categoryId && errors?.categoryId.message}
        </p>
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...descriptionRegister}
          className="ph-input-text"
        />
        <p style={{ color: "red" }}>
          {errors?.description && errors?.description.message}
        </p>
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="taxslab">Tax Slab</label>
        <select id="taxslab" {...taxslabRegister} className="ph-select">
          {taxSlabs.map((tax) => {
            return <option key={tax.id} value={tax.id}>{tax.percentage}</option>;
          })}
        </select>
        <p style={{ color: "red" }}>
          {errors?.taxSlabId && errors?.taxSlabId.message}
        </p>
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          {...priceRegister}
          className="ph-input-text"
        />
        <p style={{ color: "red" }}>{errors?.price && errors?.price.message}</p>
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="img" className="form-label">
          Item Image
        </label>
        <input
          type="file"
          className="form-control"
          id="img"
          accept="image/*"
          {...imgRegister}
        />
        <p style={{ color: "red" }}>
          {errors?.itemImage && errors?.itemImage.message}
        </p>
      </div>
      <div className="flex flex-col mb-2">
        <label>Is veg</label>
        <div className="flex justify-start flex-wrap">
          <div className="form-check flex items-center mx-2">
            <input
              id="radio-1"
              {...isVegRegister}
              type="radio"
              value={1}
              name="isVeg"
              className=" form-check-input"
            />
            <label
              htmlFor="radio-1"
              className="form-check-label ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
            >
              Yes
            </label>
          </div>
          <div className="form-check flex items-center mx-2">
            <input
              id="radio-2"
              {...isVegRegister}
              type="radio"
              value={0}
              name="isVeg"
              className="h-4 form-check-input"
            />
            <label
              htmlFor="radio-2"
              className=" form-check-label ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
            >
              No
            </label>
          </div>
        </div>
        <p style={{ color: "red" }}>{errors?.isVeg && errors?.isVeg.message}</p>
      </div>
      <button type="submit" className="btn-theme">
        {action}
      </button>
    </form>
  );
};

export default ItemForm;
