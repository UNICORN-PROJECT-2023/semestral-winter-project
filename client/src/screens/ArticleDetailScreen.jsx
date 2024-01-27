import ArticleDetailPage from "../pages/ArticleDetailPage";
import { useParams } from "react-router-dom";
import ArticleService from "../services/ArticleService";
import { useEffect, useState } from "react";

export default function ArticleDetailScreen() {
    const { id } = useParams();
    const articleService = new ArticleService();
    const [article, setArticle] = useState({});
    const [successRate, setSuccessRate] = useState(null);

    useEffect(() => {
        async function fetchArticle() {
            try {
                const article = await articleService.getArticle(id);
                console.log(article);
                setArticle(article.body);
            } catch (error) {
                console.error(error);
            }
        }
        fetchArticle();
    }, []);

    function getArticleIdFromUrl(url) {
        const regex = /[?&]v=([^&]+)/;
        if (url && typeof url === 'string') {
          const match = url.match(regex);
          return match ? match[1] : null;
        }
        return null;
      }

    function setAnswer(id, answer) {
       article.questions.map((question) => {
            if (question.id === id) {
                question.userAnswer = answer;
            }
        }
        );

        setArticle({...article, questions: article.questions.map((question) => {
            if (question.id === id) {
                question.userAnswer = answer;
            }

            return question;
        })});
      }

    function onSubmit() {
        if(successRate) {
            setSuccessRate(null);
            setArticle({...article, questions: article.questions.map((question) => {
                question.userAnswer = null;
                return question;
            })});
            return;
        }

        setSuccessRate(article.questions.reduce((acc, question) => {
            if (question.userAnswer === question.answer) {
                return acc + 1;
            }

            return acc;
        }
        , 0) / article.questions.length * 100);
    }

    
    return(
        <ArticleDetailPage
            articlesData={article}
            successRate={successRate}
            setAnswer={setAnswer}
            onSubmit={onSubmit}
            getArticleIdFromUrl={getArticleIdFromUrl}
        />
    );
}