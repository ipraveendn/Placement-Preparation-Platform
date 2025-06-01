import React from "react";
import "./Herosec.css";
import { FiMessageCircle, FiHelpCircle, FiFileText } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Herosec = () => {
  return (
    <div>
    <div className="parent">
    <div className="hero-sec">
      <h2>Prepare, Practice, and Land Your Dream Job.</h2>
      <p>
        Complete placement preparation with mock interviews, company-specific
        questions, skill practice and resume building tools.
      </p>
      <div className="buttons-hero-sec">
        <Link to='' id="link" className="get-started">Get Started</Link>
        <Link to='/signup' id="link" className="learn-more">Learn More</Link>
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
              <Link to="/mock" className="card-link">Try Now &gt;</Link>
            </div>
            <div className="feature-card">
              <div className="icon-circle"><FiHelpCircle size={20} /></div>
              <h3>Interview Questions</h3>
              <p>Access company-specific Interview questions asked in previous interviews.</p>
              <Link to="/questions" className="card-link">Explore &gt;</Link>
            </div>
            <div className="feature-card">
              <div className="icon-circle"><HiOutlineLightBulb size={20} /></div>
              <h3>Skill Practice</h3>
              <p>Practice development skills, DSA, and find jobs matching your performance.</p>
              <Link to="/skill" className="card-link">Practice Now &gt;</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Herosec;
