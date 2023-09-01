import { UserT } from "@/types/user";

export interface ThreadT {
  text: string;
  author: string;
  community: string;
  parentId: string;
  children: string[];
  createdAt: string;
  updatedAt: string;
}

type AllThreadUserT = Omit<
  UserT,
  "bio" | "onboarded" | "threads" | "communities"
>;

type AllThreadChildrenUserT = Omit<
  UserT,
  "id" | "username" | "bio" | "onboarded" | "threads" | "communities"
>;

interface AllThreadsChildrenT extends Omit<ThreadT, "author"> {
  author: AllThreadChildrenUserT;
}

interface CommunityT {
  id: string;
  name: string;
  image: string;
}

export interface AllThreadT {
  _id: string;
  text: string;
  community: CommunityT | null;
  parentId: string;
  createdAt: string;
  updatedAt: string;
  author: AllThreadUserT;
  children: AllThreadsChildrenT[];
}

// ACTIONS

export interface CreateThreadParamsT {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export interface GetAllThreadsParamsT {
  pageNumber: number;
  limit: number;
}
