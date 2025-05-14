import React, { useEffect, useState } from 'react';
import Squares from './reactBitsComponents/Squares';
import { Link } from 'react-router-dom';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);


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
    <div className='w-full mb-5 flex flex-col items-center justify-center py-5 mx-5 lg:mx-10 shadow-xl rounded-xl mt-20 text-white relative'>
      {/* <div style={{ width: '100%', height: '100%', position: 'absolute'}}>
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={10}
          amplitude={3.0}
          speed={0.5}
        />
      </div> */}
      <div className='w-full h-full absolute'>
          <Squares 
            speed={0.5} 
            squareSize={30}
            direction='diagonal'
            borderColor='gray'
            hoverFillColor='white'
        />
      </div>
    <div className="w-150 backdrop-blur-md shadow-2xl p-7 rounded-xl">
      <div className="flex items-center space-x-4 mb-6">
        {(user.gender == 'Male') ? (
          <img
          src={user.profilePicture || 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid&w=740'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
          />
        ):(
          <img
          src={user.profilePicture || 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
          />
        )}
        <div>
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <p className="text-blue-500">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-3">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact:</strong> {user.contactNumber}</p>
          {(update)?
          <>
            <div className='flex space-x-50'>
              <p><strong>Age:</strong><input type="text" placeholder='Your Age'/></p>
              <p><strong>Gender:</strong><input type="text" placeholder='Your Gender' /></p>
            </div>
            <p><strong>College:</strong><input type="text" placeholder='College Name'/></p>
          </>:
          <>
            <div className='flex space-x-50'>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
            </div>
            <p><strong>College:</strong> {user.college}</p>
          </>
          }

        <div className="mt-4">
          <h2 className="font-bold text-lg">Subscription Details:</h2>
          {user.subscription==='Unsubscribed' ? (
            <div className="text-green-700">
              <p><strong>Plan:</strong> {user.subscription.plan}</p>
              <p><strong>Subscribed At:</strong> {new Date(user.subscription.subscribedAt).toLocaleDateString()}</p>
              <p><strong>Expires At:</strong> {new Date(user.subscription.expiresAt).toLocaleDateString()}</p>
            </div>
          ) : (
            <div>
              <p className="text-red-600">No active subscription</p>
              <Link to='/subscription'><button className='bg-blue-400 px-3 py-1 rounded cursor-pointer hover:bg-blue-500'>Subscribe Now</button></Link>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h2 className="font-bold text-lg">Account Info:</h2>
          <p><strong>Account created on:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <p><strong>Profile updated on:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
        </div>
          <button className='w-full px-4 py-2 bg-blue-500 rounded-sm space-x-2 text-xl'><span className='font-semibold' onClick={()=>setUpdate(true)}>Update</span><i class="ri-pencil-line font-light"></i></button>
      </div>
    </div>
    </div>
  );
};

export default Profile;
