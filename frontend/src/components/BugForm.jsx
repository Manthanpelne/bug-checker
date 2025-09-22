import React, { useState } from 'react';
import { createBug } from '../utils/api';

const BugForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Low'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createBug(formData);
      onSuccess();
      console.log('Creating bug with data:', formData);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        onSuccess();
      }, 500);
    } catch (err) {
      setError(err.message || 'Failed to create bug report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-white mb-20 rounded-lg shadow-md p-8 w-full max-w-lg mx-auto border border-gray-200" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Report New Bug</h2>
      
      {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
      
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-800">Title *</label>
        <input
          type="text"
          name="title"
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-base transition-colors duration-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-800">Description *</label>
        <textarea
          name="description"
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-base transition-colors duration-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-800">Severity</label>
        <select
          name="severity"
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-base transition-colors duration-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          value={formData.severity}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button 
          type="submit" 
          className={`w-full px-6 py-3 bg-blue-600 text-white rounded-md font-medium cursor-pointer transition-colors duration-200 hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Bug Report'}
        </button>
        <button 
          type="button" 
          className="w-full px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium transition-colors duration-200 hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default BugForm;
