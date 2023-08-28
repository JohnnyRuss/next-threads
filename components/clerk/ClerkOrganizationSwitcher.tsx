import React from "react";
import { OrganizationSwitcher } from "@clerk/nextjs";

interface ClerkOrganizationSwitcherT {}

const ClerkOrganizationSwitcher: React.FC<ClerkOrganizationSwitcherT> = () => {
  return (
    <OrganizationSwitcher
      appearance={{
        elements: {
          organizationSwitcherTrigger: "py-2 px-4 text-white",
        },
      }}
    />
  );
};

export default ClerkOrganizationSwitcher;
