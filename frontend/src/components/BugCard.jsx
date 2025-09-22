import React, { useState } from 'react';
import { updateBugStatus } from '../utils/api';

const BugCard = ({ bug, onUpdate, userRole }) => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("")


  const handleStatusUpdate = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      await updateBugStatus(bug._id, newStatus);
      onUpdate();
      console.log(`Updating bug ${bug._id} to status: ${newStatus}`);
      setTimeout(() => {
        setUpdating(false);
        onUpdate();
      }, 500);
    } catch (error) {
    setError("Failed to update. You should be admin to update status")
      console.error('Failed to update bug:', error);
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-500';
      case 'in progress':
        return 'bg-yellow-500';
      case 'closed':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{bug.title}</h3>
        <div className="flex items-center space-x-2">
          <span className={`text-white px-3 py-1 rounded-full text-xs font-medium ${getSeverityClass(bug.severity)}`}>
            {bug.severity}
          </span>
          <span className={`text-white px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(bug.status)}`}>
            {bug.status}
          </span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{bug.description}</p>
      
      {userRole === 'admin' && bug.reporter && (
        <div className="text-sm text-gray-600 mb-4">
          Reported by: {bug.reporter.username}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4 text-xs text-gray-600">
        <span>Created: {formatDate(bug.createdAt)}</span>
        <span>Updated: {formatDate(bug.updatedAt)}</span>
      </div>
      
      <div className="flex items-center space-x-4">
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
          value={bug.status}
          onChange={handleStatusUpdate}
          disabled={updating}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        {updating && <span className="text-xs text-gray-500">Updating...</span>}
      </div>
    </div>
  );
};

export default BugCard;
