export const CustomTableHeader = ({ header, description, customForm }) => {
  return (
    <div
      className={"mb-12 border-b flex w-full items-start justify-between pb-2"}
    >
      <div>
        <h1
          className={
            "text-3xl text-text-[#272c63] font-semibold capitalize mb-1"
          }
        >
          {header}
        </h1>
        <p className={"text-base text-[#272c63] font-base"}>{description}</p>
      </div>

      <div>{customForm}</div>
    </div>
  );
};
