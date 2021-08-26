import React, { useEffect } from "react";
import axios from "axios";
// components
import MainNavbar from "../components/MainNavbar.jsx";
import CreateProjectCard from "../components/CreateProjectCard.jsx";
import CreateProjectModal from "../components/CreateProjectModal.jsx";
import ProjectListCard from "../components/ProjectListCard.jsx";

const projects = [
  { name: "Lomsa", id: "3123013131" },
  { name: "SpaceX", id: "dsadasd231" },
];

const Main = () => {
  const GetProjects = async () => {
    const resp = await axios.get("http://localhost:5005/api/projects");
    console.log(resp);
  };

  useEffect(() => {
    GetProjects();
  }, []);

  return (
    <>
      <MainNavbar />
      <div className="container">
        <div className="projectsbox">
          <CreateProjectCard />
          {projects.map((project) => {
            return (
              <ProjectListCard
                key={project.id}
                projectName={project.name}
                projectId={project.id}
              />
            );
          })}
        </div>
      </div>
      {/* Create New Project Modal */}
      <CreateProjectModal />
    </>
  );
};

export default Main;
