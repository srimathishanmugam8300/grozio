// src/components/App.js
import React from "react";
import Login from "./login";
import EssentialsPage from "./EssentialsPage"; // ✅ added essentials page

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/your-background.jpg')] bg-cover bg-center">
      {/* <Login /> */} 
      <EssentialsPage />   {/* ✅ swap here when you want to view EssentialsPage */}
    </div>
  );
}

export default App;
