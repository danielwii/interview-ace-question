import React from 'react';
import _ from 'lodash';

export type TChoice = {
  id: number;
  key: string;
  value: string;
  isCorrect: boolean;
};

export type TQuestion = {
  id: number;
  title: string;
  choices: TChoice[];
  correctChoice: TChoice;
};

export type TAnswer = {
  id: number;
  isCorrect: boolean;
  question: TQuestion;
  choice: TChoice;
};

type TArticle = {
  id: number;
  content: string;
  questions: TQuestion[];
  answers: TAnswer[];
};

interface IProp {
  articles: TArticle[];
  renderQuestion: (question: TQuestion, answer: TAnswer) => any;
}

interface IState {
  loading: boolean;
}

export default class Article extends React.Component<IProp, IState> {
  input: HTMLInputElement;
  state: IState = {
    loading: false,
  };

  render() {
    const { articles, renderQuestion } = this.props;
    return (
      <div className="container">
        {articles.map(article => (
          <div key={article.id}>
            <h1 className="title">Article #{article.id}</h1>
            <div className="content">{article.content}</div>
            <div className="content">
              {article.questions &&
                article.questions.map(question =>
                  renderQuestion(
                    question,
                    article.answers.find(answer => _.get(answer, 'question.id') === question.id),
                  ),
                )}
            </div>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}
