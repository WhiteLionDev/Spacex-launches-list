import axios from "axios";

export const getLaunches = async () => {
  try {
    const response = await axios('https://api.spacexdata.com/v3/launches');
    return response?.data;
  }
  catch(err) {
    console.log(`Error on src\\services\\service.js - getLaunches`, err);
  }
};

export const getRockets = async () => {
  try {
    const response = await axios('https://api.spacexdata.com/v3/rockets');
    return response?.data;
  }
  catch(err) {
    console.log(`Error on src\\services\\service.js - getRockets`, err);
  }
};