/* axios base url */
import base from "../axios/axiosBase.js";
import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
/* custom functions */
import { GetChunks } from "../hooks/GetChunks.js";
/* components */
import MainNavbar from "../components/MainNavbar.jsx";
import CreateProjectCard from "../components/CreateProject/CreateProjectCard.jsx";
import ProjectListCard from "../components/ProjectListCard.jsx";
import Loading from "../components/Loading.jsx";
/* modals */
import InfoModal from "../components/InfoModal.jsx";
import ProjectEdit from "../components/ProjectEdit.jsx";
import CreateProjectModal from "../components/CreateProject/CreateProjectModal.jsx";
import AddMemeberModal from "../components/addMemberModal";
import RemoveMember from "../components/removeMember.jsx";

/* redux hooks */
import { useDispatch } from "react-redux";
/* redux actions */
import { setAllUsers } from "../actions/globalSlice.js";

const Main = () => {
  const dispatch = useDispatch();
  /* states */
  const [requestData, setRequestData] = useState({
    data: [],
    error: "",
    loading: false,
  });
  const [userRequestData, setUserRequestData] = useState({
    data: [],
    error: "",
    loading: false,
  });

  /* pageination */
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

  const getProjects = async () => {
    try {
      setRequestData({ ...requestData, loading: true });
      const resp = await base.get("/projects");
      const pageData = GetChunks(resp.data, 11);

      setRequestData({ ...requestData, data: pageData, loading: false });
    } catch (error) {
      window.location.reload();
    }
  };

  console.log(localStorage.getItem("token-short"));

  const getAllUsers = async () => {
    try {
      const resp = await base.get("/users");
      setUserRequestData({
        ...userRequestData,
        data: resp.data,
        loading: false,
      });
      dispatch(setAllUsers(resp.data));
    } catch (error) {
      window.location.reload();
    }
  };
  useEffect(() => {
    getProjects();
    getAllUsers();
  }, []);

  return (
    <>
      <MainNavbar />
      <div className="container">
        <div className="projectsbox">
          <CreateProjectCard />
          {requestData.loading ? (
            <Loading />
          ) : (
            <>
              {requestData.data[active - 1] &&
                requestData.data[active - 1].map((project) => {
                  return (
                    <React.Fragment key={project.id}>
                      <ProjectListCard
                        project={project}
                        getProjects={getProjects}
                      />
                    </React.Fragment>
                  );
                })}
            </>
          )}
        </div>
      </div>
      <InfoModal
        title={{ message: "Something went wrong", type: "error" }}
        show={requestData.error}
        onClose={() => setRequestData({ data: [], error: "", loading: false })}
      />
      <InfoModal
        title={{ message: "Something went wrong", type: "error" }}
        show={userRequestData.error}
        onClose={() =>
          setUserRequestData({ data: [], error: "", loading: false })
        }
      />
      <div className="mainpagination">
        <Pagination>{items}</Pagination>
      </div>
      {/* Create New Project Modal */}
      <CreateProjectModal getProjects={getProjects} />
      <ProjectEdit getProjects={getProjects} />
      <CreateProjectModal getProjects={getProjects} />
      <AddMemeberModal />
      <RemoveMember />
    </>
  );
};

export default Main;
