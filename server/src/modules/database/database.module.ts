import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './database.providers';
import { CustomerEntity } from './entity/customer.entity';
import { CustomerDao } from './dao/customer.dao';
import { ArticleDao } from './dao/article.dao'; 
import { CustomerArticleDao } from './dao/customer-article.dao'; 
import { CategoryDao } from './dao/category.dao';
import { CategoryArticleDao } from './dao/category-article.dao';
import { QuestionDao } from './dao/question.dao';

@Module({
  imports: [
    ...Provider,
  ],
  providers: [
    CustomerDao,
    ArticleDao, 
    CustomerArticleDao, 
    CategoryDao,
    CategoryArticleDao,
    QuestionDao,
  ],
  exports: [
    CustomerDao,
    ArticleDao,
    CustomerArticleDao,
    CategoryDao,
    CategoryArticleDao,
    QuestionDao,
  ],
})
export class DatabaseModule {}
