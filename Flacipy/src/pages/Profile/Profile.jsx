import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import './Profile.css'
import  API_BASE_URL  from '../../config/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    college: '',
    location: '',
    about: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Character limits
  const CHAR_LIMITS = {
    name: 50,
    position: 100,
    college: 100,
    location: 100,
    about: 500
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('userToken');
      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const userData = response.data.data;
        setUser(userData);
        // Initialize form data with user data
        setFormData({
          name: userData.name || '',
          position: userData.info?.position || '',
          college: userData.info?.college || '',
          location: userData.info?.location || '',
          about: userData.info?.about || ''
        });
      } else {
        setError(response.data.message || 'Failed to fetch user profile');
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(err.response?.data?.message || 'Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        position: user.info?.position || '',
        college: user.info?.college || '',
        location: user.info?.location || '',
        about: user.info?.about || ''
      });
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        name: user.name,
        position: user.info?.position || '',
        college: user.info?.college || '',
        location: user.info?.location || '',
        about: user.info?.about || ''
      });
    }
    setErrors({});
  };

  // Auto-save functionality
  const debouncedSave = useCallback(
    debounce(async (data) => {
      try {
        setAutoSaveStatus('Saving...');
        const token = localStorage.getItem('userToken');
        if (!token) return;

        const response = await axios.put(`${API_BASE_URL}/api/users/profile`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data.success) {
          setAutoSaveStatus('All changes saved');
          setUser(response.data.data);
          setTimeout(() => setAutoSaveStatus(''), 2000);
        } else {
          setAutoSaveStatus('Failed to save changes');
        }
      } catch (error) {
        setAutoSaveStatus('Failed to save changes');
        console.error('Auto-save error:', error);
      }
    }, 1000),
    []
  );

  // Validation function
  const validateField = (name, value) => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    if (value.length > CHAR_LIMITS[name]) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is too long`;
    }
    return '';
  };

  // Handle input change with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Trigger auto-save
    debouncedSave({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSave = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors before saving');
      return;
    }

    try {
      setIsSaving(true);
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('User not authenticated');
        return;
      }

      const response = await axios.put(`${API_BASE_URL}/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        // Update user state with new data
        const updatedUser = response.data.data;
        setUser(updatedUser);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      } else {
        toast.error(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  // Function to refresh profile data
  const refreshProfileData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUser(response.data.data);
        // Update form data if in editing mode
        if (isEditing) {
          setFormData({
            name: response.data.data.name,
            position: response.data.data.info?.position || '',
            college: response.data.data.info?.college || '',
            location: response.data.data.info?.location || '',
            about: response.data.data.info?.about || ''
          });
        }
      }
    } catch (err) {
      console.error('Error refreshing profile:', err);
      toast.error('Failed to refresh profile data');
    }
  };

  if (loading) {
    return <div className="profile-page"><p>Loading profile...</p></div>;
  }

  if (error) {
    return <div className="profile-page"><p className="text-red-500">Error: {error}</p></div>;
  }

 const skills = [
    { name: 'JavaScript', percentage: 85 },
    { name: 'React', percentage: 75 },
    { name: 'Node.js', percentage: 70 },
    { name: 'Python', percentage: 65 },
    { name: 'SQL', percentage: 60 }
  ]

  const dsaTopics = [
    { name: 'Arrays', color: '#10b981' },
    { name: 'Strings', color: '#10b981' },
    { name: 'Hash Tables', color: '#10b981' },
    { name: 'Trees', color: '#10b981' },
    { name: 'Linked Lists', color: '#eab308' },
    { name: 'Binary Search', color: '#eab308' },
    { name: 'Graphs', color: '#eab308' },
    { name: 'Dynamic Programming', color: '#ef4444' }
  ]

  const recentActivities = [
    {
      id: 1,
      title: 'Solved "Two Sum" Problem',
      description: 'Completed an easy array problem on LeetCode',
      tags: [{ name: 'Easy', color: '#10b981' }, { name: 'LeetCode', color: '#64748b' }],
      time: '2 hours ago',
      iconColor: '#10b981'
    },
    {
      id: 2,
      title: 'Completed React Project',
      description: 'Finished building a weather app using React and API integration',
      tags: [{ name: 'Project', color: '#3b82f6' }, { name: 'Frontend Mentor', color: '#64748b' }],
      time: 'Yesterday',
      iconColor: '#3b82f6'
    },
    {
      id: 3,
      title: 'Earned "Array Master" Badge',
      description: 'Solved 20 array-related problems',
      tags: [{ name: 'Achievement', color: '#eab308' }],
      time: '2 days ago',
      iconColor: '#eab308'
    },
    {
      id: 4,
      title: 'Started "Dynamic Programming" Course',
      description: 'Enrolled in advanced algorithms course',
      tags: [{ name: 'Learning', color: '#8b5cf6' }, { name: 'Codecademy', color: '#64748b' }],
      time: '3 days ago',
      iconColor: '#8b5cf6'
    },
    {
      id: 5,
      title: 'Participated in Weekly Coding Contest',
      description: 'Ranked in the top 30% of participants',
      tags: [{ name: 'Contest', color: '#ef4444' }, { name: 'CodeSignal', color: '#64748b' }],
      time: '5 days ago',
      iconColor: '#ef4444'
    }
  ]

  const badges = [
    { name: 'Problem Solver', icon: '⭐', bgColor: '#e0e7ff' },
    { name: '10 Day Streak', icon: '✓', bgColor: '#dcfce7' },
    { name: 'Array Master', icon: '✨', bgColor: '#fef3c7' },
    { name: 'SQL Ninja', icon: '🗃️', bgColor: '#dbeafe' },
    { name: 'Code Warrior', icon: '</>', bgColor: '#ede9fe' },
    { name: 'Locked', icon: '?', bgColor: '#f3f4f6' }
  ]

  const targetCompanies = [
    { name: 'Google', letter: 'G', interviews: 3, color: '#4285f4' },
    { name: 'Microsoft', letter: 'M', interviews: 2, color: '#00a1f1' },
    { name: 'Amazon', letter: 'A', interviews: 4, color: '#ff9900' }
  ]

  const upcomingInterviews = [
    {
      title: 'System Design Interview',
      time: 'Tomorrow, 2:00 PM',
      interviewer: 'With John D. (Senior Engineer at Google)'
    },
    {
      title: 'Algorithms & Data Structures',
      time: 'Friday, 10:00 AM',
      interviewer: 'With Sarah M. (Tech Lead at Amazon)'
    }
  ]

  const getAvatarLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'N/A';
  };

  return (
    <>
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <div className="avatar-icon" style={{ backgroundColor: '#6366f1', color: 'white' }}>
                {user && getAvatarLetter(user.name)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-content">
          <div className="profile-info">
            {!isEditing ? (
              <>
                <h1 className="profile-name">{user?.name || 'N/A'}</h1>
                <p className="profile-title">{user?.info?.position || 'N/A'}</p>
              </>
            ) : (
              <form onSubmit={handleSave} className={`profile-edit-form ${isDarkMode ? 'dark' : ''}`}>
                <div className="form-header">
                  <h2>Edit Profile</h2>
                  <button
                    type="button"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="theme-toggle"
                    aria-label="Toggle dark mode"
                  >
                    {isDarkMode ? '☀️' : '🌙'}
                  </button>
                </div>

                {autoSaveStatus && (
                  <div className="auto-save-indicator">
                    <span>🔄</span>
                    {autoSaveStatus}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    required
                    maxLength={CHAR_LIMITS.name}
                  />
                  {errors.name && <div className="error-message">{errors.name}</div>}
                  <div className="char-counter">
                    {formData.name.length}/{CHAR_LIMITS.name}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="position" className="form-label">Position</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`form-input ${errors.position ? 'error' : ''}`}
                    maxLength={CHAR_LIMITS.position}
                  />
                  {errors.position && <div className="error-message">{errors.position}</div>}
                  <div className="char-counter">
                    {formData.position.length}/{CHAR_LIMITS.position}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="college" className="form-label">College</label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className={`form-input ${errors.college ? 'error' : ''}`}
                    maxLength={CHAR_LIMITS.college}
                  />
                  {errors.college && <div className="error-message">{errors.college}</div>}
                  <div className="char-counter">
                    {formData.college.length}/{CHAR_LIMITS.college}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`form-input ${errors.location ? 'error' : ''}`}
                    maxLength={CHAR_LIMITS.location}
                  />
                  {errors.location && <div className="error-message">{errors.location}</div>}
                  <div className="char-counter">
                    {formData.location.length}/{CHAR_LIMITS.location}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="about" className="form-label">About Me</label>
                  <textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className={`form-input form-textarea ${errors.about ? 'error' : ''}`}
                    maxLength={CHAR_LIMITS.about}
                  />
                  {errors.about && <div className="error-message">{errors.about}</div>}
                  <div className="char-counter">
                    {formData.about.length}/{CHAR_LIMITS.about}
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-primary ${isSaving ? 'loading' : ''}`}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">Level: Intermediate</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{user?.info?.dailyStreak || 0} Day Streak</span>
              </div>
            </div>
            
            <div className="profile-actions">
              {!isEditing && (
                <button className="btn-primary" onClick={handleEditClick}>
                <span className="btn-icon">✏️</span>
                Edit Profile
              </button>
              )}
              <button className="btn-secondary">
                <span className="btn-icon">↗</span>
                Share Profile
              </button>
            </div>
          </div>
          
          <div className="profile-sections">
            <div className="section-row">
              <div className="section-card about-section">
                <h2 className="section-title">About Me</h2>
                <p className="about-text">
                  {user?.info?.about || 'No description available'}
                </p>
                <div className="profile-details">
                  <div className="detail-item">
                    <span className="detail-icon">💼</span>
                    <span className="detail-text">{user?.info?.position || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🎓</span>
                    <span className="detail-text">{user?.info?.college || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span className="detail-text">{user?.info?.location || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div className="section-card stats-section">
                <h2 className="section-title">Stats Overview</h2>
                <div className="stats-grid">
                  <div className="stat-box">
                    <div className="stat-number purple">187</div>
                    <div className="stat-label-small">Problems Solved</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number green">{user?.info?.dailyStreak || 0}</div>
                    <div className="stat-label-small">Day Streak</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number blue">8</div>
                    <div className="stat-label-small">Projects Completed</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number purple-light">5</div>
                    <div className="stat-label-small">Badges Earned</div>
                  </div>
                </div>
                
                <div className="weekly-activity">
                  <h3 className="activity-title">Weekly Activity</h3>
                  <div className="activity-chart">
                    <div className="activity-days">
                      <div className="day-column">
                        <div className="activity-bar" style={{height: '60%'}}></div>
                        <span className="day-label">M</span>
                      </div>
                      <div className="day-column">
                        <div className="activity-bar" style={{height: '80%'}}></div>
                        <span className="day-label">T</span>
                      </div>
                      <div className="day-column">
                        <div className="activity-bar" style={{height: '40%'}}></div>
                        <span className="day-label">W</span>
                      </div>
                      <div className="day-column">
                        <div className="activity-bar" style={{height: '90%'}}></div>
                        <span className="day-label">T</span>
                      </div>
                      <div className="day-column">
                        <div className="activity-bar" style={{height: '70%'}}></div>
                        <span className="day-label">F</span>
                      </div>
                      <div className="day-column">
                        <div className="activity-bar" style={{height: '30%'}}></div>
                        <span className="day-label">S</span>
                      </div>
                      <div className="day-column">
                        <div className="activity-bar" style={{height: '50%'}}></div>
                        <span className="day-label">S</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills and Recent Activity Row */}
            <div className="section-row">
              <div className="section-card skills-section">
                <h2 className="section-title">Skills</h2>
                <div className="skills-list">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.percentage}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress"
                          style={{ width: `${skill.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="dsa-section">
                  <h3 className="dsa-title">DSA Proficiency</h3>
                  <div className="dsa-topics">
                    {dsaTopics.map((topic, index) => (
                      <span 
                        key={index} 
                        className="dsa-topic"
                        style={{ backgroundColor: topic.color }}
                      >
                        {topic.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="section-card recent-activity-section">
                  <h2 className="section-title">Recent Activity</h2>
                <div className="activity-list">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon" style={{ backgroundColor: activity.iconColor }}></div>
                      <div className="activity-details">
                        <h3 className="activity-title">{activity.title}</h3>
                          <p className="activity-description">{activity.description}</p>
                          <div className="activity-tags">
                          {activity.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="activity-tag" style={{ backgroundColor: tag.color }}>{tag.name}</span>
                            ))}
                        </div>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges, Companies & Upcoming Interviews Row */}
            <div className="section-row">
              <div className="section-card badges-section">
                <h2 className="section-title">Badges Earned</h2>
                <div className="badges-grid">
                  {badges.map((badge, index) => (
                    <div key={index} className="badge-item">
                      <div className="badge-icon" style={{ backgroundColor: badge.bgColor }}>{badge.icon}</div>
                      <span className="badge-name">{badge.name}</span>
                    </div>
                  ))}
                  </div>
                </div>

                <div className="companies-interviews">
                  <div className="companies-section">
                    <h3 className="subsection-title">Target Companies</h3>
                    <div className="companies-list">
                      {targetCompanies.map((company, index) => (
                        <div key={index} className="company-item">
                          <div 
                            className="company-letter"
                            style={{ backgroundColor: company.color }}
                          >
                            {company.letter}
                          </div>
                          <div className="company-info">
                            <span className="company-name">{company.name}</span>
                            <div className="company-progress">
                              <div 
                                className="company-bar"
                                style={{ 
                                  width: `${(company.interviews / 5) * 100}%`,
                                  backgroundColor: company.color 
                                }}
                              ></div>
                            </div>
                            <span className="interview-count">{company.interviews} mock interviews</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="upcoming-section">
                    <h3 className="subsection-title">Upcoming Mock Interviews</h3>
                    <div className="interviews-list">
                      {upcomingInterviews.map((interview, index) => (
                        <div key={index} className="interview-item">
                          <div className="interview-details">
                            <h4 className="interview-title">{interview.title}</h4>
                            <p className="interview-interviewer">{interview.interviewer}</p>
                          </div>
                          <div className="interview-time">{interview.time}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Profile;