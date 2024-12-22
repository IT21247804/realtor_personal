import React from 'react';
import Card from './Card';

const OurTeam = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-8">Our Team</h2>
      <div className="flex flex-col md:flex-row justify-around items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          image="/images/ceo.png"
          altText="Team Member 1"
          name="SALINDU HETTIARACHCHI"
          title="CEO / FOUNDER"
        />
        <Card
          image="/images/ceo.png"
          altText="Team Member 2"
          name="MILAN MADUSHAN"
          title="DIRECTOR OF PROPERTY MANAGEMENT"
        />
        <Card
          image="/images/ceo.png"
          altText="Team Member 3"
          name="KOKULRAJAH (RAJ)"
          title=" COO"
        />
        
        <Card
          image="/images/ceo.png"
          altText="Team Member 3"
          name="NAVINDU HETTIARACHCHI"
          title=" CHRO"
        />
        <Card
          image="/images/ceo.png"
          altText="Team Member 3"
          name="PULASTHA AMARPALA"
          title="PROPERTY ACQUISITION MANAGER & CONSULTANT"
        />
        <Card
          image="/images/ceo.png"
          altText="Team Member 3"
          name="ISHAN BANDARA"
          title=" HEAD OF DIGITAL MARKETING"
        />
        
        <Card
          image="/images/ceo.png"
          altText="Team Member 3"
          name="CHAMITH HARISHCHANDRA"
          title=" ATTORNEY AT LAW"
        />
        <Card
          image="/images/ceo.png"
          altText="Team Member 3"
          name=" SARANGI KITHMINI"
          title=" HEAD OF R&D"
        />
        </div>
      </div>
    </div>
  );
};

export default OurTeam;