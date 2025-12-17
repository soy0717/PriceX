// Inventory page

import { useState, useEffect } from 'react';
import { Search, Eye, Trash2, RotateCw, FileText, TrendingUp, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'price_prediction', 'ad_generation'
  const [loading, setLoading] = useState(true);
  
  // Dummy data representing stored user history from backend
  const [items, setItems] = useState([
    {
      id: 1,
      date: '2024-01-15T10:30:00',
      product: 'Wireless Headphones',
      type: 'price_prediction',
      resultSummary: 'Rec. Price: $104.49',
      details: 'Analyzed against 4 competitors',
    },
    {
      id: 2,
      date: '2024-01-15T11:45:00',
      product: 'Wireless Headphones',
      type: 'ad_generation',
      resultSummary: '3 Ad Variations',
      details: 'Platform: Instagram, Tone: Witty',
    },
    {
      id: 3,
      date: '2024-01-14T09:15:00',
      product: 'Ergonomic Chair',
      type: 'price_prediction',
      resultSummary: 'Rec. Price: $299.99',
      details: 'Margin optimized for Q1',
    },
    {
      id: 4,
      date: '2024-01-12T14:20:00',
      product: 'Mechanical Keyboard',
      type: 'ad_generation',
      resultSummary: '5 Social Posts',
      details: 'Target audience: Gamers',
    },
  ]);

  // Simulation of Backend Fetch
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        // FETCH LOGIC:
        // Connect to your database table where you save results.
        // const response = await fetch('YOUR_API/user-history');
        // const data = await response.json();
        // setItems(data);
        
        setTimeout(() => setLoading(false), 800);
      } catch (error) {
        console.error("Failed to fetch history:", error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id) => {
    // DB Call to delete record
    setItems(items.filter(item => item.id !== id));
  };

  // Helper to render type badge
  const getTypeBadge = (type) => {
    if (type === 'price_prediction') {
      return (
        <span className="badge badge-blue flex items-center gap-2">
          <TrendingUp size={14} /> Price Analysis
        </span>
      );
    }
    return (
      <span className="badge badge-purple flex items-center gap-2">
        <FileText size={14} /> Ad Campaign
      </span>
    );
  };

  return (
    <div className="inventory-page">
      <div className="page-header">
        <h1>Saved Activity</h1>
        <p>Retrieve your past price predictions and generated marketing content</p>
      </div>

      <div className="inventory-summary">
        <Card>
          <h3>Dashboard</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <div>
                <p className="summary-label">Total Records</p>
                <p className="summary-value">{items.length}</p>
              </div>
            </div>
            <div className="summary-item">
              <div>
                <p className="summary-label">Prices Analyzed</p>
                <p className="summary-value">
                  {items.filter(i => i.type === 'price_prediction').length}
                </p>
              </div>
            </div>
            <div className="summary-item">
              <div>
                <p className="summary-label">Ads Generated</p>
                <p className="summary-value">
                  {items.filter(i => i.type === 'ad_generation').length}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="inventory-controls">
        <div className="controls-row">
          <Input
            type="text"
            placeholder="Search by Product Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
          
          <div className="filter-wrapper">
            <Filter size={18} className="filter-icon"/>
            <select 
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Activities</option>
              <option value="price_prediction">Price Predictions</option>
              <option value="ad_generation">Ad Campaigns</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="inventory-table-card">
        {loading ? (
           <div className="loading-state">
             <RotateCw className="spin-animation" />
             <p>Retrieving history...</p>
           </div>
        ) : filteredItems.length > 0 ? (
          <div className="table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product Name</th>
                  <th>Activity Type</th>
                  <th>Result Summary</th>
                  <th>Notes</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id}>
                    <td className="text-muted">
                      {new Date(item.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="product-cell font-medium">{item.product}</td>
                    <td>{getTypeBadge(item.type)}</td>
                    <td className="font-medium">{item.resultSummary}</td>
                    <td className="text-muted small-text">{item.details}</td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button 
                          className="action-btn primary" 
                          title="Retrieve Full Result"
                          onClick={() => console.log('Open modal with full details for:', item.id)}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="action-btn danger" 
                          onClick={() => handleDelete(item.id)}
                          title="Delete Record"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>No saved history found.</p>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Inventory;