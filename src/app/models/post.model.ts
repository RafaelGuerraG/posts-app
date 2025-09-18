export interface Post {
    userId: number;
    id?: number;      // opcional en creación
    title: string;
    body: string;
  }
  
  export type NewPost = Omit<Post, 'id'>;
  