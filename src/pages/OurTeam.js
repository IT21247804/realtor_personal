import React, { useState, useEffect } from 'react';
import Card from './Card';
import { notification } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true
    });
  }, []);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/get-team`);
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }

        const data = await response.json();
        // Map over the data to update team members state
        setTeamMembers(data);
      } catch (error) {
        notification.error({
          message: "Error Fetching Team Members",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  // Calculate number of items per row based on screen size
  const itemsPerRow = {
    lg: 3, // large screens
    md: 2, // medium screens
    sm: 1  // small screens
  };

  // Create array of rows
  const createRows = (members) => {
    const rows = [];
    const perRow = window.innerWidth >= 1024 ? itemsPerRow.lg : 
                   window.innerWidth >= 768 ? itemsPerRow.md : 
                   itemsPerRow.sm;
    
    for (let i = 0; i < members.length; i += perRow) {
      rows.push(members.slice(i, i + perRow));
    }
    return rows;
  };

  const rows = createRows(teamMembers);

  return (
    <div className="p-4 justify-items-center">
      <h2 
        className="mb-6 text-xl md:text-4xl lg:text-6xl transition-all ease-in-out duration-500 uppercase font-semibold md:font-bold text-[#272c63] tracking-widest title-font text-center"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        Our Team
      </h2>
      <div className="container">
        {rows.map((row, rowIndex) => (
          <div 
            key={rowIndex}
            className="flex flex-wrap justify-center mb-6"
            data-aos="fade-up"
            data-aos-delay={rowIndex * 200}
            data-aos-duration="1000"
          >
            {row.map((member) => (
              <div 
                key={member.id}
                className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8"
              >
                <Card
                  image={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${member.image}`}
                  altText={`Team Member ${member.id}`}
                  name={member.name}
                  title={member.role}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;