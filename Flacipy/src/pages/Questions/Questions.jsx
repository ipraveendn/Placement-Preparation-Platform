import React from "react";
import "./Questions.css";
import { AiOutlineLike } from "react-icons/ai";
import { useState } from "react";
var company = "Amazon";
var company_icon = "G";
const level = "hard";

const Questions = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="blue-sec">
        <h3>Find Interview Questions</h3>
        <p>
          Search for recently asked questions from the top companies to prepare
          for your next interview
        </p>
        <div className="search-bar">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar-white"
            placeholder="Search by company name (eg., Google, Microsoft, Amazon etc...)"
          />
          <button className="search-quest-button" type="button">
            {" "}
            Search Questions
          </button>
        </div>
        <div className="companies">
          <button className="comp-names">Google</button>
          <button className="comp-names">Amazon</button>
          <button className="comp-names">Microsoft</button>
          <button className="comp-names">Meta</button>
          <button className="comp-names">Apple</button>
        </div>
      </div>
      <div className="middle-part">
        <h2>Interview Questions for {company}</h2>
        <p>Showing the most recently asked questions</p>
      </div>
      <div className="v-cards">
        <div className="verticle-card">
          <div className="comp-icon">{company_icon}</div>
          <div>
            <h2>
              Design a system that handel millions of concurrent users for a
              live streaming platform.
            </h2>
            <p>Senior Software Engineer. Asked on 15 May</p>
            <div className="level"> {level} </div>
          </div>
          <div className="card-last">
            <div className="like-icon">
              <AiOutlineLike />
              <div>392</div>
            </div>
            <div className="view-details">View details</div>
            <div className="save-button">Save</div>
          </div>
        </div>
        <div className="verticle-card">
          <div className="comp-icon">{company_icon}</div>
          <div>
            <h2>
              Implement an algorithm to find the shortest path in a graph.
            </h2>
            <p>Senior Data Engineer. Asked on 20 May</p>
            <div className="level"> {level} </div>
          </div>
          <div className="card-last">
            <div className="like-icon">
              <AiOutlineLike />
              <div>392</div>
            </div>
            <div className="view-details">View details</div>
            <div className="save-button">Save</div>
          </div>
        </div>
        <div className="verticle-card">
          <div className="comp-icon">{company_icon}</div>
          <div>
            <h2>
              Design a system that handel millions of concurrent users for a
              live streaming platform.
            </h2>
            <p>Senior Software Engineer. Asked on 15 May</p>
            <div className="level"> {level} </div>
          </div>
          <div className="card-last">
            <div className="like-icon">
              <AiOutlineLike />
              <div>392</div>
            </div>
            <div className="view-details">View details</div>
            <div className="save-button">Save</div>
          </div>
        </div>
        <div className="verticle-card">
          <div className="comp-icon">{company_icon}</div>
          <div>
            <h2>
              Design a system that handel millions of concurrent users for a
              live streaming platform.
            </h2>
            <p>Senior Software Engineer. Asked on 15 May</p>
            <div className="level"> {level} </div>
          </div>
          <div className="card-last">
            <div className="like-icon">
              <AiOutlineLike />
              <div>392</div>
            </div>
            <div className="view-details">View details</div>
            <div className="save-button">Save</div>
          </div>
        </div>
        <div className="verticle-card">
          <div className="comp-icon">{company_icon}</div>
          <div>
            <h2>
              Design a system that handel millions of concurrent users for a
              live streaming platform.
            </h2>
            <p>Senior Software Engineer. Asked on 15 May</p>
            <div className="level"> {level} </div>
          </div>
          <div className="card-last">
            <div className="like-icon">
              <AiOutlineLike />
              <div>392</div>
            </div>
            <div className="view-details">View details</div>
            <div className="save-button">Save</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
