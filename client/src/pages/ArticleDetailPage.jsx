import styled from "styled-components";
import DateUtils from "../utils/DateUtils";
import Question from "../components/QuestionComponent";
import Button from "../components/ButtonComponent";

const StyledWrapper = styled.div`
  .articleDetail {
    display: flex;
    flex-direction: column;
    padding: 8rem;
    @media (max-width: 768px) {
      padding: 1.5rem;
    }
  }
  .articleWrapper {
    margin-top: 2rem;
  }
  image {
    max-width:100%;
    max-height:100%;
    margin-bottom: 2rem;
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
  }
  p {
    font-size: 1.35rem;
  }
`;

export default function ArticleDetailPage(props) {
  return (
    <StyledWrapper>
      <div className="articleDetail" key={props.articlesData?.id}>
          <img
            width={"100%"}
            src={`${props.articlesData?.imageUrl}`}
            alt="article image"
          />
        <h1>{props.articlesData?.name}</h1>
        <p>{props.articlesData?.description}</p>
        <p>Owner: {props.articlesData?.owner?.name}</p>

        <p>Created: {DateUtils.getAgeFromDate(new Date(props.articlesData?.createdAt))} ago</p>
        {props.articlesData?.questions?.length > 0 && <>
          <h1>Questions</h1>
          {props.successRate == null && props.articlesData?.questions?.map((question) => (
            <Question 
              key={question.id}
              id={question.id}
              title={question.title}
              description={question.description}
              answer={question.userAnswer}
              setAnswer={props.setAnswer}
            />
          ))}
          {props.successRate != null && (
            <>
              <h3>{props.successRate >= 60 ? "Success" : "Failed"}</h3>
              <p>Success Rate: {props.successRate}%</p>
            </>
          )}
          <Button
            text={props.successRate ? "Retry": "Submit"}
            onClick={props.onSubmit}
          />
        </>
        }
      </div>

    </StyledWrapper>
  );
}
