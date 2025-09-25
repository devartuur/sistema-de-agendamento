import { Entity } from "src/core/entities/entitiy";

export interface ImageProps {
  fileName: string
  url: string
  createdAt: Date
}

export class Image extends Entity<ImageProps> {
  
}