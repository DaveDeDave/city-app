import { getEnvs } from "./utility";

const { 
  YELP_ENDPOINT,
  YELP_API_KEY
} = getEnvs([
  "YELP_ENDPOINT",
  "YELP_API_KEY"
]);

const getBusinesses = async (name, limit, skip) => {
  const response = await fetch(`${YELP_ENDPOINT}/businesses/search?location=${name}&sort_by=best_match&limit=${limit}&skip=${skip}`, {
    headers: {
      Authorization: YELP_API_KEY
    }
  });
  return await response.json();
};

export { getBusinesses };