import { useState, useEffect } from "react";
import { LoadingSpinner } from "./loading-spinner";
import { useLocation } from "react-router-dom";
import { formatPrice } from "../utils/format-price";
import { handleEmailClick } from "../utils/handleEmailClick";
import { ContactFieldCard } from "./contact-field-card";
import { PropertyItemCard } from "./property-item-card";
import { WhatsappButton } from "./whatsapp-button";

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
import Lightbox from "./lightbox";

export const ViewIndividualProperty = (propertyId) => {
  const [propertyData, setPropertyData] = useState([]);
  const [propertyDescription, setPropertyDescriptionData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_MYSQL_ENDPOINT}/get-property-by-id/${propertyId?.id}`
        );

        if (!response.ok) throw new Error("Failed to fetch property data");

        const data = await response.json();
        setPropertyData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId?.id]);

  useEffect(() => {
    const fetchDescription = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_MYSQL_ENDPOINT}/get-property-description-by-property-id/${propertyId?.id}`
        );

        if (!response.ok) throw new Error("Failed to fetch market data");

        const data = await response.json();

        setPropertyDescriptionData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDescription();
  }, [propertyId?.id]);

  const route = useLocation();

  function formatNumber(number) {
    // Convert the number to a string and reverse it
    let reversedNumber = number?.toString()?.split("")?.reverse()?.join("");

    // Use a regular expression to insert commas every three digits
    let reversedWithCommas = reversedNumber?.match(/.{1,3}/g)?.join(",");

    // Reverse the string back to its original order
    let formattedNumber = reversedWithCommas?.split("")?.reverse()?.join("");

    return formattedNumber;
  }

  const individualImage = propertyData?.pictures?.split(",");

  const sliderImages = individualImage?.map((images) => ({
    original: images,
    thumbnail: images,
  }));
 
    const handleRightClick = (e) => {
      e.preventDefault();
      alert("Right-click is disabled on this image!");
    };

    const toggleShowMore = () => {
      setShowMore((prev) => !prev);
    };
 

  return (
    <div className="w-full pb-16">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div>
            <div className="w-full">
            <div className="flex items-start justify-between">
  <div>
    <h2 className="capitalize text-xl lg:text-3xl mb-2 font-semibold text-[#272c63]">
      {propertyData?.propertyType} in {propertyData.location}
    </h2>
    <p className="text-[#272c63] mb-2 text-lg lg:text-2xl capitalize">
      {propertyData.referenceId}
      
    </p>
  </div>

  <div className={"gap-4 flex items-center"}>
  <p className="text-[#272c63] mb-2 text-lg lg:text-2xl capitalize">
      
      
        {propertyData?.size && propertyData?.measuringUnit && (
          <>
             {propertyData?.size} {propertyData?.measuringUnit}
          </>
        )}
     
    </p>
    {propertyData.status === "sold" ? (
      <p className="text-[#e53030] border p-4 border-black rounded-full text-lg lg:text-3xl">
        Sold out
      </p>
    ) : (
      <p className="text-[#e53030] border p-4 border-black rounded-full text-lg lg:text-3xl">
        {route.pathname.includes("rentals") ? (
          <>LKR {formatNumber(propertyData?.price)}</>
        ) : (
          <>LKR {formatPrice(propertyData.price)} Million</>
        )}
      </p>
    )}
    {propertyData?.perval && (
    <p className="text-black font-bold text-sm lg:text-base mt-0">{propertyData.perval}</p> 
  )}
  </div>
  
  

</div>
              <div className="w-full flex gap-2">
                <div className="w-full lg:w-3/5 h-96 overflow-hidden rounded-md shadow-sm relative">
                  <img
                    src={propertyData.cover}
                    alt={propertyData.location}
                    className="w-full h-full object-cover"
                    onContextMenu={handleRightClick}
                  />
                </div>
                <div className="gap-2 w-2/5 hidden lg:flex">
                  <div className="w-1/2 h-96 overflow-hidden flex flex-col gap-2">
                    {individualImage && individualImage[0] && (
                      <img
                        src={individualImage[0]}
                        alt={propertyData.location}
                        className="w-full h-48 object-cover rounded-md"
                        onContextMenu={handleRightClick}
                      />
                    )}

                    {individualImage && individualImage[1] && (
                      <img
                        src={individualImage[1]}
                        alt={propertyData.location}
                        className="w-full h-48 object-cover rounded-md"
                        onContextMenu={handleRightClick}
                      />
                    )}
                  </div>
                  <div className="w-1/2 h-96 overflow-hidden flex flex-col gap-2">
                    {individualImage && individualImage[2] && (
                      <img
                        src={individualImage[2]}
                        alt={propertyData.location}
                        className="w-full h-48 object-cover rounded-md"
                        onContextMenu={handleRightClick}
                      />
                    )}
                    {individualImage && individualImage[3] && (
                      <img
                        src={individualImage[3]}
                        alt={propertyData.location}
                        className="w-full h-48 object-cover rounded-md"
                        onContextMenu={handleRightClick}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="gap-2 w-full lg:flex mt-4">
                {individualImage?.length > 4 && (
                  <div className="w-full h-48 overflow-hidden flex gap-2">
                    {individualImage[4] && (
                      <img
                        src={individualImage[4]}
                        alt={propertyData.location}
                        className="w-full h-48 object-cover rounded-md"
                        onContextMenu={handleRightClick}
                      />
                    )}
                    {individualImage[5] && (
                      <img
                        src={individualImage[5]}
                        alt={propertyData.location}
                        className="w-full h-48 object-cover rounded-md"
                        onContextMenu={handleRightClick}
                      />
                    )}

                    {individualImage[6] && (
                      <img
                        src={individualImage[6]}
                        alt={propertyData.location}
                        className="w-full h-48 object-cover rounded-md"
                        onContextMenu={handleRightClick}
                      />
                    )}
                    {individualImage[7] && (
                      <img
                        src={individualImage[7]}
                        alt={propertyData.location}
                        width={1920}
                        className="w-full h-48 object-cover rounded-md"
                        onContextMenu={handleRightClick}
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="flex w-full mt-2">
                <Lightbox
                  activityName={propertyData?.location}
                  businessName={propertyData?.propertyType}
                  activityImages={sliderImages}
                />
              </div>

              <div className="mt-4">
              <div className="mb-10">
        <p className="font-semibold text-lg">Description: </p>
        {showMore
          ? propertyDescription?.map((d, index) => (
              <div key={index}>
                {d.description ? (
                  <p>{d.description}</p>
                ) : (
                  <br />
                )}
              </div>
            ))
          : propertyDescription?.[0]?.description && (
              <p>
                {propertyDescription[0].description.length <= 100
                  ? propertyDescription[0].description
                  : `${propertyDescription[0].description.slice(0, 100)}...`}
              </p>
            )}
        {propertyDescription.length > 1 && (
          <button
            onClick={toggleShowMore}
            className="mt-2 text-blue-500 hover:underline"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {propertyData.numberOfRooms && (
                    <PropertyItemCard
                      icon={BedDouble}
                      text={`Number of rooms:  ${propertyData.numberOfRooms}`}
                    />
                  )}

                  {propertyData.numberOfWashrooms && (
                    <PropertyItemCard
                      icon={Bath}
                      text={`Number of washrooms:  ${propertyData.numberOfWashrooms}`}
                    />
                  )}
                  {propertyData.numberOfFloors && (
                    <PropertyItemCard
                      icon={Hotel}
                      text={`Number of floors:  ${propertyData.numberOfFloors}`}
                    />
                  )}
                  {propertyData.floorArea && (
                    <PropertyItemCard
                      icon={LandPlot}
                      text={`Floor area:  ${propertyData.floorArea} sqft`}
                    />
                  )}
                  {propertyData?.furnished && (
                    <PropertyItemCard
                      icon={Store}
                      text={`Furnished: ${propertyData?.furnished}`}
                    />
                  )}
                  {propertyData.size && (
                    <PropertyItemCard
                      icon={Ruler}
                      text={`Land size: ${propertyData.size} ${propertyData.measuringUnit}`}
                    />
                  )}
                  {propertyData.accessRoad && (
                    <PropertyItemCard
                      icon={Radio}
                      text={`Access road: ${propertyData.accessRoad} ft.`}
                    />
                  )}
                  {propertyData.water && (
                    <PropertyItemCard
                      icon={GlassWater}
                      text={propertyData.water}
                    />
                  )}
                  {propertyData.surveyPlans && (
                    <PropertyItemCard
                      icon={Orbit}
                      text={`Survey plans: ${propertyData.surveyPlans}`}
                    />
                  )}
                  {propertyData.deedType && (
                    <PropertyItemCard
                      icon={Waypoints}
                      text={`Deed type: ${propertyData.deedType}`}
                    />
                  )}
                  {propertyData.coc && (
                    <PropertyItemCard
                      icon={GanttChartIcon}
                      text={propertyData.coc}
                    />
                  )}
                  {propertyData.ammenities && (
                    <PropertyItemCard
                      icon={Gavel}
                      text={propertyData.ammenities}
                    />
                  )}
                  {propertyData.aprtmentName && (
                    <PropertyItemCard
                      icon={Building}
                      text={propertyData.aprtmentName}
                    />
                  )}
                  {propertyData.elevator && (
                    <PropertyItemCard
                      icon={CableCar}
                      text={`Elevator availability: ${propertyData.elevator}`}
                    />
                  )}
                  {propertyData.generator && (
                    <PropertyItemCard
                      icon={BatteryCharging}
                      text={`Generator availability: ${propertyData.generator}`}
                    />
                  )}
                  {propertyData.airCondition && (
                    <PropertyItemCard
                      icon={Loader}
                      text={`Air condition availability: ${propertyData.elevator}`}
                    />
                  )}
                  {propertyData.parking && (
                    <PropertyItemCard
                      icon={Car}
                      text={`Parking availability up to: ${propertyData.parking} vehicles.`}
                    />
                  )}
                  {propertyData.security && (
                    <PropertyItemCard
                      icon={Fingerprint}
                      text={`Security availability: ${propertyData.security}`}
                    />
                  )}
                  {propertyData.developerName && (
                    <PropertyItemCard
                      icon={UserCheck}
                      text={propertyData.developerName}
                    />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold text-lg mb-4">Agent details: </p>
                <div className="grid grid-cols-1 lg:grid-cols-4 mb-4">
                  {propertyData.firstname && (
                    <div className="flex items-center">
                      <p className="font-semibold mr-7">Name: </p>
                      <p className="capitalize">
                        {propertyData.firstname} {propertyData.lastname}
                      </p>
                    </div>
                  )}

                  {propertyData.addressLineOne && (
                    <div className="flex items-start">
                      <p className="font-semibold mr-4">Address: </p>
                      <p className="capitalize">
                        {propertyData.addressLineOne}{" "}
                        {propertyData.addressLineTwo}
                      </p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {propertyData?.contactNumberOne && (
                    <ContactFieldCard
                      icon={Smartphone}
                      text={propertyData.contactNumberOne}
                    />
                  )}

                  {propertyData?.contactNumberTwo && (
                    <ContactFieldCard
                      icon={Smartphone}
                      text={propertyData.contactNumberTwo}
                    />
                  )}

                  {propertyData?.whatsappNumber && (
                    <WhatsappButton
                      message={`Hello, I am interested in property ID: ${propertyData?.referenceId}. Can you provide more details?`}
                      number={propertyData?.whatsappNumber}
                    />
                  )}

                  {propertyData?.email && (
                    <div
                      className="flex items-center border p-4 justify-center rounded-4 shadow-sm hover:shadow-md cursor-pointer hover:shadow-[#085585]/50 duration-300 transition-all"
                      onClick={() => handleEmailClick(propertyData?.email)}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      <p className="text-md lg:text-lg">{propertyData.email}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
