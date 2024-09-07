import { handlePhoneNumberClick } from "../utils/handlePhoneNumberOnClick";
import { splitPhoneNumber } from "../utils/splitPhoneNumber";

export const ContactFieldCard = ({ icon, text }) => {
  const Icon = icon;
  return (
    <div
      className="flex items-center border p-4 justify-center rounded-4 shadow-sm hover:shadow-md cursor-pointer hover:shadow-[#085585]/50 duration-300 transition-all"
      onClick={() => handlePhoneNumberClick}
    >
      <Icon className="w-4 h-4 mr-2" />
      <p className="text-md lg:text-lg">{splitPhoneNumber(text)}</p>
    </div>
  );
};
