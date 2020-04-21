import React, { useState, useEffect } from "react";
import { getJobById } from "../api/JobsApi";
//This view is for a company to view and / or edit a specific job's details like hours, skills needed, number of labourers required, and location
const CompanyJobDetail = props => {
  const [job, setJob] = useState([]);
  const TOKEN = props.auth.JWToken;
  const ID = props.location.state.id;

  const getJobByIdFromAPI = async () => {
    await getJobById({ TOKEN, ID }).then(res => {
      if (res.status === 200) {
        setJob(res.data);
        //console.log();
      }
    });
  };

  useEffect(() => {
    getJobByIdFromAPI();
  }, []);

  return (
    <div className="page-content">
      <h1>{job.title}</h1>
      <form>
        <div class="form-group">
          <label for="exampleFormControlInput1" />
          Job Title
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Eg. Painter"
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1" />
          City
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Eg. Vancouver"
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1" />
          Province
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Eg. British Columbia"
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">
            Skills Needed (Hold ctrl to select multiple)
          </label>
          <select multiple class="form-control" id="exampleFormControlSelect2">
            <option>Skill 1</option>
            <option>Skill 2</option>
            <option>Skill 3</option>
            <option>Skill 4</option>
            <option>Skill 5</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default CompanyJobDetail;
/* <div>
         <h1>Job X Detail</h1>
         <form
          action=""
        >
          <input type="text" placeholder="Job Title" />
          <input type="text" placeholder="city" />
          <input type="text" placeholder="province" />
          <select name="Skills" id="skills-list" multiple>
            <option value="Select">Please Select</option>
            <option value="Skill 1">Skill 1</option>
            <option value="Skill 2">Skill 2</option>
            <option value="Skill 3">Skill 3</option>
            <option value="Skill 4">Skill 4</option>
            <option value="Skill 5">Skill 5</option>
          </select>
        </form>
      </div></div> */
