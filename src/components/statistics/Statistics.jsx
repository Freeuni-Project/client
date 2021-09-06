import React, { useEffect, useState } from "react";
import axios from "axios";
/* bootstrap elements */
import { Card, InputGroup } from "react-bootstrap";
/* redux hooks */
import { useSelector } from "react-redux";

const Statistic = ({ id }) => {
  /* states */
  const [choosenUser, setChoosenUser] = useState();
  const [singleUserdata, setSingleUserdata] = useState({});
  const [averangeTimeData, setAverangeTimeData] = useState({
    loading: false,
    error: "",
    data: "",
  });
  /* redux states */
  const { projectUsers } = useSelector((state) => state.current);
  const { token } = useSelector((state) => state.auth);

  const getProjectAverangeTime = async () => {
    setAverangeTimeData({ ...averangeTimeData, loading: true });
    try {
      const resp = await axios.get(
        `http://localhost:8000/statistics/api/stat/${id}/average-time`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAverangeTimeData({
        ...averangeTimeData,
        loading: false,
        data: resp.data.avg_time,
      });
    } catch (error) {
      setAverangeTimeData({ ...averangeTimeData, loading: true, error });
      console.error(error);
    }
  };

  const userAverageTime = async () => {
    setSingleUserdata({ ...singleUserdata, loading: false });

    try {
      const resp = await axios.get(
        `http://localhost:8000/statistics/api/stat/${id}/${choosenUser}/user-average-time`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSingleUserdata({ ...singleUserdata, loading: false, data: resp.data });
    } catch (error) {}
  };

  useEffect(() => {
    getProjectAverangeTime();
  }, []);

  useEffect(() => {
    if (choosenUser !== "choose" && choosenUser !== undefined) {
      userAverageTime();
    }
  }, [choosenUser]);

  console.log(singleUserdata.data);

  return (
    <Card className="statistics">
      <Card.Title>Statistics</Card.Title>
      <Card.Body>
        <div className="averagetime mt-3">
          Average Time: {averangeTimeData.data && averangeTimeData.data} Minutes
        </div>
        <div style={{ display: "flex" }}>
          <select
            className="averange__input"
            style={{ width: "20vw" }}
            value={choosenUser}
            onChange={(e) => {
              setChoosenUser(e.target.value);
            }}
          >
            <option selected value="choose">
              Choose User
            </option>
            {projectUsers.map((user, index) => {
              return (
                <option key={index} value={user.id}>
                  {user.username}
                </option>
              );
            })}
          </select>
          <div className="averagetime" style={{ marginLeft: "1rem" }}>
            {singleUserdata.data && singleUserdata.data.avg_time && (
              <>
                {(singleUserdata.data &&
                  singleUserdata.data.avg_time &&
                  singleUserdata.data.avg_time ===
                    "this user doesn't have worked on single task" &&
                  "NaN") ||
                  (singleUserdata.data.avg_time &&
                    singleUserdata.data.avg_time + " " + "Minutes")}
              </>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Statistic;
