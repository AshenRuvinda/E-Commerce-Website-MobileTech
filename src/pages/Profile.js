import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', bio: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setFormData({ name: data.name || '', bio: data.bio || '' });
          } else {
            setError('No user data found.');
          }
        } else {
          navigate('/login');
        }
      } catch (err) {
        setError('Error fetching user data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Name is required.');
      return;
    }
    try {
      const user = auth.currentUser;
      await updateDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        bio: formData.bio,
        updatedAt: new Date().toISOString(),
      });
      setUserData({ ...userData, name: formData.name, bio: formData.bio });
      setSuccess('Profile updated successfully!');
      setEditMode(false);
    } catch (err) {
      setError('Error updating profile: ' + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      setError('Error logging out: ' + err.message);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Placeholder for theme persistence (e.g., save to Firestore)
  };

  // Get the first letter of the username for the avatar
  const avatarLetter = userData?.name ? userData.name.charAt(0).toUpperCase() : '?';

  if (loading) {
    return (
      <motion.div
        className="profile-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`profile-container ${isDarkMode ? 'dark-mode' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-card">
        <motion.div
          className="profile-header"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="profile-pic-container">
            <div className="profile-avatar" aria-label="User avatar">
              {avatarLetter}
            </div>
          </div>
          <h2>{userData?.name || 'User Profile'}</h2>
          <p className="profile-email">{userData?.email}</p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              className="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              className="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {success}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="profile-content">
          {editMode ? (
            <form onSubmit={handleProfileUpdate} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save Changes
                </motion.button>
                <motion.button
                  type="button"
                  className="cancel"
                  onClick={handleEditToggle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <p><strong>Name:</strong> {userData?.name || 'Not set'}</p>
              <p><strong>Bio:</strong> {userData?.bio || 'No bio provided.'}</p>
              <p><strong>Joined:</strong> {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown'}</p>
              <motion.button
                className="edit-profile"
                onClick={handleEditToggle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Edit profile"
              >
                Edit Profile
              </motion.button>
            </div>
          )}
        </div>

        <div className="profile-settings">
          <h3>Preferences</h3>
          <div className="setting-item">
            <span>Dark Mode</span>
            <button
              className={`toggle-switch ${isDarkMode ? 'active' : ''}`}
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <span className="toggle-slider"></span>
            </button>
          </div>
        </div>

        <div className="profile-orders">
          <h3>Order History</h3>
          <p>No orders found. <a href="/products">Shop now!</a></p>
        </div>

        <motion.button
          className="logout-button"
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Log out"
        >
          Log Out
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Profile;