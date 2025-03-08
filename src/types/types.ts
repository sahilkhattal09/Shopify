// src/types/types.ts

export interface ImageData {
  _id: string;
  data: { data: number[] };
  contentType: string;
  name: string;
  price: number;
  src?: string;
  category?: string;
}
