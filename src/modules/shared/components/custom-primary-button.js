import { Button } from "antd";

export const CustomPrimaryButton = ({
  text,
  type,
  htmlType,
  className,
  onClick = () => {},
  style = {},
}) => {
  return (
    <Button
      type={type}
      htmlType={htmlType}
      className={`h-10 bg-[#272c63] hover:bg-[#e53030] border-none shadow-none text-white  ${className}`}
      style={{
        backgroundColor: "#272c63",
        border: "none",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#e53030";
        e.currentTarget.style.color = "#ffffff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#272c63";
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
