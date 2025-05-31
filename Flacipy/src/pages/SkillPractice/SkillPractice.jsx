import React, { useEffect, useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './SkillPractice.css';

const SkillPractice = () => {
  const [activeTab, setActiveTab] = useState('dsa');
  const [progressData, setProgressData] = useState({
    level: "Beginner",
    dsa: {
      percentage: 40,
      problemsSolved: 150,
      totalProblems: 300,
      streak: 5,
    },
    dev: {
      percentage: 30,
      projectsCompleted: 0,
      totalProjects: 20,
      skillsMastered: 4,
      totalSkills: 12,
    },
  });

  const platforms = [
    {
      name: 'LeetCode',
      logo: 'LC',
      description: 'Practice coding interview questions and improve your algorithmic thinking',
      solved: 100,
      total: 200,
      color: '#facc15',
      url: 'https://leetcode.com',
    },
    {
      name: 'HackerRank',
      logo: 'HR',
      description: 'Master coding challenges and prepare for technical interviews',
      solved: 5,
      total: 60,
      color: '#16a34a',
      url: 'https://www.hackerrank.com/',
    },
    {
      name: 'CodeSignal',
      logo: 'CS',
      description: 'Take skill assessments and practice real interview questions',
      solved: 20,
      total: 40,
      color: '#3b82f6',
      url: 'https://codesignal.com/',
    },
  ];

  const recommendedProblems = [
    {
      name: 'Valid Parentheses',
      difficulty: 'Easy',
      topic: 'Stack',
      platform: 'LeetCode',
      url: 'https://leetcode.com/problems/valid-parentheses',
    },
    {
      name: 'Binary Tree Level Order Traversal',
      difficulty: 'Medium',
      topic: 'Trees',
      platform: 'LeetCode',
      url: 'https://leetcode.com/problems/binary-tree-level-order-traversal',
    },
    {
      name: 'Longest Increasing Subsequence',
      difficulty: 'Hard',
      topic: 'Dynamic Programming',
      platform: 'HackerRank',
      url: 'https://www.hackerrank.com/challenges/longest-increasing-subsequence',
    },
  ];

  const studyPlan = [
    {
      day: "Monday",
      topic: "Arrays & Strings",
      resource: "3 LeetCode Problems",
      link: "https://leetcode.com",
      status: "Completed",
    },
    {
      day: "Tuesday",
      topic: "React Components",
      resource: "Frontend Mentor Challenge",
      link: "https://frontendmentor.io",
      status: "Completed",
    },
    {
      day: "Wednesday",
      topic: "Linked Lists",
      resource: "2 HackerRank Problems",
      link: "https://hackerrank.com",
      status: "In Progress",
    },
    {
      day: "Thursday",
      topic: "API Integration",
      resource: "Weather App Project",
      link: "#",
      status: "Upcoming",
    },
    {
      day: "Friday",
      topic: "Trees & Graphs",
      resource: "2 LeetCode Problems",
      link: "https://leetcode.com",
      status: "Upcoming",
    },
  ];

  return (
    <div>
      <div className="skill-hero small">
        <h1>Practice Makes Perfect</h1>
        <p>
          Track your progress across different platforms and improve your skills in development<br />
          and algorithms
        </p>
      </div>

      <div className="progress-container">
        <div className="progress-header">
          <h4>Your Progress</h4>
          <p>Keep track of your learning journey</p>
          <span className="level-tag">Level: {progressData.level}</span>
        </div>

        <div className="progress-cards">
          <div className="progress-card">
            <h5>Data Structures & Algorithms</h5>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressData.dsa.percentage}%` }}></div>
            </div>
            <p>Problems Solved: {progressData.dsa.problemsSolved} / {progressData.dsa.totalProblems}</p>
            <p>Streak: {progressData.dsa.streak} days</p>
          </div>

          <div className="progress-card">
            <h5>Development Skills</h5>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressData.dev.percentage}%` }}></div>
            </div>
            <p>Projects Completed: {progressData.dev.projectsCompleted} / {progressData.dev.totalProjects}</p>
            <p>Skills Mastered: {progressData.dev.skillsMastered} / {progressData.dev.totalSkills}</p>
          </div>
        </div>
      </div>

      <div className="practice-tabs">
        <button className={activeTab === 'dsa' ? 'active' : ''} onClick={() => setActiveTab('dsa')}>
          Data Structures & Algorithms
        </button>
        <button className={activeTab === 'dev' ? 'active' : ''} onClick={() => setActiveTab('dev')}>
          Development
        </button>
      </div>

      {activeTab === 'dsa' && (
        <div className="practice-cards">
          {platforms.map((platform, index) => {
            const percentage = (platform.solved / platform.total) * 100;

            return (
              <div className="practice-card" key={index}>
                <div className="card-header">
                  <div
                    className="platform-logo"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.logo}
                  </div>
                  <h5>{platform.name}</h5>
                </div>

                <p>{platform.description}</p>

                <div className="card-stats">
                  <h6>Problems Solved</h6>
                  <div className="solved-count">
                    <strong>{platform.solved}</strong> / {platform.total}
                  </div>
                </div>

                <div className="practice-bar">
                  <div
                    className="practice-fill"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: platform.color,
                    }}
                  ></div>
                </div>

                <button
                  className="continue-practice"
                  style={{ backgroundColor: platform.color }}
                  onClick={() => window.open(platform.url, '_blank')}
                >
                  Continue Practice
                </button>
              </div>
            );
          })}
          <div className="recommended-section">
            <h4>Recommended Problems</h4>
            <table className="recommended-table">
              <thead>
                <tr>
                  <th>Problem</th>
                  <th>Difficulty</th>
                  <th>Topic</th>
                  <th>Platform</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recommendedProblems.map((problem, index) => (
                  <tr key={index}>
                    <td>{problem.name}</td>
                    <td>
                      <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td>{problem.topic}</td>
                    <td>{problem.platform}</td>
                    <td>
                      <a href={problem.url} target="_blank" rel="noopener noreferrer" className="solve-link">
                        Solve
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="study-plan-wrapper">
            <div className="study-plan">
              <div className="header">
                <h4>Your Study Plan</h4>
                <a href="#" className="customize-link">Customize Plan</a>
              </div>
              <table className="plan-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Topic</th>
                    <th>Resources</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studyPlan.map((item, index) => (
                    <tr key={index}>
                      <td>{item.day}</td>
                      <td>{item.topic}</td>
                      <td>
                        <a href={item.link} target="_blank" rel="noreferrer">
                          {item.resource}
                        </a>
                      </td>
                      <td>
                        <span className={`status ${item.status.toLowerCase().replace(" ", "-")}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dev' && (
        <div className="dev-cards-container">
          {[
            {
              logo: 'FM',
              name: 'Frontend Mentor',
              description: 'Improve your front-end skills by building real projects',
              color: '#2563eb',
              completed: 5,
              total: 10,
              url: 'https://www.frontendmentor.io/',
            },
            {
              logo: 'GH',
              name: 'GitHub Learning Lab',
              description: 'Learn new skills by completing fun, realistic projects',
              color: '#111827',
              completed: 3,
              total: 8,
              url: 'https://lab.github.com/',
            },
            {
              logo: 'CA',
              name: 'Codecademy',
              description: 'Learn to code interactively with hands-on exercises',
              color: '#8b5cf6',
              completed: 2,
              total: 4,
              url: 'https://www.codecademy.com/',
            },
          ].map((platform, index) => {
            const progress = (platform.completed / platform.total) * 100;

            return (
              <div className="dev-card" key={index}>
                <div className="dev-header">
                  <div
                    className="dev-logo"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.logo}
                  </div>
                  <h5 className="dev-title">{platform.name}</h5>
                </div>

                <p className="dev-description">{platform.description}</p>

                <div className="dev-stats">
                  <span className="dev-stats-label">
                    {platform.name === 'Frontend Mentor'
                      ? 'Projects Completed'
                      : 'Courses Completed'}
                  </span>
                  <span className="dev-progress-count">
                    {platform.completed} / {platform.total}
                  </span>
                </div>

                <div className="dev-progress-bar">
                  <div
                    className="dev-progress-fill"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: platform.color,
                    }}
                  />
                </div>
                <button
                  className="dev-practice-button"
                  style={{ backgroundColor: platform.color }}
                  onClick={() => window.open(platform.url, '_blank')}
                >
                  Continue Practice
                </button>
              </div>
            );
          })}
          <div className="dashboard-container">
            <div className="left-panel">
              <h2>Skills Progress</h2>

              <div className="skill-block">
                <div className="skill-label">
                  <span>HTML/CSS</span>
                  <span>85%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="skill-block">
                <div className="skill-label">
                  <span>JavaScript</span>
                  <span>70%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div className="skill-block">
                <div className="skill-label">
                  <span>React</span>
                  <span>55%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '55%' }}></div>
                </div>
              </div>

              <div className="skill-block">
                <div className="skill-label">
                  <span>Node.js</span>
                  <span>40%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div className="skill-block">
                <div className="skill-label">
                  <span>Database</span>
                  <span>30%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>

            <div className="right-panel">
              <h2>Recent Projects</h2>

              <div className="project-card">
                <div>
                  <h3>Personal Portfolio</h3>
                  <p>A responsive portfolio website showcasing your projects</p>
                </div>
                <span className="status completed">Completed</span>
              </div>

              <div className="project-card">
                <div>
                  <h3>Weather App</h3>
                  <p>A web app that displays weather information using an API</p>
                </div>
                <span className="status completed">Completed</span>
              </div>

              <div className="project-card">
                <div>
                  <h3>E-commerce Site</h3>
                  <p>An online store with product listings and shopping cart</p>
                </div>
                <span className="status inprogress">In Progress</span>
              </div>

              <div className="project-card">
                <div>
                  <h3>Social Media Dashboard</h3>
                  <p>A dashboard to track social media statistics</p>
                </div>
                <span className="status notstarted">Not Started</span>
              </div>
            </div>
          </div>
          <div className="study-plan-wrapper">
            <div className="study-plan">
              <div className="header">
                <h4>Your Study Plan</h4>
                <a href="#" className="customize-link">Customize Plan</a>
              </div>
              <table className="plan-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Topic</th>
                    <th>Resources</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studyPlan.map((item, index) => (
                    <tr key={index}>
                      <td>{item.day}</td>
                      <td>{item.topic}</td>
                      <td>
                        <a href={item.link} target="_blank" rel="noreferrer">
                          {item.resource}
                        </a>
                      </td>
                      <td>
                        <span className={`status ${item.status.toLowerCase().replace(" ", "-")}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillPractice;
