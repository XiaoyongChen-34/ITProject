import React, { createContext } from "react";
import NavbarRank from "../components/Rank_Navbar";
import PodiumRank from "../components/Rank_Podium";
import RankRest from "../components/Rank_List";
import { Container, Stack } from "react-bootstrap";

export const RankContext = createContext();

export default function rank() {
  const ranks = [
    {
      name: "Yiwen",
      score: "150",
    },
    {
      name: "Hardy",
      score: "140",
    },
    {
      name: "Huisoo",
      score: "100",
    },
    { name: "Alex", score: "90" },
    { name: "Frank", score: "80" },
    { name: "Frank", score: "80" },
    { name: "Frank", score: "80" },
    { name: "Frank", score: "80" },
  ];
  return (
    <>
      <NavbarRank></NavbarRank>
      <Container
        fluid="md"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Stack>
          <RankContext.Provider value={{ranks}}>
            <PodiumRank></PodiumRank>
            <RankRest></RankRest>
          </RankContext.Provider>
        </Stack>
      </Container>
    </>
  );
}
