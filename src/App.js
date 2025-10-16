import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://car-api-backend-dockerfile.onrender.com/api/car'; // Update if port is different

function App() {
  const [cars, setCars] = useState([]);
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [editingCar, setEditingCar] = useState(null);

  // Fetch all cars
  const fetchCars = async () => {
    try {
      const res = await axios.get(`${API_BASE}`);
      setCars(res.data);
    } catch (err) {
      console.error('Error fetching cars:', err.message);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Add new car
  const handleAdd = async () => {
    try {
      await axios.post(API_BASE, { model, year: parseInt(year) });
      setModel('');
      setYear('');
      fetchCars();
    } catch (err) {
      console.error('Error adding car:', err.message);
    }
  };

  // Update car
  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE}/${editingCar.id}`, {
        model,
        year: parseInt(year),
      });
      setModel('');
      setYear('');
      setEditingCar(null);
      fetchCars();
    } catch (err) {
      console.error('Error updating car:', err.message);
    }
  };

  // Delete car
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchCars();
    } catch (err) {
      console.error('Error deleting car:', err.message);
    }
  };

  const startEdit = (car) => {
    setModel(car.model);
    setYear(car.year);
    setEditingCar(car);
  };

  return (
  <div style={{
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
  }}>
    <div style={{
      width: '100%',
      maxWidth: '600px',
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>🚗 Car Inventory</h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '1rem'
      }}>
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          style={{
            flex: '1',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            minWidth: '120px'
          }}
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{
            flex: '1',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            minWidth: '120px'
          }}
        />
        {editingCar ? (
          <button
            onClick={handleUpdate}
            style={{
              padding: '10px 16px',
              backgroundColor: '#ffc107',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            style={{
              padding: '10px 16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Add
          </button>
        )}
      </div>

      {cars.map((car) => (
        <div key={car.id} style={{
          backgroundColor: '#f1f1f1',
          borderRadius: '10px',
          padding: '12px 16px',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '16px' }}>{car.model} ({car.year})</span>
          <div>
            <button
              onClick={() => startEdit(car)}
              style={{
                backgroundColor: '#ffc107',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 10px',
                marginRight: '5px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(car.id)}
              style={{
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 10px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default App;
