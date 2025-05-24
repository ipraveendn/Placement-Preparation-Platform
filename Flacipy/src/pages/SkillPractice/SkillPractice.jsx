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
        <div className="development-placeholder">
          <p>comming soon...😄😄</p>
        </div>
      )}
      <footer class="compact-footer">
        <div class="footer-content">
          <div class="footer-section about">
            <h3>InterviewPrep</h3>
            <p>Helping students prepare for technical interviews with real questions from top companies.</p>
          </div>

          <div class="footer-section links">
            <h4>Quick Links</h4>
            <a href="#">Home</a>
            <a href="#">Questions</a>
            <a href="#">Practice</a>
            <a href="#">Resources</a>
          </div>

          <div class="footer-section social">
            <h4>Connect</h4>
            <div class="social-icons">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          © 2023 InterviewPrep. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default SkillPractice;
