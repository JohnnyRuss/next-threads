import { UserT } from "@/types/user";

export interface ThreadT {
  _id: string;
  text: string;
  author: string;
  community: string;
  parentId: string;
  children: string[];
  createdAt: string;
  updatedAt: string;
  reactions: string[];
}

interface ThreadUserT {
  _id: string;
  id: string;
  image: string;
  name?: string;
}

interface ThreadCommunityT {
  _id: string;
  id: string;
  name: string;
  image: string;
}

interface ThreadsChildrenT extends ThreadT {
  _id: string;
  community?: ThreadCommunityT;
  author: ThreadUserT;
  children: ThreadCardInfoChildrenT[];
}

interface CommunityT {
  id: string;
  name: string;
  image: string;
}

export interface ActiveThreadT {
  _id: string;
  text: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
  author: ThreadUserT;
  community: ThreadCommunityT | null | undefined;
  children: ThreadsChildrenT[];
  reactions: string[];
}

export interface AllThreadT {
  _id: string;
  text: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
  author: ThreadUserT;
  community: ThreadCommunityT | null;
  children: ThreadsChildrenT[];
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

// CARD
export interface ThreadCardInfoChildrenT {
  _id: string;
  author: ThreadUserT;
}

export interface ThreadCardInfoT {
  author: ThreadUserT;
  text: string;
  _id: string;
  createdAt: string;
  community?: ThreadCommunityT;
  children: ThreadCardInfoChildrenT[];
  reactions: string[];
}
