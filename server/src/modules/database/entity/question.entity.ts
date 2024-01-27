import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { CustomerArticleEntity } from './customer-article.entity';
import { CategoryArticleEntity } from './category-article.entity';
import { ArticleEntity } from './article.entity';

@Entity({ name: 'question' })
export class QuestionEntity {
  @PrimaryGeneratedColumn({ name: 'a_id' })
  id: number;

  @Column({ name: 'a_title' })
  title: string;

  @Column({ name: 'a_description' })
  description: string;

  @Column({ name: 'a_answer' })
  answer: boolean;

  @CreateDateColumn({ name: 'a_created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'a_updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @ManyToOne(() => ArticleEntity, (articleEntity) => articleEntity.id)
  articleEntity: ArticleEntity;
  
  constructor(
    title: string, 
    description: string,
    answer: boolean,
    ) {
    this.title = title;
    this.description = description;
    this.answer = answer;
  }
}
