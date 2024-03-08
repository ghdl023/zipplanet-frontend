import { defaultInstance } from "../core";

export async function getReviews({
  order = 'createdAt',
  offset = 0,
  limit = 6,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/api/film-reviews?${query}`,
  );
  const body = await response.json();
  return body;
}

export const searchReviews = async (params) => {
  try {
    const { data } = await defaultInstance.get("/api/review/search", {
      params,
    })
    return data;
  } catch(e) {
    console.log(e);
  }
}

export const searchByFilterReviews = async (params) => {
  try {
    const { data } = await defaultInstance.get("/api/review/searchByFilter", {
      params,
    })
    return data;
  } catch(e) {
    console.log(e);
  }
}
