import { AddListingForm } from "../modules/client/add-listing/add-listing-form";

const AddListing = () => {
  return (
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden "
    >
      {/* Background image */}
      <img
        src="/images/add-listing.jpeg"
        alt="cover"
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute h-screen top-0 left-0 right-0 bottom-0 bg-slate-950/30 z-0 " />

      {/* Content */}
      <div className="z-20 flex w-4/5 h-4/5 space-x-10">
        {/* Left side: White box with text */}
        <div className="w-1/3 bg-white flex flex-col justify-center items-center p-4 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 text-center leading-snug">
            SELL / RENT YOUR PROPERTY <br /> WITH THE REAL REALTOR
          </h1>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <AddListingForm />
        </div>

        {/* Right side: Scrollable content */}
        <div className="w-1/3 bg-white flex flex-col p-4 rounded-lg shadow-lg overflow-y-auto max-h-full">
          <div className="text-gray-800">
            <h2 className="text-xl font-bold mb-4">
              Sell or Rent Your Property with The Real Realtor
            </h2>
            <p className="mb-4">
              Are you looking to sell or rent your property effectively? At The
              Real Realtor, we offer two tailored options to suit your needs:
              Exclusive Representation and Non-Exclusive Representation. Discover
              how each option can optimize your property transaction and why
              partnering with The Real Realtor can make all the difference.
            </p>
            <h3 className="text-lg font-semibold mt-4">Option 01 - Exclusive Representation</h3>
            <p className="mb-4">
              <strong>Why Choose an Exclusive Agent?</strong> Choosing exclusive
              representation with The Real Realtor means you are entrusting us as
              your sole agent to handle all aspects of selling or renting your
              property. Here’s why this approach is advantageous:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Dedicated Focus</li>
              <li>Priority Attention</li>
              <li>Streamlined Communication</li>
              <li>Enhanced Marketing</li>
              <li>Expert Negotiation</li>
              <li>Resource Investment</li>
            </ul>
            <p className="mb-4">
              <strong>Why Exclusivity Matters</strong> Having multiple agents working
              on your property might seem advantageous, but it can dilute the focus
              and effectiveness of the marketing efforts. An exclusive agreement
              ensures that The Real Realtor dedicates all resources to your property,
              leading to a more efficient and successful transaction.
            </p>

            <h3 className="text-lg font-semibold mt-4">Option 02 - Non-Exclusive Representation</h3>
            <p className="mb-4">
              <strong>Why Choose Non-Exclusive Representation?</strong> If you prefer
              flexibility and the option to explore various avenues, our non-exclusive
              representation allows you to list your property with us while also
              engaging with other agents. Here’s how this option can work for you:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Experience a Swift Transaction</li>
              <li>Expertise at Your Fingertips</li>
              <li>Efficient Service</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">Ready to Explore Your Options?</h3>
            <p>
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
