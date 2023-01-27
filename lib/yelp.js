import { getEnvs } from "./utility.js";

const { 
  YELP_ENDPOINT,
  YELP_API_KEY
} = getEnvs([
  "YELP_ENDPOINT",
  "YELP_API_KEY"
]);

const getBusinesses = async ({ name, limit, skip }) => {
  const response = await fetch(`${YELP_ENDPOINT}/businesses/search?location=${name}&sort_by=best_match&limit=${limit}&offset=${skip}`, {
    headers: {
      Authorization: `Bearer ${YELP_API_KEY}`
    }
  });
  return (await response.json())?.businesses;
};

export { getBusinesses };