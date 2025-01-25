import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profileImage: null,
  });
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      alert('Error fetching users');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    const { name, email, phone } = formData;
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!name || !nameRegex.test(name)) {
      alert('Name should only contain alphabets and spaces');
      return false;
    }
    if (!phone || !phoneRegex.test(phone)) {
      alert('Enter a valid 10-digit Indian phone number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await axios.post('http://localhost:5000/users', data);
      fetchUsers();
      alert('User created successfully');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers();
    } catch (error) {
      alert('Error deleting user');
    }
  };

  return (
    <div style={styles.container}>
      <button
        onClick={() => setShowDashboard(!showDashboard)}
        style={styles.toggleButton}
      >
        {showDashboard ? 'Show User Form' : 'Show Dashboard'}
      </button>

      {showDashboard ? (
        <Dashboard users={users} deleteUser={deleteUser} />
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.formTitle}>Create User</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleInputChange}
            style={styles.inputFile}
            required
          />
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f4f4f9',
  },
  toggleButton: {
    marginBottom: '20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
  },
  formTitle: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    width: '100%',
    transition: 'border-color 0.3s ease',
  },
  inputFile: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default UserForm;
