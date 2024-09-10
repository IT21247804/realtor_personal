import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import truncateString from "../../../shared/utils/truncate";
import { LoadingSpinner } from "../../../shared/components/loading-spinner";
import { Link } from "react-router-dom";

const SignatureProperties = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signatureData, setSignatureData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_MYSQL_ENDPOINT}/get-signature-property`
        );

        if (!response.ok) throw new Error("Failed to fetch market data");

        const data = await response.json();

        setSignatureData(data);
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
      {signatureData ? (
        <>
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
              signature collection
            </motion.h1>

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div
                className={
                  "grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-center"
                }
              >
                {signatureData[0] && (
                  <Link
                    to={`/signature-collection/${
                      signatureData && signatureData[0]?.id
                    }`}
                  >
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
                        "z-30 relative w-full  h-[540px] cursor-pointer grayscale hover:grayscale-0 duration-500 transition-all bg-cover ease-in-out overflow-hidden group rounded-tl-[50px] rounded-br-[50px] hover:rounded-tl-none hover:rounded-br-none hover:rounded-bl-[50px] hover:rounded-tr-[50px]"
                      }
                    >
                      {signatureData && signatureData[0] && (
                        <img
                          src={signatureData[0]?.cover}
                          alt={"cover"}
                          className={
                            "w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
                          }
                        />
                      )}

                      {signatureData && signatureData[0] && (
                        <h1
                          className={
                            "capitalize absolute mt-6 mr-4 text-white font-medium text-xl -right-[150px] group-hover:right-8 transition-all duration-500 ease-in-out"
                          }
                        >
                          {signatureData[0]?.propertyType}
                        </h1>
                      )}
                      <div
                        className={
                          "absolute text-left text-white p-8 -bottom-[130px] md:-bottom-[100px] lg:-bottom[150px] group-hover:bottom-3 transition-all duration-500 ease-in-out"
                        }
                      >
                        {signatureData && signatureData[0] && (
                          <h1 className={"capitalize text-3xl mb-4 title-font"}>
                            {signatureData[0]?.propertyType}
                          </h1>
                        )}

                        {signatureData && signatureData[0] && (
                          <p className={"text-md mt-2"}>
                            {truncateString(signatureData[0]?.description, 150)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                )}
                {signatureData[1] && (
                  <Link
                    to={`/signature-collection/${
                      signatureData && signatureData[1]?.id
                    }`}
                  >
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
                        "z-30 relative w-full  h-[540px] cursor-pointer grayscale hover:grayscale-0 duration-500 transition-all bg-cover ease-in-out overflow-hidden group rounded-tl-[50px] rounded-br-[50px] hover:rounded-tl-none hover:rounded-br-none hover:rounded-bl-[50px] hover:rounded-tr-[50px]"
                      }
                    >
                      {signatureData && signatureData[1] && (
                        <img
                          src={signatureData[1]?.cover}
                          alt={"cover"}
                          className={
                            "w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
                          }
                        />
                      )}

                      {signatureData && signatureData[1] && (
                        <h1
                          className={
                            "capitalize absolute mt-6 mr-4 text-white font-medium text-xl -right-[150px] group-hover:right-8 transition-all duration-500 ease-in-out"
                          }
                        >
                          {signatureData[1]?.propertyType}
                        </h1>
                      )}
                      <div
                        className={
                          "absolute text-left text-white p-8 -bottom-[130px] md:-bottom-[100px] lg:-bottom[150px] group-hover:bottom-3 transition-all duration-500 ease-in-out"
                        }
                      >
                        {signatureData && signatureData[1] && (
                          <h1 className={"capitalize text-3xl mb-4 title-font"}>
                            {signatureData[1]?.propertyType}
                          </h1>
                        )}

                        {signatureData && signatureData[1] && (
                          <p className={"text-md mt-2"}>
                            {truncateString(signatureData[1]?.description, 150)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                )}
                {signatureData[2] && (
                  <Link
                    to={`/signature-collection/${
                      signatureData && signatureData[2]?.id
                    }`}
                  >
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
                        "z-30 relative w-full  h-[540px] cursor-pointer grayscale hover:grayscale-0 duration-500 transition-all bg-cover ease-in-out overflow-hidden group rounded-tl-[50px] rounded-br-[50px] hover:rounded-tl-none hover:rounded-br-none hover:rounded-bl-[50px] hover:rounded-tr-[50px]"
                      }
                    >
                      {signatureData && signatureData[2] && (
                        <img
                          src={signatureData[2]?.cover}
                          alt={"cover"}
                          className={
                            "w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
                          }
                        />
                      )}

                      {signatureData && signatureData[2] && (
                        <h1
                          className={
                            "capitalize absolute mt-6 mr-4 text-white font-medium text-xl -right-[150px] group-hover:right-8 transition-all duration-500 ease-in-out"
                          }
                        >
                          {signatureData[2]?.propertyType}
                        </h1>
                      )}
                      <div
                        className={
                          "absolute text-left text-white p-8 -bottom-[130px] md:-bottom-[100px] lg:-bottom[150px] group-hover:bottom-3 transition-all duration-500 ease-in-out"
                        }
                      >
                        {signatureData && signatureData[2] && (
                          <h1 className={"capitalize text-3xl mb-4 title-font"}>
                            {signatureData[2]?.propertyType}
                          </h1>
                        )}

                        {signatureData && signatureData[2] && (
                          <p className={"text-md mt-2"}>
                            {truncateString(signatureData[2]?.description, 150)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                )}
                {signatureData[3] && (
                  <Link
                    to={`/signature-collection/${
                      signatureData && signatureData[3]?.id
                    }`}
                  >
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
                        "z-30 relative w-full  h-[540px] cursor-pointer grayscale hover:grayscale-0 duration-500 transition-all bg-cover ease-in-out overflow-hidden group rounded-tl-[50px] rounded-br-[50px] hover:rounded-tl-none hover:rounded-br-none hover:rounded-bl-[50px] hover:rounded-tr-[50px]"
                      }
                    >
                      {signatureData && signatureData[3] && (
                        <img
                          src={signatureData[3]?.cover}
                          alt={"cover"}
                          className={
                            "w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
                          }
                        />
                      )}

                      {signatureData && signatureData[3] && (
                        <h1
                          className={
                            "capitalize absolute mt-6 mr-4 text-white font-medium text-xl -right-[150px] group-hover:right-8 transition-all duration-500 ease-in-out"
                          }
                        >
                          {signatureData[3]?.propertyType}
                        </h1>
                      )}
                      <div
                        className={
                          "absolute text-left text-white p-8 -bottom-[130px] md:-bottom-[100px] lg:-bottom[150px] group-hover:bottom-3 transition-all duration-500 ease-in-out"
                        }
                      >
                        {signatureData && signatureData[3] && (
                          <h1 className={"capitalize text-3xl mb-4 title-font"}>
                            {signatureData[3]?.propertyType}
                          </h1>
                        )}

                        {signatureData && signatureData[3] && (
                          <p className={"text-md mt-2"}>
                            {truncateString(signatureData[3]?.description, 150)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SignatureProperties;
