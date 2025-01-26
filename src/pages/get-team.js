import React, { useEffect, useState } from "react";
import { notification, Row, Col, Spin, Button } from "antd";
import { TeamCard } from "./team-card";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const TeamList = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_MYSQL_ENDPOINT}/get-team`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }

        const data = await response.json();
        
        const updatedTeamMembers = data.map(member => ({
          ...member,
          image: `${process.env.REACT_APP_MYSQL_ENDPOINT}/${member.image}`,
        }));

        setTeamMembers(updatedTeamMembers);
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_MYSQL_ENDPOINT}/delete-team/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete team member");
      }

      setTeamMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );

      notification.success({
        message: "Success",
        description: "Team member deleted successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error Deleting Team Member",
        description: error.message,
      });
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {teamMembers.map((member) => (
          <Col span={8} key={member.id}>
            <TeamCard
              name={member.name}
              role={member.role}
              image={member.image}
            />
            <Button
              type="danger"
              onClick={() => handleDelete(member.id)}
              style={{ marginTop: 10 }}
            >
              Delete
            </Button>
            <Link to={`/dashboard/update-team/${member.id}`}>
              <Button
                type="primary"
                style={{ marginTop: 10, marginLeft: 10 }}
              >
                Update
              </Button>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};
