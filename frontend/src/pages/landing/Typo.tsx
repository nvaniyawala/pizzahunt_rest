/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
const pronouns = ["Delicious", "Tasty", "Cheesy", "Spicy", "Crispy"];
function Typo() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const [index, setIndex] = useState<number>(0);
  const timeoutRef = useRef<number>();

  // const submitForm = (data: any) => {
  //   console.log(data);
  // };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => {
        return prev === pronouns.length - 1 ? 0 : prev + 1;
      });
    }, 3000);
    return () => {
      resetTimeout();
    };
  }, [index]);
  return (
    <div className="absolute top-24 md:top-[90px] lg:top-[150px] lg:translate-x-[10%] xl:translate-x-[15%] 2xl:translate-x-[25%] home-section container mx-auto p-3 min-h-[500px] lg:min-h-[650px] overflow-hidden select-none">
      <div className="w-[80%] mx-auto px-0 md:px-6">
        <div className="landing-head text-4xl md:text-6xl lg:text-7xl text-white w-[300px] md:w-[500px] lg:w-[700px] mb-6">
          <b>
            Feeling <span className="text-ph-primary-soft">hungry !</span> Let's
            <span className="text-ph-primary-soft">&nbsp;order </span>
            <span>
              something <br />
            </span>
            <span className="relative">
              {pronouns.map((item: string, i: number) => {
                return (
                  <span
                    key={i}
                    className="text-ph-primary-soft transition-all duration-500 ease-in absolute w-fit"
                    style={{ opacity: index === i ? "1" : "0" }}
                  >
                    {item}
                  </span>
                );
              })}
            </span>
            <span className="mb-6" style={{ opacity: 0 }}>
              Delicious
            </span>
          </b>
        </div>

        {/* <form onSubmit={handleSubmit(submitForm)}>
          <div className="mt-2 flex flex-wrap justify-end md:justify-start">
            <input
              type="text"
              placeholder="Enter your delivery location"
              className="homeLocationInput"
              {...register("location", {
                required: "Enter your delivery location",
              })}
            />
            <button className="homeLocationBtn">Find food</button>
            {errors?.location && (
              <div
                className="text-red-700 bg-red-300 border-[1px] border-red-700 rounded-xl px-4 py-2 mt-1 show w-full md:w-[50%] lg:w-[60%] xl:w-[70%]"
                role="alert"
              >
                <span>{`${errors?.location.message}`}</span>
              </div>
            )}
          </div>
        </form> */}
      </div>
    </div>
  );
}

export default Typo;
