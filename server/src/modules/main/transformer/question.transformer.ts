import { CategoryOutDto } from "../dto/category.out.dto";
import { CategoryEntity } from "src/modules/database/entity/category.entity";
import { CategoryInDto } from "../dto/category.in.dto";
import { QuestionInDto } from "../dto/question-in.dto";
import { QuestionEntity } from "src/modules/database/entity/question.entity";

export class QuestionTransformer {

  static dtoToEntity(categoryDao: QuestionInDto): QuestionEntity {
    const questionEntity = new QuestionEntity(
      categoryDao.title,
      categoryDao.description,
      categoryDao.answer,
    );

    return questionEntity;
  }

  // static entityToDao(categoryEntity: CategoryEntity): CategoryOutDto {
  //   const categoryDao = new CategoryOutDto(
  //     categoryEntity.id,
  //     categoryEntity.name,
  //   )

  //   return categoryDao;
  // }
}