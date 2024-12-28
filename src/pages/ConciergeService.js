import React from 'react';
import ConciergeServiceItem from './ConciergeServiceItem';

const ConciergeService = () => {
  const introText = [
    { content: 'The Real Realtor’s concierge service is designed to provide a seamless, personalized, and stress-free experience for both property buyers and sellers.', bold: false },
    { content: 'Here’s a breakdown of the key elements', bold: true },
  ];
  const services = [
    
    {
      image: '/images/Concierge_Service.jpg',
      title: 'Personalized Consultation',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: `We begin with an in-depth consultation to understand the buyers needs, preferences,
 budget, and timeline. This includes a discussion on the type of property they are looking for, preferred
 locations, and any specific requirements.`, bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: `We conduct a thorough assessment of the property, including a market analysis to
 determine the optimal listing price. We also discuss the seller’s goals, timeline, and any specific
 requirements for the sale.`, bold: false },
        ],
      ],
    },
    {
      image: '/images/vetting.jpg',
      title: 'Property Vetting',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: `We only present properties that have undergone our rigorous screening process. This
 includes verifying ownership, checking legal compliance, and ensuring the property is free from any
 encumbrances.`, bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: `We help ensure that all legal documentation is in order and that the property is market
ready. This includes suggesting any necessary repairs or improvements to maximize the property value.`, bold: false },
        ],
      ],
    },
    {
      image: '/images/market.jpg',
      title: 'Market Analysis and Pricing',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: `We provide detailed market analysis to ensure buyers are paying a fair price for the
 property. We negotiate on their behalf to secure the best possible deal.`, bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: `We offer a comprehensive market analysis to set a competitive yet fair price. We strategize
 to position the property in the market for maximum visibility and appeal.`, bold: false },
        ],
      ],
    },
    {
      image: '/images/presentation.jpg',
      title: 'Property Presentation',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: `We arrange private viewings and virtual tours, providing detailed information and
 professional advice to help buyers make informed decisions.`, bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: `We handle all aspects of property marketing, including professional photography, staging,
 and listing the property on relevant platforms. We also manage open houses and private showings,
 ensuring the property is presented in the best light.`, bold: false },
        ],
      ],
    },
    {
      image: '/images/expert.jpeg',
      title: 'Expert Negotiation',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: `Our experienced agents handle all negotiations, ensuring that buyers get the best possible
 terms and conditions. We work to protect their interests at every stage of the transaction.`, bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: `We negotiate with potential buyers on behalf of the seller to achieve the highest possible
 price and favorable terms, keeping the seller’s objectives at the forefront.`, bold: false },
        ],
      ],
    },
    {
      image: '/images/legal.jpg',
      title: 'Legal and Financial Support',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: `We assist with the legal and financial aspects of the transaction, including coordinating
 with lawyers, banks, and other relevant parties to ensure a smooth process.`, bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: `We help coordinate the legal paperwork and financial transactions, ensuring that
 everything is in order for a successful sale.`, bold: false },
        ],
      ],
    },
    {
      image: '/images/endtoend.jpg',
      title: 'End-to-End Support',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: 'Post-sale services like moving, renovations, and settling in.', bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: `We continue to support the seller through the closing process, ensuring all final details are
 managed efficiently. We also offer advice on reinvesting the proceeds or finding a new property if needed.`, bold: false },
        ],
      ],
    },
    {
      image: '/images/accessibility.jpg',
      title: 'Convenience and Accessibility',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: `Our concierge service is designed to fit into the buyer’s schedule. 
We offer flexible appointment times, including evenings and weekends, and can 
arrange meetings at a location convenient for the buyer.`, bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: `We bring the process to the seller, minimizing the need for them to 
travel or disrupt their daily routine. All consultations, assessments, and 
negotiations can be conducted in the comfort of their home or office.`, bold: false },
        ],
      ],
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <h2 className="mb-6 text-xl md:text-4xl lg:text-6xl transition-all ease-in-out duration-500 uppercase font-semibold md:font-bold text-[#272c63] tracking-widest title-font">Concierge Service</h2>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 m-4">
        {introText.map((paragraph, index) => (
          <p key={index} className="mb-4 text-center">
            {paragraph.bold ? (
              <strong>{paragraph.content}</strong>
            ) : (
              <span>{paragraph.content}</span>
            )}
          </p>
        ))}
      </div>
      <div className="gap-4">
        {services.map((service, index) => (
          <ConciergeServiceItem
            key={index}
            image={service.image}
            title={service.title}
            text={service.text}
            reverse={index % 2 !== 0} // Reverse layout for odd-indexed items
          />
        ))}
      </div>
    </div>
  );
};

export default ConciergeService;
