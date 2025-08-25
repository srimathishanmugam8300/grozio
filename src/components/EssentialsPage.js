import React, { useState } from 'react';

const EssentialsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Default list of essentials with categories
  const essentials = [
    { name: "Flour", category: "Baking" },
    { name: "Maida Flour", category: "Baking" },
    { name: "Wheat Flour", category: "Baking" },
    { name: "Rice", category: "Grains" },
    { name: "Basmati Rice", category: "Grains" },
    { name: "Brown Rice", category: "Grains" },
    { name: "Milk", category: "Dairy" },
    { name: "Cheese", category: "Dairy" },
    { name: "Butter", category: "Dairy" },
    { name: "Eggs", category: "Dairy" },
    { name: "Sugar", category: "Baking" },
    { name: "Brown Sugar", category: "Baking" },
    { name: "Salt", category: "Spices" },
    { name: "Pepper", category: "Spices" },
    { name: "Olive Oil", category: "Cooking" },
    { name: "Vegetable Oil", category: "Cooking" },
    { name: "Bread", category: "Bakery" },
    { name: "Whole Wheat Bread", category: "Bakery" },
    { name: "Pasta", category: "Grains" },
    { name: "Spaghetti", category: "Grains" },
    { name: "Tomato Sauce", category: "Canned Goods" },
    { name: "Coffee", category: "Beverages" },
    { name: "Tea", category: "Beverages" },
    { name: "Water", category: "Beverages" },
    { name: "Potatoes", category: "Vegetables" },
    { name: "Onions", category: "Vegetables" },
    { name: "Garlic", category: "Vegetables" },
    { name: "Chicken", category: "Meat" },
    { name: "Beef", category: "Meat" },
    { name: "Fish", category: "Seafood" },
    { name: "Shrimp", category: "Seafood" },
    { name: "Apples", category: "Fruits" },
    { name: "Bananas", category: "Fruits" },
    { name: "Oranges", category: "Fruits" },
    { name: "Soap", category: "Personal Care" },
    { name: "Shampoo", category: "Personal Care" },
    { name: "Toothpaste", category: "Personal Care" },
    { name: "Detergent", category: "Cleaning" },
    { name: "Dish Soap", category: "Cleaning" },
  ];

  // Filter essentials based on search query
  const filteredEssentials = searchQuery
    ? essentials.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Popular searches to show when search is empty
  const popularSearches = [
    "Milk", "Bread", "Eggs", "Rice", "Flour", 
    "Sugar", "Butter", "Coffee", "Chicken", "Soap"
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submission here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="essentials-container">
      <div className="essentials-content">
        {/* Left Section - Essentials */}
        <div className="essentials-section">
          <h2 className="section-header">Essentials</h2>
          <div className="search-container">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-input-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search for essentials..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(true)}
                  className="search-input"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="clear-search"
                    onClick={() => setSearchQuery('')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
              
              {showSuggestions && (
                <div className="suggestions-box">
                  {filteredEssentials.length > 0 ? (
                    <>
                      <div className="suggestions-header">Products</div>
                      {filteredEssentials.map((item, index) => (
                        <div 
                          key={index} 
                          className="suggestion-item"
                          onClick={() => handleSuggestionClick(item.name)}
                        >
                          <i className="fas fa-utensils suggestion-icon"></i>
                          <div className="suggestion-details">
                            <div className="suggestion-name">{item.name}</div>
                            <div className="suggestion-category">{item.category}</div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : searchQuery ? (
                    <div className="no-results">No results found for "{searchQuery}"</div>
                  ) : (
                    <>
                      <div className="suggestions-header">Popular Searches</div>
                      {popularSearches.map((item, index) => (
                        <div 
                          key={index} 
                          className="suggestion-item"
                          onClick={() => handleSuggestionClick(item)}
                        >
                          <i className="fas fa-fire suggestion-icon"></i>
                          <div className="suggestion-name">{item}</div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Section - Nearby Stores (Placeholder) */}
        <div className="stores-section">
          <h2 className="section-header">Nearby Stores</h2>
          <div className="stores-placeholder">
            <i className="fas fa-store placeholder-icon"></i>
            <p>Store information will appear here</p>
            <p className="placeholder-subtext">We'll show you nearby stores once we have your location</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .essentials-container {
          background: #0f172a;
          color: #e5e7eb;
          min-height: 100vh;
          padding: 20px;
        }

        .essentials-content {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          gap: 30px;
        }

        .essentials-section {
          flex: 1;
        }

        .stores-section {
          flex: 1;
        }

        .section-header {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
          background: linear-gradient(90deg, #10B981 0%, #34D399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .search-container {
          position: relative;
        }

        .search-form {
          width: 100%;
        }

        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 15px;
          color: #9ca3af;
          z-index: 2;
        }

        .search-input {
          width: 100%;
          padding: 16px 16px 16px 45px;
          border: none;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          color: #e5e7eb;
          font-size: 16px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-sizing: border-box;
        }

        .search-input:focus {
          outline: none;
          border-color: #F59E0B;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
        }

        .clear-search {
          position: absolute;
          right: 15px;
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          font-size: 16px;
        }

        .suggestions-box {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #1f2937;
          border-radius: 12px;
          margin-top: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 10;
          max-height: 300px;
          overflow-y: auto;
        }

        .suggestions-header {
          padding: 12px 16px;
          font-weight: 600;
          color: #10B981;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(16, 185, 129, 0.1);
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .suggestion-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .suggestion-icon {
          margin-right: 12px;
          color: #9ca3af;
          width: 20px;
        }

        .suggestion-details {
          flex: 1;
        }

        .suggestion-name {
          font-weight: 500;
        }

        .suggestion-category {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 2px;
        }

        .no-results {
          padding: 16px;
          text-align: center;
          color: #9ca3af;
        }

        .stores-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 40px 20px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          min-height: 200px;
        }

        .placeholder-icon {
          font-size: 48px;
          color: #9ca3af;
          margin-bottom: 16px;
        }

        .placeholder-subtext {
          font-size: 14px;
          color: #9ca3af;
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .essentials-content {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default EssentialsPage;






























































































