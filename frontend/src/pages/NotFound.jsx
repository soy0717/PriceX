// Not Found page

import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <div className="notfound-content">
          <h1 className="notfound-code">404</h1>
          <h2 className="notfound-title">Page Not Found</h2>
          <p className="notfound-message">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/dashboard">
            <Button variant="primary" size="large">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
