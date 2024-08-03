export interface User {
  id: string;
  fullname: string;
  bio: string | null;
  verified: boolean;
  createdAt: string;
  meta: {
    id: string;
    name: string;
    description: string | null;
  };
  avatar: {
    id: string;
    icon: string | null;
    cover: string | null;
  };
}
