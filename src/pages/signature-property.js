import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoadingSpinner } from "../modules/shared/components/loading-spinner";
import { handleWhatsAppClick } from "../modules/shared/utils/handleWhatsppClick";
import { splitPhoneNumber } from "../modules/shared/utils/splitPhoneNumber";
import { handleEmailClick } from "../modules/shared/utils/handleEmailClick";
import { formatPrice } from "../modules/shared/utils/format-price";
import { ContactFieldCard } from "../modules/shared/components/contact-field-card";
import { CollapsibleText } from "../modules/shared/components/collapsible-text";
import { PropertyItemCard } from "../modules/shared/components/property-item-card";
import { Button } from "antd";

import {
  Bath,
  BatteryCharging,
  BedDouble,
  Building,
  CableCar,
  Car,
  Fingerprint,
  GanttChartIcon,
  Gavel,
  GlassWater,
  Hotel,
  LandPlot,
  Loader,
  Mail,
  Orbit,
  Play,
  Radio,
  Ruler,
  Smartphone,
  Store,
  UserCheck,
  Waypoints,
  X,
} from "lucide-react";

const SignatureProperty = () => {
  const route = useLocation();

  const propertyId = route.pathname.split("/")[2];

  const [propertyData, setPropertyData] = useState([]);
  const [error, setError] = useState(null);
  const [descriptionData, setDescriptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMarket = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/get-all-properties`
        );

        if (!response.ok) throw new Error("Failed to fetch market data");

        const data = await response.json();

        setPropertyData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMarket();
  }, [propertyId]);

  useEffect(() => {
    const fetchDescription = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/get-property-description-by-property-id/${parseInt(
            propertyId
          )}`
        );

        if (!response.ok) throw new Error("Failed to fetch market data");

        const data = await response.json();

        setDescriptionData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDescription();
  }, [propertyId]);

  const property = propertyData?.find(
    (prop) => prop.id === parseInt(propertyId)
  );

  const individualImage = property?.pictures?.split(",");

  function splitAtCapitalLetters(str) {
    const regex = /(?=[A-Z])/;
    return str?.split(regex);
  }

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideoModal = () => setIsVideoOpen(true);
  const closeVideoModal = () => setIsVideoOpen(false);

  return (
    <div className={"w-full max-w-[1280px] mx-auto p-8"}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="w-full">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="capitalize text-xl lg:text-3xl mb-2 font-semibold text-[#272c63]">
                  {property?.propertyType} in {property?.location}
                </h2>
                <p className="text-[#272c63] mb-2 text-lg  lg:text-2xl capitalize ">
                  {splitAtCapitalLetters(property?.age)}{" "}
                  {property?.propertyType} for {property?.listingType}.
                </p>
              </div>
              <div className={"gap-4 flex items-center"}>
                {property?.status === "sold" ? (
                  <p className="text-[#e53030] border p-4 border-black rounded-full text-lg: lg:text-3xl">
                    Sold out
                  </p>
                ) : (
                  <p className="text-[#e53030] border p-4 border-black rounded-full text-lg: lg:text-3xl">
                    LKR {formatPrice(property?.price)} Million
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-full lg:w-3/5 h-96 overflow-hidden rounded-md shadow-sm relative">
              {property?.video?.toString().length > 0 && (
                <div className="absolute top-4 right-4">
                  <div>
                    {/* Play Video Button */}
                    {property?.video?.toString().length > 0 && (
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={openVideoModal}
                          className="bg-gray-200 text-black p-2 rounded flex items-center"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Play Video
                        </button>
                      </div>
                    )}

                    {/* Video Modal */}
                    {isVideoOpen && (
                      <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={closeVideoModal}
                      >
                        <div
                          className="bg-white rounded-md p-4 w-auto lg:max-w-[1200px] relative"
                          onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside it
                        >
                          <div className="flex justify-between mb-4">
                            <h2 className="capitalize text-xl font-semibold">
                              {property?.propertyType} in {property?.location}
                            </h2>
                            <button onClick={closeVideoModal}>
                              Close <X className="w-4 h-4 ml-2" />
                            </button>
                          </div>
                          <div className="rounded-md overflow-hidden w-auto">
                            <video
                              controls
                              autoPlay
                              loop
                              className="lg:max-w-[1150px] lg:max-h-[840px] max-w-[400px] w-auto h-auto object-cover"
                            >
                              <source src={property?.video} />
                            </video>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Property Cover Image */}
                    <img
                      src={property?.cover}
                      alt={property?.location}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              <img
                src={property?.cover}
                alt={property?.location}
                className="w-full h-full object-cover"
              />
            </div>
            {individualImage?.length > 0 && (
              <div className="gap-2 w-2/5 hidden lg:flex">
                <div className="w-1/2 h-96 overflow-hidden flex flex-col gap-2">
                  {individualImage[0] && (
                    <img
                      src={individualImage[0]}
                      alt={property?.location}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}

                  {individualImage[1] && (
                    <img
                      src={individualImage[1]}
                      alt={property?.location}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                </div>
                <div className="w-1/2 h-96 overflow-hidden flex flex-col gap-2">
                  {individualImage[2] && (
                    <img
                      src={individualImage[2]}
                      alt={property?.location}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                  {individualImage[3] && (
                    <img
                      src={individualImage[3]}
                      alt={property?.location}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="gap-2 w-full lg:flex mt-4">
            {individualImage?.length > 4 && (
              <div className="w-full h-48 overflow-hidden flex gap-2">
                {individualImage[4] && (
                  <img
                    src={individualImage[4]}
                    alt={property?.location}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
                {individualImage[5] && (
                  <img
                    src={individualImage[5]}
                    alt={property?.location}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}

                {individualImage[6] && (
                  <img
                    src={individualImage[6]}
                    alt={property?.location}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
                {individualImage[7] && (
                  <img
                    src={individualImage[7]}
                    alt={property?.location}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
              </div>
            )}
          </div>
          <div className="mt-4">
            <div className="mb-2">
              <p className="font-semibold text-lg">Description: </p>
              {descriptionData?.map((d, index) => (
                <p key={index}>{d.description}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {property?.numberOfRooms && (
                <PropertyItemCard
                  icon={BedDouble}
                  text={`Number of rooms: ${" "} ${property?.numberOfRooms}`}
                />
              )}

              {property?.numberOfWashrooms && (
                <PropertyItemCard
                  icon={Bath}
                  text={`Number of washrooms: ${" "} ${
                    property?.numberOfWashrooms
                  }`}
                />
              )}
              {property?.numberOfFloors && (
                <PropertyItemCard
                  icon={Hotel}
                  text={`Number of floors: ${" "} ${property?.numberOfFloors}`}
                />
              )}
              {property?.floorArea && (
                <PropertyItemCard
                  icon={LandPlot}
                  text={`Floor area: ${" "} ${property?.floorArea} sqft`}
                />
              )}
              {property?.furnished && (
                <PropertyItemCard
                  icon={Store}
                  text={`Furnished: ${property?.furnished}`}
                />
              )}
              {property?.size && (
                <PropertyItemCard
                  icon={Ruler}
                  text={`Land size: ${property?.size} ${property?.measuringUnit}`}
                />
              )}
              {property?.accessRoad && (
                <PropertyItemCard
                  icon={Radio}
                  text={`Access road: ${property?.accessRoad} ft.`}
                />
              )}
              {property?.water && (
                <PropertyItemCard icon={GlassWater} text={property?.water} />
              )}
              {property?.surveyPlans && (
                <PropertyItemCard
                  icon={Orbit}
                  text={`Survey plans: ${property?.surveyPlans}`}
                />
              )}
              {property?.deedType && (
                <PropertyItemCard
                  icon={Waypoints}
                  text={`Deed type: ${property?.deedType}`}
                />
              )}
              {property?.coc && (
                <PropertyItemCard icon={GanttChartIcon} text={property?.coc} />
              )}
              {property?.ammenities && (
                <PropertyItemCard icon={Gavel} text={property?.ammenities} />
              )}
              {property?.aprtmentName && (
                <PropertyItemCard
                  icon={Building}
                  text={`Apartment name: ${property?.aprtmentName}`}
                />
              )}
              {property?.elevator && (
                <PropertyItemCard
                  icon={CableCar}
                  text={`Elevator availability: ${property?.elevator}`}
                />
              )}
              {property?.generator && (
                <PropertyItemCard
                  icon={BatteryCharging}
                  text={`Generator availability: ${property?.generator}`}
                />
              )}
              {property?.airCondition && (
                <PropertyItemCard
                  icon={Loader}
                  text={`Air condition availability: ${property?.elevator}`}
                />
              )}
              {property?.parking && (
                <PropertyItemCard
                  icon={Car}
                  text={`Parking availability up to: ${property?.parking} vehicles.`}
                />
              )}
              {property?.security && (
                <PropertyItemCard
                  icon={Fingerprint}
                  text={`Security availability: ${property?.security}`}
                />
              )}
              {property?.developerName && (
                <PropertyItemCard
                  icon={UserCheck}
                  text={property?.developerName}
                />
              )}
            </div>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-lg mb-4">Agent details: </p>
            <div className="grid grid-cols-1 lg:grid-cols-4 mb-4">
              {property?.firstname && (
                <div className="flex items-center">
                  <p className="font-semibold mr-4">Name: </p>
                  <p className="capitalize">
                    {property?.firstname} {property?.lastname}
                  </p>
                </div>
              )}

              {property?.addressLineOne && (
                <div className="flex items-center">
                  <p className="font-semibold mr-4">Address: </p>
                  <p className="capitalize">
                    {property?.addressLineOne} {property?.addressLineTwo}
                  </p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {property?.contactNumberOne && (
                <ContactFieldCard
                  icon={Smartphone}
                  text={property?.contactNumberOne}
                />
              )}

              {property?.contactNumberTwo && (
                <ContactFieldCard
                  icon={Smartphone}
                  text={property?.contactNumberTwo}
                />
              )}

              {property?.whatsappNumber && (
                <div
                  className="flex items-center border p-4 justify-center rounded-4 shadow-sm hover:shadow-md cursor-pointer hover:shadow-[#085585]/50 duration-300 transition-all"
                  onClick={() => handleWhatsAppClick}
                >
                  <img
                    src={"/images/whatsapp.png"}
                    alt=""
                    className="w-4 h-4 mr-2"
                  />
                  <p className="text-md lg:text-lg">
                    {splitPhoneNumber(property?.whatsappNumber)}
                  </p>
                </div>
              )}

              {property?.email && (
                <div
                  className="flex items-center border p-4 justify-center rounded-4 shadow-sm hover:shadow-md cursor-pointer hover:shadow-[#085585]/50 duration-300 transition-all"
                  onClick={() => handleEmailClick}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <p className="text-md lg:text-lg">{property?.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignatureProperty;
