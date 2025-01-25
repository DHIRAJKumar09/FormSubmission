import React from "react";

const Dashboard = ({ users, deleteUser }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Dashboard</h2>
      <div style={styles.userContainer}>
        {users.map((user) => (
          <div key={user._id} style={styles.card}>
            <div style={styles.cardContent}>
              <p style={styles.userInfo}><strong>Name:</strong> {user.name}</p>
              <p style={styles.userInfo}><strong>Email:</strong> {user.email}</p>
              <p style={styles.userInfo}><strong>Phone:</strong> {user.phone}</p>
              {user.profileImage && (
                <img
                  src={`http://localhost:5000/uploads/${user.profileImage}`}
                  alt={`${user.name}'s profile`}
                  style={styles.profileImage}
                />
              )}
            </div>
            <button
              onClick={() => deleteUser(user._id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "30px",
    fontWeight: "600",
  },
  userContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px",
    padding: "10px",
    justifyItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    maxWidth: "300px",
  },
  cardContent: {
    marginBottom: "15px",
  },
  userInfo: {
    marginBottom: "10px",
    fontSize: "1rem",
    color: "#333",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "50%",
    marginTop: "10px",
    marginBottom: "20px",
    border: "3px solid #f1f1f1",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    outline: "none",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
  },
  deleteButtonHover: {
    backgroundColor: "#ff3333",
    transform: "scale(1.1)",
  },
};

// Adding hover effects to cards and buttons
const enhanceCard = (styles) => {
  return {
    ...styles,
    "&:hover": styles.cardHover,
  };
};

export default Dashboard;
