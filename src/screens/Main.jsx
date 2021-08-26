import React, { useEffect, useState } from "react";
import axios from "axios";
// components
import MainNavbar from "../components/MainNavbar.jsx";
import CreateProjectCard from "../components/CreateProject/CreateProjectCard.jsx";
import CreateProjectModal from "../components/CreateProject/CreateProjectModal.jsx";
import ProjectListCard from "../components/ProjectListCard.jsx";
import Loading from "../components/Loading.jsx";
import InfoModal from "../components/InfoModal.jsx";

const Main = () => {
  // here we store projects from database
  const [requestData, setRequestData] = useState({
    data: [],
    error: "",
    loading: false,
  });

  const GetProjects = async () => {
    try {
      setRequestData({ ...requestData, loading: true });
      const resp = await axios.get("http://localhost:5005/api/projects");
      setRequestData({ ...requestData, data: resp.data, loading: false });
    } catch (error) {
      setRequestData({ ...requestData, loading: false, error: error });
    }
  };

  useEffect(() => {
    GetProjects();
  }, []);

  return (
    <>
      <MainNavbar />
      <div className="container">
        <div className="projectsbox">
          {requestData.loading ? (
            <Loading />
          ) : (
            <>
              <CreateProjectCard />
              {requestData.data &&
                requestData.data.map((project) => {
                  return (
                    <ProjectListCard
                      key={project.id}
                      projectName={project.project_name}
                      projectId={project.id}
                    />
                  );
                })}
            </>
          )}
        </div>
      </div>
      {/* Create New Project Modal */}
      <CreateProjectModal />
      <InfoModal
        title={{ message: "Something went wrong", type: "error" }}
        show={requestData.error}
        onClose={() => setRequestData({ data: [], error: "", loading: false })}
      />
    </>
  );
};

export default Main;
