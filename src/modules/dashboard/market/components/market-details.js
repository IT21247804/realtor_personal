"use client";

import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../../shared/components/loading-spinner";
import { Button } from "antd";
import { ChevronsDown } from "lucide-react";
import { MarketCard } from "./market-card";

export const MarketDetails = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedNumberOfRooms, setSelectedNumberOfRooms] = useState("");
  const [selectedPropertyAge, setSelectedPropertyAge] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [isLoading, setIsLoading] = useState(false);

  const [market, setMarket] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/get-all-market`);

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

  const [visiblePropertiesCount, setVisiblePropertiesCount] = useState(12);

  useEffect(() => {
    if (market) {
      const properties = market.filter((property) => property);
      const maxPropertyPrice = Math.max(
        ...properties.map((property) => property.price),
        1000000
      );
      setPriceRange([0, maxPropertyPrice]);
      setMaxPrice(maxPropertyPrice);
    }
  }, [market]);

  const filteredProperties = market?.filter((property) => {
    const isWithinLocation = selectedLocation
      ? property.location === selectedLocation
      : true;
    const isOfSelectedPropertyType = selectedPropertyType
      ? property.propertyType.toString() === selectedPropertyType
      : true;
    return isWithinLocation && isOfSelectedPropertyType;
  });

  const visibleProperties = filteredProperties?.slice(
    0,
    visiblePropertiesCount
  );

  const loadMoreProperties = () => {
    setVisiblePropertiesCount((prevCount) => prevCount + 12);
  };

  return (
    <div>
      {/*<PropertyFilterBar*/}
      {/*    data={propertyData?.property}*/}
      {/*    selectedPropertyAge={selectedPropertyAge}*/}
      {/*    selectedPropertyType={selectedPropertyType}*/}
      {/*    selectedLocation={selectedLocation}*/}
      {/*    selectedNumberOfRooms={selectedNumberOfRooms}*/}
      {/*    maxPrice={maxPrice}*/}
      {/*    priceRange={priceRange}*/}
      {/*    setPriceRange={setPriceRange}*/}
      {/*    setSelectedLocation={setSelectedLocation}*/}
      {/*    setSelectedNumberOfRooms={setSelectedNumberOfRooms}*/}
      {/*    setSelectedPropertyAge={setSelectedPropertyAge}*/}
      {/*    setSelectedPropertyType={setSelectedPropertyType}*/}
      {/*    key={propertyData?.property?.id}*/}
      {/*/>*/}

      <div className="flex items-center w-full justify-center">
        {isLoading && <LoadingSpinner />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 z-0">
        {visibleProperties
          ? visibleProperties.map((property) => (
              <div key={property.id}>
                <MarketCard
                  id={property.id}
                  image={property.cover}
                  location={property.location}
                  propertyType={property.type}
                  description={property.description}
                />
              </div>
            ))
          : ""}
      </div>

      <div className="w-full items-center h-24 flex justify-center">
        {!isLoading && filteredProperties?.length === 0 && (
          <div className="col-span-4 text-center text-darkBlue font-semibold">
            Relevant data is not found
          </div>
        )}
      </div>

      <div className="w-full flex justify-center pb-16">
        {!isLoading && visiblePropertiesCount < filteredProperties?.length && (
          <Button
            className="h-10 w-auto py-3 bg-[#085585] text-white rounded-md hover:bg-[#272c63] transition-colors"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e53030";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.border = 0;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#272c63";
            }}
            onClick={loadMoreProperties}
          >
            <ChevronsDown className="w-5 h-5 mr-2" />
            Load More Properties
          </Button>
        )}
      </div>
    </div>
  );
};
