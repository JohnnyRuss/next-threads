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
