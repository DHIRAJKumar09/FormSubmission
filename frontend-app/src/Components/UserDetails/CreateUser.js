import React, { useState } from 'react';
import { createUser } from '../../Services/api'

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('profileImage', profileImage);

    try {
      await createUser(formData);
      setMessage('User created successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setProfileImage(null);
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data.error : 'Server error'}`);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="^\d{10}$" // Regex for 10-digit number
          />
        </div>
        <div>
          <label>Profile Image:</label>
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png, image/webp"
            onChange={(e) => setProfileImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
