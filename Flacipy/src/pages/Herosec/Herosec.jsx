import React from "react";
import "./Herosec.css";
import { FiMessageCircle, FiHelpCircle, FiFileText } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import { Link } from "react-router-dom";
>>>>>>> a68a833487f835e45ea84b87399a1d6571eb9995

const Herosec = () => {
  return (
    <div>
<<<<<<< HEAD
      <div className="parent">
        <div className="hero-sec">
          <h2>Prepare, Practice, and Land Your Dream Job.</h2>
          <p>
            Complete placement preparation with mock interviews, company-specific
            questions, skill practice and resume building tools.
          </p>
          <div className="buttons-hero-sec">
            <button className="get-started">Get Started</button>
            <button className="learn-more">Learn More</button>
          </div>
=======
    <div className="parent">
    <div className="hero-sec">
      <h2>Prepare, Practice, and Land Your Dream Job.</h2>
      <p>
        Complete placement preparation with mock interviews, company-specific
        questions, skill practice and resume building tools.
      </p>
      <div className="buttons-hero-sec">
        <button className="get-started">Get Started</button>
        <button className="learn-more">Learn More</button>
      </div>
    </div>
    </div>
    <div className="landing-page">
          <section className="features-section">
            <h2 className="section-title">Why Choose Us?</h2>
            <div className="features-cards">
              <div className="feature-card">
                <div className="icon-circle"><FiMessageCircle size={20} /></div>
                <h3>Mock Interviews</h3>
                <p>Practice with HR professionals and connect with placed students from your network.</p>
                <Link to="/Mock" className="card-link">Try Now &gt;</Link>
              </div>
              <div className="feature-card">
                <div className="icon-circle"><FiHelpCircle size={20} /></div>
                <h3>Interview Questions</h3>
                <p>Access company-specific Interview questions asked in previous interviews.</p>
                <a href="#" className="card-link">Explore &gt;</a>
              </div>
              <div className="feature-card">
                <div className="icon-circle"><HiOutlineLightBulb size={20} /></div>
                <h3>Skill Practice</h3>
                <p>Practice development skills, DSA, and find jobs matching your performance.</p>
                <a href="#" className="card-link">Practice Now &gt;</a>
              </div>
              <div className="feature-card">
                <div className="icon-circle"><FiFileText size={20} /></div>
                <h3>Resume Builder</h3>
                <p>Create ATS-friendly resumes, check scores, and download in multiple formats.</p>
                <a href="#" className="card-link">Build Resume &gt;</a>
              </div>
            </div>
          </section>
>>>>>>> a68a833487f835e45ea84b87399a1d6571eb9995
        </div>
      </div>
      <div className="landing-page">
        <section className="features-section">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-cards">
            <div className="feature-card">
              <div className="icon-circle"><FiMessageCircle size={20} /></div>
              <h3>Mock Interviews</h3>
              <p>Practice with HR professionals and connect with placed students from your network.</p>
              <a href="#" className="card-link">Try Now &gt;</a>
            </div>
            <div className="feature-card">
              <div className="icon-circle"><FiHelpCircle size={20} /></div>
              <h3>Interview Questions</h3>
              <p>Access company-specific Interview questions asked in previous interviews.</p>
              <a href="#" className="card-link">Explore &gt;</a>
            </div>
            <div className="feature-card">
              <div className="icon-circle"><HiOutlineLightBulb size={20} /></div>
              <h3>Skill Practice</h3>
              <p>Practice development skills, DSA, and find jobs matching your performance.</p>
              <Link to="/skill-practice" className="card-link">Practice Now &gt;</Link>
            </div>
            <div className="feature-card">
              <div className="icon-circle"><FiFileText size={20} /></div>
              <h3>Resume Builder</h3>
              <p>Create ATS-friendly resumes, check scores, and download in multiple formats.</p>
              <a href="#" className="card-link">Build Resume &gt;</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Herosec;
