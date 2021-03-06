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
import { useDispatch, useSelector } from "react-redux";
/* redux actions */
import { setAllUsers } from "../actions/globalSlice.js";
import { setUserId } from "../actions/authSlice.js";

const Main = () => {
  const dispatch = useDispatch();
  /* auth token */
  const token = useSelector((state) => state.auth.token);
  /* check for role */
  const [isAdmin, setIsAdmin] = useState(null);
  /* states */
  const [requestData, setRequestData] = useState({
    data: [],
    error: "",
    loading: false,
  });
  const [requestByUser, setRequestByUser] = useState({
    data: [],
    error: "",
    loading: false,
  });
  const [userRequestData, setUserRequestData] = useState({
    data: [],
    error: "",
    loading: false,
  });
  const { userId } = useSelector((state) => state.auth);

  /* pageination */
  const [active, setActive] = useState(1);
  let pages;

  if (isAdmin === "true") {
    pages = requestData.data.length;
  } else {
    pages = requestByUser.data.length;
  }
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
      const resp = await base.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const pageData = GetChunks(resp.data, 11);

      setRequestData({ ...requestData, data: pageData, loading: false });
    } catch (error) {}
  };

  const getAllUsers = async () => {
    try {
      const resp = await base.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserRequestData({
        ...userRequestData,
        data: resp.data,
        loading: false,
      });
      dispatch(setAllUsers(resp.data));
    } catch (error) {}
  };

  const getProjectsByUser = async () => {
    setRequestByUser({ ...requestByUser, loading: true });

    try {
      const id = Number(userId);
      const resp = await base.get(
        `/${localStorage.getItem("user-id")}/get-projects-by-user-id`
      );
      const pageData = GetChunks(resp.data.json_list, 11);

      setRequestByUser({
        ...requestByUser,
        loading: false,
        data: pageData,
      });
    } catch (error) {
      setRequestByUser({ ...requestByUser, loading: false, error: error });
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("user-id");
    console.log(userId);
    setUserId(userId);

    const isAdmin = localStorage.getItem("user-role");

    if (isAdmin == "true") {
      getProjects();
    }
    if (isAdmin == "false") {
      getAllUsers();
    }
    getProjectsByUser();

    setIsAdmin(isAdmin);
  }, []);
  console.log(requestByUser.data);

  return (
    <>
      <MainNavbar />
      <div className="containerwrapper">
        {isAdmin == "true" ? <CreateProjectCard /> : ""}
        <div
          className="projectsbox"
          style={{ marginTop: isAdmin == "false" && "2rem" }}
        >
          {requestData.loading ? (
            <Loading />
          ) : (
            <>
              {isAdmin === "true" ? (
                <>
                  {requestData.data[active - 1] &&
                    requestData.data[active - 1].map((project, index) => {
                      return (
                        <React.Fragment key={project.id}>
                          <ProjectListCard
                            isAdmin={isAdmin}
                            project={project}
                            index={index}
                            getProjects={getProjects}
                          />
                        </React.Fragment>
                      );
                    })}
                </>
              ) : (
                <>
                  {requestByUser.data[active - 1] &&
                    requestByUser.data[active - 1].map((project, index) => {
                      return (
                        <React.Fragment key={project.id}>
                          <ProjectListCard
                            isAdmin={isAdmin}
                            project={project}
                            index={index}
                            getProjects={getProjects}
                          />
                        </React.Fragment>
                      );
                    })}
                </>
              )}
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
