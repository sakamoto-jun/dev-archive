export interface Post {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  tags: string[];
}

export interface PostDetail extends Post {
  content: string;
}
