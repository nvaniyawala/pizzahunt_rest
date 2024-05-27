/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";

const images = [
  `bg-[url('./src/assets/pizza0.jpg')]`,
  `bg-[url('./src/assets/pizza1.jpg')]`,
  `bg-[url('./src/assets/pizza2.jpg')]`,
];
function BlendedCarousal() {
  const [index, setIndex] = useState<number>(0);
  const timeoutRef = useRef<number>();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => {
        return prev === images.length - 1 ? 0 : prev + 1;
      });
    }, 8000);
    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="absolute top-0 carousel -z-10">
      {images.map((item: string, i: number) => {
        return (
          <div
            key={i}
            className={`carousal-slide ${item}`}
            style={{ opacity: index === i ? "1" : "0" }}
          ></div>
        );
      })}
      <div className="absoulte top-0 bg-[rgba(0,0,0,.6)] w-full min-h-[350px] md:min-h-[400px] lg:min-h-[500px] mix-blend-darken"></div>
    </div>
  );
}

export default BlendedCarousal;
