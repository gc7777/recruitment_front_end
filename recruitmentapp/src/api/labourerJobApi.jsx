import { config } from "./config.json";
import axios from "axios";

// GET labourersjobs
export const getAllLabourerjobs = ({ token, count, page, jobId }) => {
  const options = {
    url: `${config.BASE_API_URL}labourerjobs?count=${count}&page=${page}&jobId=${jobId}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

// GET for admin, please don't edit
export const getLabourerjobsForReport = ({
  token,
  count,
  page,
  labourerId,
  fromDate,
  toDate,
}) => {
  const options = {
    url: `${config.BASE_API_URL}labourerjobs?count=${count}&page=${page}&fromDate=${fromDate}&toDate=${toDate}&labourerId=${labourerId}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

export const getLabourerJobs = ({ token, count, page, fromDate, toDate }) => {
  const options = {
    url: `${config.BASE_API_URL}labourerjobs?count=${count}&page=${page}&fromDate=${fromDate}&toDate=${toDate}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

export const getJobInfoByCompany = ({ TOKEN }) => {
  const options = {
    url: config.BASE_API_URL + "labourerjobs/",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return axios(options);
};

export const updateLabourerJobRating = ({
  token,
  labourerJobId,
  qualityRating,
  safetyRating,
}) => {
  const options = {
    url: `${config.BASE_API_URL}labourerjobs/${labourerJobId}?qualityRating=${
      qualityRating ?? ""
    }&safetyRating=${safetyRating ?? ""}`,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

// POST ratings
export const postRatings = ({ token, param }) => {
  const options = {
    url: config.BASE_API_URL + "labourerjobs/UpdateJobRating?" + param,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};
