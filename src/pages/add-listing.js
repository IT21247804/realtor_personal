import { AddListingForm } from "../modules/client/add-listing/add-listing-form";

const AddListing = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col md:items-center md:justify-center overflow-y-auto py-20 md:py-0">
      {/* Background image */}
      <img
        src="/images/add-listing.jpeg"
        alt="cover"
        className="fixed top-0 left-0 right-0 bottom-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-950/30 z-0" />

      {/* Content */}
      <div className="z-20 flex flex-col md:flex-row w-full md:w-4/5 h-auto md:h-4/5 space-y-4 md:space-y-0 md:space-x-10 px-4 md:px-0">
        {/* Title box */}
        <div className="w-full md:w-1/3 bg-white flex flex-col justify-center items-center p-4 rounded-lg shadow-lg">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center leading-snug">
            SELL / RENT YOUR PROPERTY <br /> WITH THE REAL REALTOR
          </h1>
        </div>

        {/* Form */}
        <div className="w-full md:w-1/3 flex items-center justify-center">
          <AddListingForm />
        </div>

        {/* Info content */}
        <div className="w-full md:w-1/3 bg-white flex flex-col p-4 rounded-lg shadow-lg overflow-y-auto max-h-[600px] md:max-h-full">
          <div className="text-gray-800">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              Sell or Rent Your Property with The Real Realtor
            </h2>
            
            {/* Option 1 */}
            <h3 className="text-base md:text-lg font-semibold mt-4">
              Option 01 - Exclusive Representation
            </h3>
            <p className="mb-4 text-sm md:text-base">
              <strong>Why Choose an Exclusive Agent?</strong> Choosing exclusive
              representation with The Real Realtor means you are entrusting us as
              your sole agent to handle all aspects of selling or renting your
              property. Here's why this approach is advantageous:
            </p>
            <ul className="list-disc pl-5 mb-4 text-sm md:text-base">
              <li>Dedicated Focus</li>
              <li>Priority Attention</li>
              <li>Streamlined Communication</li>
              <li>Enhanced Marketing</li>
              <li>Expert Negotiation</li>
              <li>Resource Investment</li>
            </ul>

            {/* Option 2 */}
            <h3 className="text-base md:text-lg font-semibold mt-4">
              Option 02 - Non-Exclusive Representation
            </h3>
            <p className="mb-4 text-sm md:text-base">
              <strong>Why Choose Non-Exclusive Representation?</strong> If you prefer
              flexibility and the option to explore various avenues, our non-exclusive
              representation allows you to list your property with us while also
              engaging with other agents.
            </p>
            <ul className="list-disc pl-5 mb-4 text-sm md:text-base">
              <li>Experience a Swift Transaction</li>
              <li>Expertise at Your Fingertips</li>
              <li>Efficient Service</li>
            </ul>

            {/* Call to Action */}
            <h3 className="text-base md:text-lg font-semibold mt-4">
              Ready to Explore Your Options?
            </h3>
            <p className="text-sm md:text-base">
              Whether you choose non-exclusive or exclusive representation, The Real
              Realtor is committed to delivering exceptional service and results.
              Contact us today to discuss your needs and discover the best approach
              for selling or renting your property!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
