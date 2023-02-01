export interface Post {
  title: string;
  permalink: string;
  category: {
    categoryId: string;
    categoryName: string;
  };
  postImgPath: string;
  excerpt: string;
  content: string;
  isFeatured: boolean;
  views: number;
  status: string;
  createdAt: Date;
}
