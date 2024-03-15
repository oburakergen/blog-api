import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { IBlog } from '../interfaces/blogs.interface';

export type BlogCreate = Pick<IBlog, 'title' | 'slug'>;

export class BlogCreateDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title must not be empty' })
  public title: string;

  @IsString({ message: 'Slug must be a string' })
  public slug: string;

  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content must not be empty' })
  public content: string;

  @IsArray()
  @IsOptional()
  public tags: string[];

  photo: File;
}
