// Profile page

import { useContext } from 'react';
import { User, Mail, Shield, Calendar, Settings, Bell } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

function Profile() {
  const { user } = useContext(AuthContext);

  // Mock data for display if not present in user object
  const userDetails = {
    username: user?.username || 'Guest User',
    email: user?.email || 'user@example.com',
    role: user?.role || 'Standard Plan',
    joinDate: 'January 2024',
    location: 'New York, USA'
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="profile-grid">
        {/* User Info Card */}
        <div className="profile-left">
          <Card className="profile-card">
            <div className="profile-header-section">
              <div className="profile-avatar-large">
                <User size={48} />
              </div>
              <div className="profile-info-primary">
                <h2>{userDetails.username}</h2>
                <p className="text-muted">{userDetails.role}</p>
              </div>
            </div>
            
            <div className="profile-details-list">
              <div className="profile-detail-item">
                <Mail size={18} className="text-muted" />
                <span>{userDetails.email}</span>
              </div>
              <div className="profile-detail-item">
                <Shield size={18} className="text-muted" />
                <span>{userDetails.role}</span>
              </div>
              <div className="profile-detail-item">
                <Calendar size={18} className="text-muted" />
                <span>Member since {userDetails.joinDate}</span>
              </div>
            </div>

            <div className="profile-actions">
              <Button variant="primary" className="w-full">Edit Profile</Button>
            </div>
          </Card>
        </div>

        {/* Settings & Preferences */}
        <div className="profile-right">
          <Card title="Account Settings">
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon-wrapper">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h4>Notifications</h4>
                    <p className="text-small text-muted">Manage your email alerts</p>
                  </div>
                </div>
                <Button variant="ghost" size="small">Configure</Button>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon-wrapper">
                    <Settings size={20} />
                  </div>
                  <div>
                    <h4>General Preferences</h4>
                    <p className="text-small text-muted">Language and timezone</p>
                  </div>
                </div>
                <Button variant="ghost" size="small">Update</Button>
              </div>
            </div>
          </Card>

          <Card title="Subscription" className="mt-4">
            <div className="subscription-info">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Current Plan</span>
                <span className="badge badge-success">Active</span>
              </div>
              <p className="text-muted mb-4">You are currently on the {userDetails.role}.</p>
              <Button variant="secondary" size="small">Upgrade Plan</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;