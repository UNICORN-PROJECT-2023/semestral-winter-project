import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, ValidateNested } from "class-validator";
import { CategoryOutDto } from "./category.out.dto";
import { CategoryInDto } from "./category.in.dto";
import { Type } from "class-transformer";

export class QuestionInDto {
  
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({required: true})
  title: string;
  
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  @ApiProperty({required: true})
  description: string;

  @IsBoolean()
  @ApiProperty({required: true})
  answer: boolean;


  constructor(title: string, description: string, answer: boolean) {
    this.title = title;
    this.description = description;
    this.answer = answer;
  }
}
