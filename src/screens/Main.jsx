import React from "react";
// components
import MainNavbar from "../components/MainNavbar.jsx";
import CreateProjectCard from "../components/CreateProjectCard.jsx";
import CreateProjectModal from "../components/CreateProjectModal.jsx";

const Main = () => {
  return (
    <>
      <MainNavbar />
      <div className="container">
        <div className="projectsbox">
          <CreateProjectCard />
        </div>
      </div>
      {/* Create New Project Modal */}
      <CreateProjectModal />
    </>
  );
};

export default Main;
