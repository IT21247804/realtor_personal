import { motion } from "framer-motion";
import truncateString from "../../../shared/utils/truncate";

const BrandPromise = () => {
  return (
    <div
      className={
        " bg-[#272c63] w-full px-4 py-6 md:px-6 md:py-10 lg:px-8 lg:py-40 mx-auto text-center overflow-hidden text-[#e9ecee]"
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
          "text-xl md:text-4xl lg:text-6xl transition-all ease-in-out duration-500 uppercase font-medium md:font-bold tracking-widest title-font"
        }
      >
        brand promise
      </motion.h1>

      <motion.p
        variants={{
          hidden: {
            opacity: 0,
            y: -30,
          },
          show: {
            y: 0,
            opacity: 1,
            transition: {
              type: "keyframes",
              duration: 0.4,
              delay: 0.3,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.6 }}
        className={"mb-6 md:mb-8 lg:mb-10 font-semibold italic tracking-widest"}
      >
        Our promise is to provide the best service and experience possible.
      </motion.p>

      <div
        className={
          "flex flex-col md:flex-row w-full max-w-7xl mx-auto items-center justify-between"
        }
      >
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: -30,
            },
            show: {
              y: 0,
              opacity: 1,
              transition: {
                type: "keyframes",
                duration: 0.4,
                delay: 0.3,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.6 }}
          className={"w-full flex items-center justify-center"}
        >
          <img
            src={"/images/ceo.png"}
            className={"w-96 h-auto mb-4 md:mb-0 text-center"}
          />
        </motion.div>
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: -30,
            },
            show: {
              y: 0,
              opacity: 1,
              transition: {
                type: "keyframes",
                duration: 0.6,
                delay: 0.6,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.6 }}
          className={"w-full"}
        >
          <p className={"text-md text-left mb-2"}>
            {truncateString(
              "\n" +
                "Elevating Real Estate Excellence: The Real Realtor - Gateway to exceptional Real Estate\n" +
                "Experiences in Sri Lanka. Explore a realm where authenticity meets innovation. As The Real\n" +
                "Realtor, we redefine the real estate experience, offering more than just properties; we provide\n" +
                "keys to a lifestyle. From prime locations to personalized service, we are your partners in turning\n" +
                "real estate dreams into reality. Trust in The Real Realtor, where every transaction is backed by\n" +
                "sincerity, expertise, and a commitment to your Sri Lankan realty aspirations.",
              800
            )}
          </p>
          <p className={"text-right"}>
            Salindu Hettiarachchi, <span className={"italic"}>Founder</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandPromise;
