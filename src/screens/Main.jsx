import axios from "axios";
import _ from "lodash";
import { Pagination } from "react-bootstrap";
import React, { useEffect, useState } from "react";
// components
import MainNavbar from "../components/MainNavbar.jsx";
import CreateProjectCard from "../components/CreateProject/CreateProjectCard.jsx";
import CreateProjectModal from "../components/CreateProject/CreateProjectModal.jsx";
import ProjectListCard from "../components/ProjectListCard.jsx";
import Loading from "../components/Loading.jsx";
import InfoModal from "../components/InfoModal.jsx";
// function
import { GetChunks } from "../hooks/GetChunks.js";

const Main = () => {
  // here we store projects from database
  const [requestData, setRequestData] = useState({
    data: [],
    error: "",
    loading: false,
  });

  // pageination
  const [active, setActive] = useState(1);
  const pages = requestData.data.length;
  const items = [];

  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          setActive(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const GetProjects = async () => {
    try {
      setRequestData({ ...requestData, loading: true });
      const resp = await axios.get("http://localhost:5005/api/projects");
      const pageData = GetChunks(resp.data, 11);

      setRequestData({ ...requestData, data: pageData, loading: false });
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
              {active === 1 && <CreateProjectCard />}
              {requestData.data[active - 1] &&
                requestData.data[active - 1].map((project) => {
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
      <div className="mainpagination">
        <Pagination>{items}</Pagination>
      </div>
    </>
  );
};

export default Main;
