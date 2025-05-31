import React from 'react'
import './Profile.css'

const Profile = () => {
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

  return (
    <>
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <div className="avatar-icon">
                <div className="person-icon"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-content">
          <div className="profile-info">
            <h1 className="profile-name">Alex Johnson</h1>
            <p className="profile-title">Full Stack Developer</p>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">Level: Intermediate</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">12 Day Streak</span>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="btn-primary">
                <span className="btn-icon">✏️</span>
                Edit Profile
              </button>
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
                  Full stack developer with 2 years of experience, currently preparing for 
                  technical interviews at top tech companies. Passionate about algorithms, 
                  data structures, and building scalable web applications.
                </p>
                <div className="profile-details">
                  <div className="detail-item">
                    <span className="detail-icon">💼</span>
                    <span className="detail-text">Software Engineer at TechCorp</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🎓</span>
                    <span className="detail-text">B.Tech Computer Science, REVA University</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span className="detail-text">Bengaluru, Karnataka</span>
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
                    <div className="stat-number green">12</div>
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

              <div className="section-card activity-section">
                <div className="activity-header">
                  <h2 className="section-title">Recent Activity</h2>
                  <button className="view-all-btn">View All</button>
                </div>
                <div className="activity-list">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon" style={{ backgroundColor: activity.iconColor }}>
                        ●
                      </div>
                      <div className="activity-content">
                        <div className="activity-main">
                          <h4 className="activity-title">{activity.title}</h4>
                          <p className="activity-description">{activity.description}</p>
                          <div className="activity-tags">
                            {activity.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className="activity-tag"
                                style={{ backgroundColor: tag.color }}
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges and Interview Prep Row */}
            <div className="section-row">
              <div className="section-card badges-section">
                <h2 className="section-title">Badges & Achievements</h2>
                <div className="badges-grid">
                  {badges.map((badge, index) => (
                    <div key={index} className="badge-item">
                      <div 
                        className="badge-icon"
                        style={{ backgroundColor: badge.bgColor }}
                      >
                        {badge.icon}
                      </div>
                      <span className="badge-name">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-card interview-section">
                <h2 className="section-title">Interview Prep Progress</h2>
                
                <div className="progress-overview">
                  <div className="progress-header">
                    <span className="progress-label">Overall Progress</span>
                    <span className="progress-percentage">65%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '65%' }}></div>
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
      </div> 
    </>
  )
}

export default Profile;