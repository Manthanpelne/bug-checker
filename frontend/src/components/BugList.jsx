import BugCard from './BugCard';

function BugList({ bugs, loading, filters, onFiltersChange, onBugUpdated, user, onSearchChange }) {

  const handleFilterChange = (key, value) => {
    onFiltersChange(prevFilters => ({
      ...prevFilters,
      [key]: value
    }));
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold text-gray-700">Loading bugs...</div>;
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-start gap-4 p-4 bg-gray-100 rounded-lg shadow-inner mb-6">
        <div className="flex flex-col w-full sm:w-auto">
          <label htmlFor="search" className="text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            id="search"
            type="text"
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            placeholder="Search by title..."
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col w-full sm:w-auto">
          <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        
        <div className="flex flex-col w-full sm:w-auto">
          <label htmlFor="severity" className="text-sm font-medium text-gray-700 mb-1">Severity</label>
          <select
            id="severity"
            className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            value={filters.severity}
            onChange={(e) => handleFilterChange('severity', e.target.value)}
          >
            <option value="">All Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Bug Grid */}
      {bugs.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-2">No bugs found 🐛</h3>
          <p className="text-gray-600">Try adjusting your search filters or report a new bug.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bugs.map(bug => (
            <BugCard
              key={bug.id}
              bug={bug}
              onUpdate={onBugUpdated}
              userRole={user?.role}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BugList;