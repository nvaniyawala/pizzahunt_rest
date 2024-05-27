/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { IOutlet } from "../../../types/interfaces";
import { useEffect } from "react";

import {
  addressValidation,
  emailValidation,
  latitudeValidation,
  longitudeValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  pincodeValidation,
  usernameValidation,
} from "../../../utils/ValidationRules";

const OutletForm = ({
  onAdd,
  update,
  action,
  isUpdating
}: {
  onAdd: (outlet: IOutlet) => void;
  update: IOutlet;
  action: string;
  isUpdating: boolean
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (update != null) {

      setValue("address", update.address);
      setValue("username", update.username);
      setValue("name", update.name);
      setValue("email", update.email);
      setValue("latitude", update.latitude);
      setValue("longitude", update.longitude);
      setValue("phoneNo", update.phoneNo);
      setValue("pincode", update.pincode);
      setValue("password",update.password);

    }
  }, []);

  const onSubmit = (data: any) => {
    if(update!=null){
      data.id = update.id
    }
    onAdd(data);
    reset({
      address: "",
      username: "",
      name:"",
      email :"",
      latitude: null,
      longitude: null,
      pincode: null,
      phoneno: null,
    });
  };
  let usernameRegister = register("username", usernameValidation);

  const nameRegister = register("name", nameValidation);
  const addressRegister = register("address", addressValidation);
  const phoneRegister = register("phoneNo", phoneValidation);
  const pincodeRegister = register("pincode", pincodeValidation);
  const longitudeRegister = register("longitude", longitudeValidation);
  const latitudeRegister = register("latitude", latitudeValidation);
  let emailRegister = register("email", emailValidation);

  let passRegister = register("password", passwordValidation);
  if(update){
    passRegister = register("password", {required:false});
    emailRegister= register("email", {required:false});
    usernameRegister = register("username" , {required:false})

  }

  return (
    <form
  
      onSubmit={handleSubmit(onSubmit)}
    >
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
      { !isUpdating && <div className="flex flex-col mb-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...usernameRegister}
          className="ph-input-text"
        />
        <p style={{ color: "red" }}>{errors?.username && errors?.username.message}</p>
      </div>}
      {!isUpdating && <div className="flex flex-col mb-2">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...emailRegister}
          className="ph-input-text"
        />
        <p style={{ color: "red" }}>
          {errors?.email && errors?.email.message}
        </p>
      </div>}
      <div className="flex flex-col mb-2">
    <label htmlFor="password" hidden={update!=null}>Password</label>
    <input
      type="text"
      id="password"
      {...passRegister}
      className="ph-input-text"
      hidden={update!=null}
    />
    <p style={{ color: "red" }} hidden={update!=null}>
      {errors?.password && errors?.password.message}
    </p>
  </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          {...addressRegister}
          className="ph-input-text"
        />
        <p style={{ color: "red" }}>
          {errors?.address && errors?.address.message}
        </p>
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="phoneno">Phone Number</label>
        <input
          type="number"
          id="phoneno"
          {...phoneRegister}
          className="ph-input-text"
        />
        <p style={{ color: "red" }}>
          {errors?.phoneNo && errors?.phoneNo.message}
        </p>
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="latitude">Latitude</label>
        <input
          type="text"
          id="latitude"
          {...latitudeRegister}
          className="ph-input-text"
        />
        <p style={{ color: "red" }}>
          {errors?.latitude && errors?.latitude.message}
        </p>
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          id="longitude"
          {...longitudeRegister}
          className="ph-input-text"
        />
        <p style={{ color: "red" }}>
          {errors?.longitude && errors?.longitude.message}
        </p>
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="pincode">Pincode</label>
        <input
          type="number"
          id="pincode"
          {...pincodeRegister}
          className="ph-input-text"
        />
        <p style={{ color: "red" }}>
          {errors?.pincode && errors?.pincode.message}
        </p>
      </div>
      <button
        type="submit"
        className="btn-theme"
      >
        {action}
      </button>
    </form>
  );
};

export default OutletForm;
