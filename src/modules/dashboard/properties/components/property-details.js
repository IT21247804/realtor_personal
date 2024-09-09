import React, { useState, useEffect } from "react";
import { PropertyFilterBar } from "../../../shared/components/property-filter-bar";
import { DashboardPropertyCard } from "./dashboard-property-card";

export const PropertyDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const [error, setError] = useState(null);
  const [descriptionData, setDescriptionData] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedNumberOfRooms, setSelectedNumberOfRooms] = useState("");
  const [selectedPropertyAge, setSelectedPropertyAge] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [visiblePropertiesCount, setVisiblePropertiesCount] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [propertyResponse, descriptionResponse] = await Promise.all([
          fetch("http://localhost:3001/get-all-properties"),
          fetch("http://localhost:3001/get-property-descriptions"),
        ]);

        if (!propertyResponse.ok || !descriptionResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [properties, descriptions] = await Promise.all([
          propertyResponse.json(),
          descriptionResponse.json(),
        ]);

        setPropertyData(properties);
        setDescriptionData(descriptions);

        // Set max price for the price range
        const maxPropertyPrice = Math.max(
          ...properties.map((property) => property.price),
          1000000
        );
        setPriceRange([0, maxPropertyPrice]);
        setMaxPrice(maxPropertyPrice);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProperties = propertyData.filter((property) => {
    const isWithinLocation = selectedLocation
      ? property.location === selectedLocation
      : true;
    const isWithinPriceRange =
      property.price >= priceRange[0] && property.price <= priceRange[1];
    const isOfSelectedPropertyType = selectedPropertyType
      ? property.propertyType.toString() === selectedPropertyType
      : true;
    const isSelectedPropertyAge = selectedPropertyAge
      ? property.age.toString() === selectedPropertyAge
      : true;
    const isNumberOfRooms = selectedNumberOfRooms
      ? property?.numberOfRooms === selectedNumberOfRooms
      : true;
    return (
      isWithinLocation &&
      isWithinPriceRange &&
      isOfSelectedPropertyType &&
      isNumberOfRooms &&
      isSelectedPropertyAge
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const visibleProperties = filteredProperties?.slice(
    0,
    visiblePropertiesCount
  );

  const loadMoreProperties = () => {
    setVisiblePropertiesCount((prevCount) => prevCount + 12);
  };

  return (
    <div>
      <PropertyFilterBar
        data={propertyData}
        selectedPropertyAge={selectedPropertyAge}
        selectedPropertyType={selectedPropertyType}
        selectedLocation={selectedLocation}
        selectedNumberOfRooms={selectedNumberOfRooms}
        maxPrice={maxPrice}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        setSelectedLocation={setSelectedLocation}
        setSelectedNumberOfRooms={setSelectedNumberOfRooms}
        setSelectedPropertyAge={setSelectedPropertyAge}
        setSelectedPropertyType={setSelectedPropertyType}
        link={"/explore-to-buy"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 z-0">
        {visibleProperties
          ? visibleProperties.map((property) => {
              const description = descriptionData?.filter(
                (data) => data?.property_id === property.id
              );

              const descriptions = description
                .map((item) => item.description)
                .filter((desc) => desc)
                .join(", ");

              const desc =
                description?.length > 0 ? descriptions : <p>No description</p>;

              return (
                <div key={property.id}>
                  <DashboardPropertyCard
                    id={property.id}
                    image={property.cover}
                    location={property.location}
                    price={property.price}
                    propertyType={property.propertyType}
                    description={desc}
                    listingType={property.listingType}
                    agentPhone={property.contactNumberOne}
                    status={property.status}
                    signature={property.signature}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
