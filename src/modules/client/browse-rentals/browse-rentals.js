import { useState, useEffect } from "react";
import { PropertyFilterBar } from "../../shared/components/property-filter-bar";
import { LoadingSpinner } from "../../shared/components/loading-spinner";
import { Link } from "react-router-dom";
import { PropertyCard } from "../explore-properties/property-card";

export const BrowseRentalProperties = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [propertyData, setPropertyData] = useState([]);
  const [error, setError] = useState(null);
  const [descriptionData, setDescriptionData] = useState([]);

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
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MYSQL_ENDPOINT}/get-property-descriptions`
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

    fetchProperties();
  }, []);

  //   const searchParams = useSearchParams();
  //   const pt = searchParams.get("propertyType");

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedNumberOfRooms, setSelectedNumberOfRooms] = useState("");
  const [selectedPropertyAge, setSelectedPropertyAge] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [maxPrice, setMaxPrice] = useState(1000000);

  useEffect(() => {
    if (propertyData) {
      const rentalsData = propertyData.filter(
        (property) => property.listingType.toString() === "rent"
      );
      const maxPropertyPrice = Math.max(
        ...rentalsData.map((property) => property.price),
        1000000
      );
      setPriceRange([0, maxPropertyPrice]);
      setMaxPrice(maxPropertyPrice);
    }
  }, [propertyData]);

  const rentalsData = propertyData?.filter(
    (property) => property.listingType.toString() === "rent"
  );

  const filteredProperties = rentalsData?.filter((property) => {
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

  return (
    <div>
      <PropertyFilterBar
        data={rentalsData}
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

      <div className="flex items-center w-full justify-center">
        {isLoading && <LoadingSpinner />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProperties
          ? filteredProperties.map((property) => {
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
                <Link key={property.id} href={`/explore-to-buy/${property.id}`}>
                  <PropertyCard
                    id={property.id}
                    cover={property.cover}
                    location={property.location}
                    price={property.price}
                    propertyType={property.propertyType}
                    description={desc}
                    listingType={"buy"}
                    status={property.status}
                  />
                </Link>
              );
            })
          : ""}
      </div>
      <div className={"w-full items-center h-48 flex justify-center"}>
        {!isLoading && filteredProperties?.length === 0 && (
          <div className="col-span-4 text-center text-darkBlue font-semibold">
            Relevant data is not found
          </div>
        )}
      </div>
    </div>
  );
};
