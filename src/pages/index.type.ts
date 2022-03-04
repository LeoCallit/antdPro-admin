export interface Userinfo {
  id: number;
  username: string;
  password: string;
  phone?: string;
  email?: string;
  avatar: string;
  desc?: string;
  status: number;
  roles: number[];
}
