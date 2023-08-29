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

export interface UserInfoT {
  id: string;
  objectId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
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
