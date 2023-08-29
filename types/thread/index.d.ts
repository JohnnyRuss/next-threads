export interface ThreadT {
  text: string;
  author: string;
  community: string;
  parentId: string;
  children: string[];
  createdAt: string;
  updatedAt: string;
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
