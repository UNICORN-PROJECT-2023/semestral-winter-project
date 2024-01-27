import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerArticleEntity } from '../entity/customer-article.entity';
import { CustomerEntity } from '../entity/customer.entity';
import { ArticleEntity } from '../entity/article.entity';
import { ArticleType } from '../types/article-type.type';
import { QuestionEntity } from '../entity/question.entity';
import { ArticleDao } from './article.dao';

@Injectable()
export class QuestionDao {
  
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
    @Inject(ArticleDao)
    private articleDao: ArticleDao,
    
  ) {}

  async findById(id: number): Promise<QuestionEntity> {
    const tempQuestionEntity = await this.questionRepository.find({
      relations: [
        "articleEntity",
      ], 
      where: { id: id }
    });

    // validate if article exists
    if (tempQuestionEntity.length === 0) {
      throw new BadRequestException("Question by id not exists");
    }

    return tempQuestionEntity[0];
  }


  async add(questionEntity: QuestionEntity, articleId: number): Promise<void> {
    const articleEntity: ArticleEntity = await this.articleDao.findById(articleId);

    questionEntity.articleEntity = articleEntity;

    // save article
    await this.questionRepository.save(questionEntity);
  }


  async delete(id: number): Promise<void> {
    const tempQuestionEntity = await this.questionRepository.findOneBy({ id: id });
    
    // validate if article exists
    if (!tempQuestionEntity) {
      throw new BadRequestException("Question by id not exists");
    }

    await this.questionRepository.delete({ id });
  }

}
