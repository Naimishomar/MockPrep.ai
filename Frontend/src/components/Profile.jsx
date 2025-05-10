import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:8000/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },        
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch user profile');
      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="text-center p-4 mt-15">Loading profile...</div>;
  if (!user) return <div className="text-center p-4 mt-15">No user data found</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-15">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.profilePicture || 'https://via.placeholder.com/100'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-3 text-gray-800">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Contact:</strong> {user.contactNumber}</p>

        <div className="mt-4">
          <h2 className="font-bold text-lg">Subscription Details</h2>
          {user.subscription?.isActive ? (
            <div className="text-green-700">
              <p><strong>Plan:</strong> {user.subscription.plan}</p>
              <p><strong>Subscribed At:</strong> {new Date(user.subscription.subscribedAt).toLocaleDateString()}</p>
              <p><strong>Expires At:</strong> {new Date(user.subscription.expiresAt).toLocaleDateString()}</p>
            </div>
          ) : (
            <p className="text-red-600">No active subscription</p>
          )}
        </div>

        <div className="mt-4">
          <h2 className="font-bold text-lg">Account Info</h2>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
