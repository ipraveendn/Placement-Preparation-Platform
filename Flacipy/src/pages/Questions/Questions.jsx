import React from "react";

const Questions = () => {
  return (
    <>
      <div className="">
        <h3>Find Interview Questions</h3>
        <p>
          Search for recently asked questions from the top companies to prepare
          for your next interview
        </p>
        <div>
            <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Search by company name (eg., Google, Microsoft, Amazon etc..."
            />
            <button type="button"> Search Questions</button>
        </div>
        <div>
            <button>Google</button>
            <button>Amazon</button>
            <button>Microsoft</button>
            <button>Meta</button>
            <button>Apple</button>
        </div>
      </div>
    </>
  );
};

export default Questions;
