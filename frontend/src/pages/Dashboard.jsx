// Dashboard page

import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TrendingUp, Package, DollarSign, Zap } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Updated 'teal' to 'blue' to match available CSS classes in App.css (emerald, blue, amber)
  const [stats, setStats] = useState([
    { icon: Package, label: 'Items Priced', value: 2847, color: 'blue' }, 
    { icon: DollarSign, label: 'Revenue Estimate', value: '$94.2K', color: 'emerald' },
    { icon: TrendingUp, label: 'Active Listings', value: 156, color: 'blue' },
    { icon: Zap, label: 'Success Rate', value: '98.5%', color: 'amber' },
  ]);

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const quote = "Accurate pricing is the key to maximizing profits and staying competitive in the market.";

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <h1 className="dashboard-greeting">
            {greeting}, <span className="dashboard-username">{user?.username}</span>!
          </h1>
          <p className="dashboard-date">{currentDate}</p>
          <p className="dashboard-quote">"{quote}"</p>
        </div>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className={`stat-card stat-card--${stat.color}`} hoverable>
              <div className="stat-content">
                <div className="stat-icon">
                  <Icon size={28} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="dashboard-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/price-analyzer" className="action-button action-button--primary">
            <div className="action-icon">
              <Zap size={28} />
            </div>
            <h3>Analyze Price</h3>
            <p>Get AI-powered pricing recommendations</p>
          </Link>

          <Link to="/marketing-studio" className="action-button action-button--secondary">
            <div className="action-icon">
              <TrendingUp size={28} />
            </div>
            <h3>Generate Ads</h3>
            <p>Create marketing campaigns instantly</p>
          </Link>

          <Link to="/inventory" className="action-button action-button--tertiary">
            <div className="action-icon">
              <Package size={28} />
            </div>
            <h3>View Inventory</h3>
            <p>Check your pricing history</p>
          </Link>
        </div>
      </div>

      <div className="dashboard-info">
        <Card>
          <h3>Getting Started with PriceX</h3>
          <p style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
            Welcome to PriceX, your intelligent pricing partner. Use our advanced analytics to optimize prices, maximize revenue, and stay competitive. Start by uploading a product to get personalized pricing recommendations powered by AI.
          </p>
          <Button 
            variant="primary" 
            size="small" 
            onClick={() => navigate('/price-analyzer')}
          >
            Start Analyzing
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;