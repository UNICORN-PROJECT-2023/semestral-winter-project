import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import passport from 'passport';
import { CustomerDao } from 'src/modules/database/dao/customer.dao';
import { CustomerEntity } from 'src/modules/database/entity/customer.entity';
import { UserLoginInDto } from '../dto/user-login-in.dto';
import { UserRegisterInDto } from '../dto/user-register-in.dto';
import { UserTokenOutDto } from '../dto/user-token-out.dto';
import { PasswordService } from './password.service';
import { JwtService } from 'src/modules/guard/service/jwt.service';
import { UserPutInDto } from '../dto/user-put-in.dto';
import { ArticleOutDto } from '../dto/article-out.dto';
import { ArticleDao } from 'src/modules/database/dao/article.dao';
import { ArticleTransformer } from '../transformer/article.transformer';
import { ArticleInDto } from '../dto/article-in.dto';
import { ArticleType } from 'src/modules/database/types/article-type.type';
import { CategoryArticleDao } from 'src/modules/database/dao/category-article.dao';
import { CategoryDao } from 'src/modules/database/dao/category.dao';
import { QuestionDao } from 'src/modules/database/dao/question.dao';
import { QuestionInDto } from '../dto/question-in.dto';
import { QuestionTransformer } from '../transformer/question.transformer';

@Injectable()
export class QuestionService {

  constructor(
    @Inject(ArticleDao)
    private articleDao: ArticleDao,
    @Inject(QuestionDao)
    private questionDao: QuestionDao,
  ) {}


  async postQuestion(questionDto: QuestionInDto, articleId: number, cstId: number): Promise<void> {
    const questionEntity = QuestionTransformer.dtoToEntity(questionDto);

    const articleEntity = await this.articleDao.findById(articleId);
    const articleDto = ArticleTransformer.entityToDto(articleEntity, {cstId});

    if(articleDto.owner.id != cstId)  {
      throw new ForbiddenException("User is not owner");
    }

    await this.questionDao.add(questionEntity, articleId);    
  }


  async deleteQuestion(questionId: number, cstId: number): Promise<void> {
    const questionEntity = await this.questionDao.findById(questionId);
    const articleEntity = await this.articleDao.findById(questionEntity.articleEntity.id);
    const articleDto = ArticleTransformer.entityToDto(articleEntity, {cstId});

    if(articleDto.owner.id != cstId)  {
      throw new ForbiddenException("User is not owner");
    }

    await this.questionDao.delete(questionId);
  }
}
