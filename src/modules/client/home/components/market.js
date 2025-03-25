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
      {market?.length > 0 ? (
        <div
          className={
            "w-full px-4 py-6 md:px-6 md:py-10 lg:px-8 lg:py-20 mx-auto text-center overflow-hidden"
          }
        >
          {market?.length > 0 && (
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
          )}

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
          delay: 0.5,
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
    {market && market[0] && (
      <div className="group relative overflow-hidden rounded-t-lg">
        <img
          src={market[0]?.cover}
          alt={"cover"}
          className={
            "w-full h-[340px] object-cover transition-transform duration-500 group-hover:scale-110"
          }
        />
      </div>
    )}
    
    <div className="text-left bg-white p-6 w-full text-black space-y-3 rounded-b-lg">
      {market && market[0] && (
        <h2 className="capitalize text-2xl font-bold text-[#272c63]">
          Our Market in {market[0]?.location}
        </h2>
      )}
      
      {market && market[0] && (
        <p className="text-md text-gray-600">
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
          delay: 0.5,
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
    {market && market[1] && (
      <div className="group relative overflow-hidden rounded-t-lg">
        <img
          src={market[1]?.cover}
          alt={"cover"}
          className={
            "w-full h-[340px] object-cover transition-transform duration-500 group-hover:scale-110"
          }
        />
      </div>
    )}
    
    <div className="text-left bg-white p-6 w-full text-black space-y-3 rounded-b-lg">
      {market && market[1] && (
        <h2 className="capitalize text-2xl font-bold text-[#272c63]">
          Our Market in {market[1]?.location}
        </h2>
      )}
      
      {market && market[1] && (
        <p className="text-md text-gray-600">
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
          delay: 0.5,
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
    {market && market[2] && (
      <div className="group relative overflow-hidden rounded-t-lg">
        <img
          src={market[2]?.cover}
          alt={"cover"}
          className={
            "w-full h-[340px] object-cover transition-transform duration-500 group-hover:scale-110"
          }
        />
      </div>
    )}
    
    <div className="text-left bg-white p-6 w-full text-black space-y-3 rounded-b-lg">
      {market && market[2] && (
        <h2 className="capitalize text-2xl font-bold text-[#272c63]">
          Our Market in {market[2]?.location}
        </h2>
      )}
      
      {market && market[2] && (
        <p className="text-md text-gray-600">
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
      "z-30 relative w-full cursor-pointer transition-all duration-500 ease-in-out overflow-hidden group rounded-lg shadow-md border"
    }
  >
    {market && market[3] && (
      <div className="group relative overflow-hidden rounded-t-lg">
        <img
          src={market[3]?.cover}
          alt={"cover"}
          className={
            "w-full h-[340px] object-cover transition-transform duration-500 group-hover:scale-110"
          }
        />
      </div>
    )}
    
    <div className="text-left bg-white p-6 w-full text-black space-y-3 rounded-b-lg">
      {market && market[3] && (
        <h2 className="capitalize text-2xl font-bold text-[#272c63]">
          Our Market in {market[3]?.location}
        </h2>
      )}
      
      {market && market[3] && (
        <p className="text-md text-gray-600">
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
