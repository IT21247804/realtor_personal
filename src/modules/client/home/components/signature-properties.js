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
      {signatureData.length > 0 ? (
        <>
          <div
            className={
              "w-full px-4 py-6 md:px-6 md:py-10 lg:px-8 lg:py-20 mx-auto text-center overflow-hidden"
            }
          >
            {signatureData?.length > 0 && (
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
            )}

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div
                className={
                  "grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 items-center"
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
        "z-30 relative w-full cursor-pointer transition-all duration-500 ease-in-out overflow-hidden group rounded-lg shadow-md border"
      }
    >
      {/* Image Section */}
      {signatureData && signatureData[0] && (
  <div className="group relative overflow-hidden rounded-t-lg">
    <img
      src={signatureData[0]?.cover}
      alt={"cover"}
      className={
        "w-full h-[340px] object-cover rounded-b-lg transition-transform duration-500 group-hover:scale-110"
      }
    />
  </div>
)}

      {/* Top-Left Button */}
      <button
        className="absolute top-4 left-4 bg-white bg-opacity-50 text-[#272c63] text-sm font-bold px-4 py-2 rounded-full hover:bg-opacity-75 transition"
        onClick={(e) => {
          e.preventDefault(); // Prevent navigation if the button performs an action
          console.log("Button clicked!");
        }}
      >
        {signatureData[0]?.propertyType} for {signatureData[0]?.listingType}
      </button>

      {/* Details Section */}
      <div
        className={
          "text-left bg-white p-6 w-full text-black space-y-3 rounded-b-lg"
        }
      >
        {/* Price */}
        {signatureData && signatureData[0] && (
          <h1 className="capitalize text-2xl font-bold text-[#272c63]">
            LKR {signatureData[0]?.price}
          </h1>
        )}

        {/* Description */}
        {signatureData && signatureData[0] && (
          <p className="text-md text-gray-600">
            {truncateString(signatureData[0]?.description, 150)}
          </p>
        )}

        {/* Additional Details */}
        <div className="mt-4 text-sm text-[#272c63] flex space-x-4">
          <p className="font-bold">• {signatureData[0]?.location}</p>
          <p className="font-bold">• {signatureData[0]?.age}</p>
          <p className="font-bold">• {signatureData[0]?.size} perches</p>
        </div>
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
        "z-30 relative w-full cursor-pointer transition-all duration-500 ease-in-out overflow-hidden group rounded-lg shadow-md border"
      }
    >
      {/* Image Section */}
      {signatureData && signatureData[1] && (
  <div className="group relative overflow-hidden rounded-t-lg">
    <img
      src={signatureData[1]?.cover}
      alt={"cover"}
      className={
        "w-full h-[340px] object-cover rounded-b-lg transition-transform duration-500 group-hover:scale-110"
      }
    />
  </div>
)}

      {/* Top-Left Button */}
      <button
        className="absolute top-4 left-4 bg-white bg-opacity-50 text-[#272c63] text-sm font-bold px-4 py-2 rounded-full hover:bg-opacity-75 transition"
        onClick={(e) => {
          e.preventDefault(); // Prevent navigation if the button performs an action
          console.log("Button clicked!");
        }}
      >
        {signatureData[1]?.propertyType} for {signatureData[1]?.listingType}
      </button>
      

      {/* Details Section */}
      <div
        className={
          "text-left bg-white p-6 w-full text-black space-y-3 rounded-b-lg"
        }
      >
        {/* Price */}
        {signatureData && signatureData[1] && (
          <h1 className="capitalize text-2xl font-bold text-[#272c63]">
            LKR {signatureData[0]?.price}
          </h1>
        )}

        {/* Description */}
        {signatureData && signatureData[1] && (
          <p className="text-md text-gray-600">
            {truncateString(signatureData[0]?.description, 150)}
          </p>
        )}

        {/* Additional Details */}
        <div className="mt-4 text-sm text-[#272c63] flex space-x-4">
        <p className="font-bold">• {signatureData[1]?.location}</p>
        <p className="font-bold">• {signatureData[1]?.age}</p>
        <p className="font-bold">• {signatureData[1]?.size} {signatureData[1]?.measuringUnit}</p>
        </div>
      </div>
    </motion.div>
  </Link>
)}

{signatureData[2] && (
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
        "z-30 relative w-full cursor-pointer transition-all duration-500 ease-in-out overflow-hidden group rounded-lg shadow-md border"
      }
    >
      {/* Image Section */}
      {signatureData && signatureData[2] && (
  <div className="group relative overflow-hidden rounded-t-lg">
    <img
      src={signatureData[2]?.cover}
      alt={"cover"}
      className={
        "w-full h-[340px] object-cover rounded-b-lg transition-transform duration-500 group-hover:scale-110"
      }
    />
  </div>
)}

      {/* Top-Left Button */}
      <button
        className="absolute top-4 left-4 bg-white bg-opacity-50 text-[#272c63] text-sm font-bold px-4 py-2 rounded-full hover:bg-opacity-75 transition"
        onClick={(e) => {
          e.preventDefault(); // Prevent navigation if the button performs an action
          console.log("Button clicked!");
        }}
      >
        {signatureData[2]?.propertyType} for {signatureData[2]?.listingType}
      </button>
      

      {/* Details Section */}
      <div
        className={
          "text-left bg-white p-6 w-full text-black space-y-3 rounded-b-lg"
        }
      >
        {/* Price */}
        {signatureData && signatureData[2] && (
          <h1 className="capitalize text-2xl font-bold">
            LKR {signatureData[0]?.price}
          </h1>
        )}

        {/* Description */}
        {signatureData && signatureData[2] && (
          <p className="text-md text-gray-600">
            {truncateString(signatureData[0]?.description, 150)}
          </p>
        )}

        {/* Additional Details */}
        <div className="mt-4 text-sm text-[#272c63] flex space-x-4">
        <p className="font-bold">• {signatureData[2]?.location}</p>
        <p className="font-bold">• {signatureData[2]?.age}</p>
        <p className="font-bold">• {signatureData[2]?.size} {signatureData[2]?.measuringUnit}</p>
        </div>
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
