import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import truncateString from "../../../shared/utils/truncate";
import { LoadingSpinner } from "../../../shared/components/loading-spinner";

const OurMarket = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [market, setMarket] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_MYSQL_ENDPOINT}/get-all-market`
        );

        if (!response.ok) throw new Error("Failed to fetch market data");

        const data = await response.json();

        setMarket(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarket();
  }, []);

  return (
    <>
      {market ? (
        <div
          className={
            "w-full px-4 py-6 md:px-6 md:py-10 lg:px-8 lg:py-20 mx-auto text-center overflow-hidden"
          }
        >
          <motion.h1
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },
              show: {
                y: 0,
                opacity: 1,
                transition: {
                  type: "keyframes",
                  duration: 0.2,
                  delay: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.6 }}
            className={
              "mb-6 text-xl md:text-4xl lg:text-6xl transition-all ease-in-out duration-500 uppercase font-semibold md:font-bold text-[#272c63] tracking-widest title-font"
            }
          >
            our market
          </motion.h1>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div
              className={
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center"
              }
            >
              {market[0] && (
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: -100,
                    },
                    show: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        type: "keyframes",
                        duration: 0.2,
                        delay: 0.2,
                      },
                    },
                  }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.25 }}
                  className={
                    "z-0 relative w-full  h-[540px] cursor-pointer grayscale hover:grayscale-0 duration-500 transition-all object-cover ease-in-out overflow-hidden group rounded-tl-[50px] rounded-br-[50px] hover:rounded-tl-none hover:rounded-br-none hover:rounded-bl-[50px] hover:rounded-tr-[50px]"
                  }
                >
                  {market && market[0] && (
                    <img
                      src={market[0]?.cover}
                      alt={"cover"}
                      className={
                        "w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
                      }
                    />
                  )}
                  <div>
                    {market && market[0] && (
                      <h1
                        className={
                          "capitalize bg-white text-slate-900 absolute mt-6 mr-4 px-6 tracking-widest py-4 font-medium text-xl transition-all duration-500 ease-in-out rounded-tr-full rounded-br-full"
                        }
                      >
                        {market[0]?.location}
                      </h1>
                    )}
                  </div>
                  <div
                    className={
                      "absolute text-left text-white p-8 -bottom-[130px] md:-bottom-[100px] lg:-bottom[150px] group-hover:bottom-16 transition-all duration-500 ease-in-out"
                    }
                  >
                    {market && market[0] && (
                      <p className={"text-md mt-2"}>
                        {truncateString(market[0]?.description, 150)}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {market[1] && (
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: -100,
                    },
                    show: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        type: "keyframes",
                        duration: 0.2,
                        delay: 0.3,
                      },
                    },
                  }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.25 }}
                  className={
                    "z-0 relative w-full  h-[540px] cursor-pointer grayscale hover:grayscale-0 duration-500 transition-all object-cover ease-in-out overflow-hidden group rounded-tl-[50px] rounded-br-[50px] hover:rounded-tl-none hover:rounded-br-none hover:rounded-bl-[50px] hover:rounded-tr-[50px]"
                  }
                >
                  {market && market[1] && (
                    <img
                      src={market[1]?.cover}
                      alt={"cover"}
                      className={
                        "w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
                      }
                    />
                  )}
                  <div>
                    {market && market[1] && (
                      <h1
                        className={
                          "capitalize bg-white text-slate-900 absolute mt-6 mr-4 px-6 tracking-widest py-4 font-medium text-xl transition-all duration-500 ease-in-out rounded-tr-full rounded-br-full"
                        }
                      >
                        {market[1]?.location}
                      </h1>
                    )}
                  </div>
                  <div
                    className={
                      "absolute text-left text-white p-8 -bottom-[130px] md:-bottom-[100px] lg:-bottom[150px] group-hover:bottom-16 transition-all duration-500 ease-in-out"
                    }
                  >
                    {market && market[1] && (
                      <p className={"text-md mt-2"}>
                        {truncateString(market[1]?.description, 150)}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {market[2] && (
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: -100,
                    },
                    show: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        type: "keyframes",
                        duration: 0.2,
                        delay: 0.4,
                      },
                    },
                  }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.25 }}
                  className={
                    "z-0 relative w-full  h-[540px] cursor-pointer grayscale hover:grayscale-0 duration-500 transition-all object-cover ease-in-out overflow-hidden group rounded-tl-[50px] rounded-br-[50px] hover:rounded-tl-none hover:rounded-br-none hover:rounded-bl-[50px] hover:rounded-tr-[50px]"
                  }
                >
                  {market && market[2] && (
                    <img
                      src={market[2]?.cover}
                      alt={"cover"}
                      className={
                        "w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
                      }
                    />
                  )}
                  <div>
                    {market && market[0] && (
                      <h1
                        className={
                          "capitalize bg-white text-slate-900 absolute mt-6 mr-4 px-6 tracking-widest py-4 font-medium text-xl transition-all duration-500 ease-in-out rounded-tr-full rounded-br-full"
                        }
                      >
                        {market[2]?.location}
                      </h1>
                    )}
                  </div>
                  <div
                    className={
                      "absolute text-left text-white p-8 -bottom-[130px] md:-bottom-[100px] lg:-bottom[150px] group-hover:bottom-16 transition-all duration-500 ease-in-out"
                    }
                  >
                    {market && market[0] && (
                      <p className={"text-md mt-2"}>
                        {truncateString(market[2]?.description, 150)}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {market[3] && (
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: -100,
                    },
                    show: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        type: "keyframes",
                        duration: 0.2,
                        delay: 0.5,
                      },
                    },
                  }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.25 }}
                  className={
                    "z-0 relative w-full h-[540px] cursor-pointer grayscale hover:grayscale-0 duration-500 transition-all object-cover ease-in-out overflow-hidden group rounded-tl-[50px] rounded-br-[50px] hover:rounded-tl-none hover:rounded-br-none hover:rounded-bl-[50px] hover:rounded-tr-[50px]"
                  }
                >
                  {market && market[3] && (
                    <img
                      src={market[3]?.cover}
                      alt={"cover"}
                      className={
                        "w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
                      }
                    />
                  )}
                  <div>
                    {market && market[3] && (
                      <h1
                        className={
                          "capitalize bg-white text-slate-900 absolute mt-6 mr-4 px-6 tracking-widest py-4 font-medium text-xl transition-all duration-500 ease-in-out rounded-tr-full rounded-br-full"
                        }
                      >
                        {market[3]?.location}
                      </h1>
                    )}
                  </div>
                  <div
                    className={
                      "absolute text-left text-white p-8 -bottom-[130px] md:-bottom-[100px] lg:-bottom[150px] group-hover:bottom-16 transition-all duration-500 ease-in-out"
                    }
                  >
                    {market && market[3] && (
                      <p className={"text-md mt-2"}>
                        {truncateString(market[3]?.description, 150)}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default OurMarket;
