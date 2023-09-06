import { UserT } from "../user";
import { ThreadT } from "../thread";

export interface CommunityT {
  _id: string;
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  createdBy: string;
  threads: [string];
  members: [string];
  createdAt: string;
  updatedAt: string;
}

export interface CommunityCardT {
  id: string;
  name: string;
  username: string;
  image: string;
  bio: string;
  members: {
    image: string;
  }[];
}

export interface AllCommunitiesT extends CommunityT {
  members: UserT[];
}

export interface CommunityDetailsT extends CommunityT {
  createdBy: UserT;
  members: {
    name: string;
    username: string;
    image: string;
    _id: string;
    id: string;
  }[];
}

export interface CommunityThreadsThreadChildrenT extends ThreadT {
  author: {
    image: string;
    id: string;
    _id: string;
  };
}

export interface CommunityThreadsThreadT extends ThreadT {
  community: {
    name: string;
    id: string;
    _id: string;
    image: string;
  };
  author: {
    id: string;
    _id: string;
    name: string;
    image: string;
  };
  children: CommunityThreadsThreadChildrenT[];
}

export interface CommunityThreadsT extends UserT {
  threads: CommunityThreadsThreadT[];
}
