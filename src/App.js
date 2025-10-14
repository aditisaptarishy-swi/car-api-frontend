import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5065/api/car'; // Update if port is different

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
    <div style={{ padding: '2rem' }}>
      <h2>🚗 Car Inventory</h2>

      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      {editingCar ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleAdd}>Add</button>
      )}

      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.model} ({car.year}){' '}
            <button onClick={() => startEdit(car)}>Edit</button>
            <button onClick={() => handleDelete(car.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
