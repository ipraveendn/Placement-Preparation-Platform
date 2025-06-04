import "./Questions.css";
import { AiOutlineLike } from "react-icons/ai";
import { useState, useEffect } from "react";
const level = "hard";

const items =[
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "G",
    level: "hard",
    category: "Google",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "A",
    level: "hard",
    category: "Amazon",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "M",
    level: "hard",
    category: "Meta",
  },{
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "MS",
    level: "hard",
    category: "Microsoft",
  },{
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "AP",
    level: "hard",
    category: "Apple",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "G",
    level: "hard",
    category: "Google",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "A",
    level: "hard",
    category: "Amazon",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "M",
    level: "hard",
    category: "Meta",
  },{
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "MS",
    level: "hard",
    category: "Microsoft",
  },{
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "AP",
    level: "hard",
    category: "Apple",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "G",
    level: "hard",
    category: "Google",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "A",
    level: "hard",
    category: "Amazon",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "M",
    level: "hard",
    category: "Meta",
  },{
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "MS",
    level: "hard",
    category: "Microsoft",
  },{
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "AP",
    level: "hard",
    category: "Apple",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "G",
    level: "hard",
    category: "Google",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "A",
    level: "hard",
    category: "Amazon",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "M",
    level: "hard",
    category: "Meta",
  },{
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "MS",
    level: "hard",
    category: "Microsoft",
  },{
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "AP",
    level: "hard",
    category: "Apple",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "G",
    level: "hard",
    category: "Google",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "A",
    level: "hard",
    category: "Amazon",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "M",
    level: "hard",
    category: "Meta",
  },{
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "MS",
    level: "hard",
    category: "Microsoft",
  },{
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "AP",
    level: "hard",
    category: "Apple",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "G",
    level: "hard",
    category: "Google",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "A",
    level: "hard",
    category: "Amazon",
  },
  {
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "M",
    level: "hard",
    category: "Meta",
  },{
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "MS",
    level: "hard",
    category: "Microsoft",
  },{
    head: "Design a system that handle millions of concurrent users for alive streaming platform.",
    description: "Senior Software Engineer. Asked on 15 May",
    company_icon: "AP",
    level: "hard",
    category: "Apple",
  },
]

const Questions = () => {

    const [search, setSearch] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);
    const [showCount, setShowCount] = useState(5);
    let filters = ["Google", "Amazon", "Microsoft", "Meta", "Apple"];

    const handleFilterButtonClick = (category) => {
      setSelectedFilters((prevFilters) =>
        prevFilters.includes(category)
          ? prevFilters.filter((filter) => filter !== category)
          : [...prevFilters, category]
      );
      setShowCount(5);
    };

    const handleResetButtonClick = () => {
      setSelectedFilters([])
      setSearch("");
      setShowCount(5);
    };

    const handleLessButtonClick = () => {
      setShowCount(5);
    };

    useEffect(() => {
      let filtered = items;

      if (selectedFilters.length > 0) {
        filtered = filtered.filter((item) => selectedFilters.includes(item.category));
      }

      if (search.trim() !== "") {
        filtered = filtered.filter((item) =>
          item.category.toLowerCase().includes(search.trim().toLowerCase())
        );
      }

      setFilteredItems(filtered);
      setShowCount(5);
    }, [selectedFilters, search]);

    const handleShowMore = () => {
      setShowCount((prev) => prev + 5);
    };

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
        {filters.map((category, idx) => (
        <div key={idx}>
          <button className={`${selectedFilters?.includes(category) ? "active" : "comp-names"}`} onClick={() => handleFilterButtonClick(category)}>{category}</button>
        </div>
        ))}
        <button className="comp-names" onClick={handleResetButtonClick}>Reset</button>
        </div>
      </div>
      <div className="middle-part">
        <h2>Interview Questions</h2>
        <p>Showing the most recently asked questions</p>
      </div>
      <div>
          {filteredItems.slice(0, showCount).map((item, idx) => (
          <div className="v-cards" key={idx}>
            <div className="verticle-card">
           <div className="comp-icon">{item.company_icon}</div>
            <div>
              <h2>
              {item.category}
            </h2>
            <h2>
              {item.head}
            </h2>
            <p>{item.description}</p>
            <div className="level">{item.level}</div>
          </div>
          <div className="card-last">
          <div className="view-details">View details</div>
          </div>
          </div>
        </div>
        ))}
        <div className="blue-sec1">
        <div className="companies">
        {showCount < filteredItems.length && (
            <button className="comp-names" onClick={handleShowMore}>
              Show More
            </button>
          )}
          {showCount > 5 && (
            <button className="comp-names" onClick={handleLessButtonClick}>
              Show Less
            </button>
        )}
        </div>
        </div>
        </div>
      </>
    );
};

export default Questions;
