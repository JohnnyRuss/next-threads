import { ThreadT } from "../thread";

export interface UserT {
  _id: string;
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  onboarded: boolean;
  threads: string[];
  communities: string[];
}

export interface UserShortInfoT {
  _id: string;
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  onboarded: boolean;
}

export interface UserActivityT extends ThreadT {
  author: {
    name: string;
    image: string;
    _id: string;
    id: string;
  };
}

export interface UserInfoT {
  _id: string;
  id: string;
  objectId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  onboarded: boolean;
  threads: string[];
}

export interface UserCardInfoT {
  image: string;
  name: string;
  username: string;
  _id: string;
  id: string;
}

export interface UserThreadsThreadChildrenT extends ThreadT {
  author: {
    name: string;
    image: string;
    id: string;
    _id: string;
  };
}

export interface UserThreadsThreadT extends ThreadT {
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
    username: string;
    image: string;
  };
  children: UserThreadsThreadChildrenT[];
}

export interface UserThreadsT extends UserT {
  threads: UserThreadsThreadT[];
}

// ACTIONS

export interface UpdateUserParamsT {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: "/profile/edit" | string;
}
