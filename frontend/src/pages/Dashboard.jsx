import { useState, useEffect } from 'react';
import BugForm from '../components/BugForm';
import BugList from '../components/BugList';
import { getBugs } from '../utils/api';
import { Header } from '../components/Header';

function Dashboard({ user, onLogout }) {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    severity: ''
  });
  const [searchTerm, setSearchTerm] = useState(''); // New state for debounced search

  const loadBugs = async () => {
    try {
      setLoading(true);
      const bugsData = await getBugs(filters);
      setBugs(bugsData);
    } catch (error) {
      console.error('Failed to load bugs:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log("bugs",bugs)

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prevFilters => ({
        ...prevFilters,
        search: searchTerm
      }));
      setLoading(true)
    }, 1000); // 500ms delay

    return () => {
      setLoading(false)
      clearTimeout(handler);
    };
  }, [searchTerm]);


  useEffect(() => {
    loadBugs();
  }, [filters]);



  const handleBugCreated = () => {
    setShowForm(false);
    loadBugs();
  };

  const handleBugUpdated = () => {
    loadBugs()
    setFilters(prevFilters => ({ ...prevFilters }));
  };

  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">
              {user.role === 'admin' ? 'All Bug Reports' : 'My Bug Reports'}
            </h1>
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : 'Report Bug'}
            </button>
          </div>

          {showForm && (
            <BugForm
              onSuccess={handleBugCreated}
              onCancel={() => setShowForm(false)}
            />
          )}

          <BugList
            bugs={bugs}
            loading={loading}
            filters={{ ...filters, search: searchTerm }} 
            onFiltersChange={setFilters}
            onBugUpdated={handleBugUpdated}
            userRole={user.role}
            onSearchChange={setSearchTerm} 
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;