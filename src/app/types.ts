export type Board = {
  id?: string;
  name: string;
  cover: {
    url: string;
  };
};

export interface ApiResult<T> {
  data: T;
}

export type BoardDetails = {
  id: string;
  name: string;
  description: string | null;
  isPrivate: boolean;
  lists: List[];
};

export type List = {
  id?: string;
  name: string;
  position: number;
  cards: Card[];
};

export type Card = {
  id?: string;
  title: string;
  coverURL?: string | null;
  commentCount: number;
  attachmentCount: number;
};

export type CardDetails = {
  id: string;
  title: string;
  description: string | null;
  coverURL: string | null;
};
