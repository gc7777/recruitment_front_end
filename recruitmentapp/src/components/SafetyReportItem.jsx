import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { updateLabourerJobRating } from "../api/labourerJobApi";
import ReactTooltip from "react-tooltip";

const SafetyReportItem = (props) => {
  const [item, setItem] = useState(props.item);
  const [safetyRating, setSafetyRating] = useState(props.item.safetyRating);
  const changeRating = (item, newRating) => {
    setSafetyRating(newRating);
    item.safetyRating = newRating;
    setItem(item);
    updateLabourerJobRating({
      token: props.auth.JWToken,
      labourerJobId: item.id,
      safetyRating: newRating,
    })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const todayDate = new Date().getTime();
  const fourteenDaysSeconds = 120960000;

  return (
    <tr>
      <td>{item.labourerFullName}</td>
      <td>{item.labourerPhone}</td>
      <td>{item.jobTitle}</td>
      <td>{item.skillName}</td>
      <td>{new Date(item.date).toLocaleDateString()}</td>
      {Math.round(
        (todayDate - new Date(item.date).getTime()) / fourteenDaysSeconds
      ) < 0 ||
      Math.round(
        (todayDate - new Date(item.date).getTime()) / fourteenDaysSeconds
      ) > 14 ? (
        <td>
          <p data-tip="You are not allowed to rate the job after 2 weeks or before it is done">
            <StarRatings
              rating={safetyRating || 0}
              starRatedColor="blue"
              numberOfStars={5}
              name="safetyRating"
              starDimension="25px"
              starSpacing="1px"
            />
          </p>
          <ReactTooltip />
        </td>
      ) : (
        <td>
          <StarRatings
            rating={safetyRating || 0}
            starRatedColor="blue"
            numberOfStars={5}
            name="safetyRating"
            starDimension="25px"
            starSpacing="1px"
            changeRating={(newRating) => changeRating(item, newRating)}
          />
        </td>
      )}
    </tr>
  );
};

export default SafetyReportItem;
