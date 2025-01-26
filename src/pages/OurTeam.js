import React, { useState, useEffect } from 'react';
import Card from './Card';
import { notification } from 'antd'; // Import notification for error handling

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="p-4 justify-items-center">
      <h2 className="mb-6 text-xl md:text-4xl lg:text-6xl transition-all ease-in-out duration-500 uppercase font-semibold md:font-bold text-[#272c63] tracking-widest title-font">Our Team</h2>
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <Card
              key={member.id}  // Assuming you have an `id` field
              image={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${member.image}`} // Update image URL based on API
              altText={`Team Member ${member.id}`}
              name={member.name}
              title={member.role}  // Assuming the role is in the `role` field
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
