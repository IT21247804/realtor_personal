import truncateString from "../../../shared/utils/truncate";

const TestimonialCard = ({ image, message, name, role, company }) => {
  return (
    <div
      className={
        "rounded-xl flex-1 items-center justify-center flex flex-col bg-[#e6ce9f] py-8 px-16 text-slate-950 relative gap-4 h-72 mx-2 mb-6 overflow-hidden"
      }
    >
      <img
        src={image}
        alt={name}
        className={
          "rounded-full w-20 h-20 object-cover border-1 shadow-md border-[#272c63]"
        }
      />
      <img
        src="/images/quot.svg"
        className={
          "z-0 absolute font-light text-[#085585] w-32 h-32 -top-10 left-8"
        }
      />
      <p className={"text-xs md:text-sm z-20 font-semibold  text-[#272c63]"}>
        {truncateString(message, 75)}
      </p>
      <p className={"text-md font-semibold z-20 text-[#272c63]"}>
        {name}
        {role && (
          <>
            {","}{" "}
            <span className={"uppercase font-normal text-lg"}>
              {role}
              {company && (
                <>
                  {"-"} {company}
                </>
              )}
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default TestimonialCard;
