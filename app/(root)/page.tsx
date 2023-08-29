import React from "react";
import { getThreads } from "@/database/actions/thread.actions";
import { ThreadT } from "@/types/thread";

interface HomeT {}

const Home: React.FC<HomeT> = async () => {
  const data = await getThreads({
    pageNumber: 1,
    limit: 20,
  });
  console.log(data);
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
    </>
  );
};

export default Home;
