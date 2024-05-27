/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { IDeliveryPerson } from "../../../types/interfaces";
import { useEffect, useState } from "react";

import {
  adharValidation,
  nameValidation,
  usernameValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
  outletValidation
} from "../../../utils/ValidationRules";
import { ApiEndpoints } from "../../../types/enums";
import { useFetch } from "../../../hooks/useFetch";

const DeliveryPersonForm = ({
  onEvent,
  update,
  action,
}: {
  onEvent: (deliveryPerson: IDeliveryPerson) => void;
  update: IDeliveryPerson;
  action: string;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

const [ outlets , setoutlets] = useState([])
  const OutletsHook = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI+ ApiEndpoints.GET_ALL_OUTLETS,"GET")

  useEffect(() => {
    OutletsHook.MakeHttpRequest().then((result)=>{
      if(result.result){
      setoutlets(result.result)
      }
     })
    if (update != null) {

      setValue("aadharNumber", update.aadharNumber);
      setValue("username", update.username);
      setValue("name", update.name);
      setValue("email", update.email);
      setValue("outletId", update.outletId);
      setValue("phone_no", update.phone_no);
      setValue("password",update.password);
    
    }
  }, []);

  const onSubmit = (data: any) => {
    if (update != null) {
      data.id = update.id
    }
    console.log(data)
    onEvent(data);
    reset({
      username: "",
      name:"",
      email :"",
      aadharNumber:null,
outletId:null,
phone_no:null,
    });
  };

  const usernameRegister = register("username", usernameValidation);
  const nameRegister = register("name", nameValidation);
  const outletRegister = register("outletId", outletValidation);
  const adharRegister = register("aadharNumber", adharValidation);
  const phoneRegister = register("phone_no", phoneValidation);
  let passRegister = register("password", passwordValidation);
  if(update){
    passRegister = register("password", {required:false});
  }
  const emailRegister = register("email", emailValidation);

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
      <div className="flex flex-col mb-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...usernameRegister}
          className="ph-input-text"
        />
        <p style={{ color: "red" }}>{errors?.username && errors?.username.message}</p>
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
          {errors?.phone_no && errors?.phone_no.message}
        </p>
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="adharno">Aadhar Number</label>
        <input
          type="number"
          id="adharno"
          {...adharRegister}
          className="ph-input-text"
        />
        <p style={{ color: "red" }}>
          {errors?.aadharNumber && errors?.aadharNumber.message}
        </p>
      </div>
      <div className="flex flex-col mb-2">
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
      </div>
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
        <label htmlFor="outlet">Outlet</label>
        <select id="outlet" {...outletRegister} className="ph-select">
          {outlets.map((ot) => {
            return <option key={ot.id} value={ot.id}>{ot.name}</option>;
          })}
        </select>
        <p style={{ color: "red" }}>
          {errors?.outletId && errors?.outletId.message}
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

export default DeliveryPersonForm;
