import React from "react";

interface pageT {}

const page: React.FC<pageT> = async (props) => {
  return (
    <section>
      <h1 className="head-text mb-10">Community</h1>
    </section>
  );
};

export default page;
