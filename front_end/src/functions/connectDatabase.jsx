import React from "react";

const POST_URL = "http://localhost:3001/insertStudent";
const GET_URL = "http://localhost:3001/getStudent";

export default function connectDatabase() {}

// Fetches data from database, add filtering if a field is provided
export function getEntry(field, input, set) {
  let filter = "";
  if (field && input) {
    filter = `?${field}=${input}`;
  }
  console.log(`${GET_URL}${filter}`)
  fetch(`${GET_URL}${filter}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      set(data);
      console.log(data);
    })
    .catch((err) => console.log(err));
}

// Posts the entry data into database
export function postEntry(entry, setEntry) {
  const data = new URLSearchParams(entry);
  return fetch(`${POST_URL}?${data.toString()}`)
    .then((res) => {
      if(!res.ok) {
        throw new Error("Error when posting data")
      } 
      return res.text()}
    )
    .then((objectID) => {
      setEntry((entry) => ({...entry, objectID: objectID}))
      console.log(objectID)
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}
