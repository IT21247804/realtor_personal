import React from 'react';
import ConciergeServiceItem from './ConciergeServiceItem';

const ConciergeService = () => {
  const services = [
    {
      image: '/images/consultation.jpg',
      title: 'Concierge Service',
      text: [
        [
          { content: 'The Real Realtor’s concierge service is designed to provide a seamless, personalized, and stress-free experience for both property buyers and sellers.', bold: false },
        ],
        [
          { content: 'Here’s a breakdown of the key elements:', bold: true },
        ],
      ],
    },
    {
      image: '/images/Concierge_Service.jpg',
      title: 'Personalized Consultation',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: 'In-depth consultation to understand needs, preferences, budget, and timeline.', bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: 'Thorough assessment of the property and market analysis to determine the optimal listing price.', bold: false },
        ],
      ],
    },
    {
      image: '/images/vetting.jpg',
      title: 'Property Vetting',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: 'We only present properties that have undergone our rigorous screening process.', bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: 'We ensure all legal documentation is in order and suggest necessary improvements.', bold: false },
        ],
      ],
    },
    {
      image: '/images/market.jpg',
      title: 'Market Analysis and Pricing',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: 'Detailed market analysis to ensure a fair price and negotiate the best deal.', bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: 'Comprehensive market analysis to set a competitive yet fair price.', bold: false },
        ],
      ],
    },
    {
      image: '/images/presentation.jpg',
      title: 'Property Presentation',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: 'Private viewings and virtual tours to help make informed decisions.', bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: 'Professional marketing, including photography, staging, and open houses.', bold: false },
        ],
      ],
    },
    {
      image: '/images/expert.jpeg',
      title: 'Expert Negotiation',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: 'Negotiations to secure the best possible terms and conditions.', bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: 'Negotiations to achieve the highest price and favorable terms.', bold: false },
        ],
      ],
    },
    {
      image: '/images/legal.jpg',
      title: 'Legal and Financial Support',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: 'Assistance with legal and financial aspects to ensure a smooth process.', bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: 'Coordination of legal paperwork and financial transactions.', bold: false },
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
          { content: 'Support through the closing process and advice on reinvestment.', bold: false },
        ],
      ],
    },
    {
      image: '/images/accessibility.jpg',
      title: 'Convenience and Accessibility',
      text: [
        [
          { content: 'For Buyers: ', bold: true },
          { content: 'Flexible appointments, including evenings and weekends.', bold: false },
        ],
        [
          { content: 'For Sellers: ', bold: true },
          { content: 'Consultations conducted at their convenience.', bold: false },
        ],
      ],
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-8">Concierge Service</h2>
      <div className=" gap-4">
        {services.map((service, index) => (
          <ConciergeServiceItem
            key={index}
            image={service.image}
            title={service.title}
            text={service.text}
          />
        ))}
      </div>
    </div>
  );
};

export default ConciergeService;
