import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/modules/guard/decorators/roles.decorator';
import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import { ResponseDto, ResponseDtoBuilder } from '../dto/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ArticleOutDto } from '../dto/article-out.dto';
import { ArticleListService } from '../services/article-list.service';
import { ArticleService } from '../services/article.service';
import { QuestionService } from '../services/question.service';
import { QuestionInDto } from '../dto/question-in.dto';

@ApiBearerAuth()
@Controller("/article/question")
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
  ) {}

  @Post("/:articleId")
  @Roles("user")
  @ApiParam({ name: 'articleId', type: Number })
  async postQuestion(@Req() req: any, @Param('articleId') id: number, @Body() body: QuestionInDto ): Promise<ResponseDto<void>> {
    const cstId = req.user.id;

    await this.questionService.postQuestion(body, id, cstId);

    const response = new ResponseDtoBuilder<void>()
    .setStatusCode(200)
    .setMessage("Question added")
    .build();

    return response;
  }

  @Delete("/:questionId")
  @Roles("user")
  @ApiParam({ name: 'questionId', type: Number })
  async deleteQuesion(@Req() req: any,@Param('questionId') questionId: number): Promise<ResponseDto<void>> {
    const cstId: number = req.user.id;

    await this.questionService.deleteQuestion(questionId, cstId);

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(200)
      .setMessage("Deleted question")
      .build();
      
    return response;
  }
}
