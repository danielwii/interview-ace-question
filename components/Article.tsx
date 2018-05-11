import React from 'react';

interface IProp {
  articles: TArticle[];
}

interface IState {
  loading: boolean;
}

type TChoice = {
  id: number;
  key: string;
  value: string;
};

type TQuestion = {
  id: number;
  title: string;
  choices: TChoice[];
};

type TArticle = {
  id: number;
  content: string;
  questions: TQuestion[];
};

export default class Article extends React.Component<IProp, IState> {
  input: HTMLInputElement;
  state: IState = {
    loading: false,
  };

  _renderChoices = (choices: TChoice[] = []) => {
    return (
      <div>
        <ul style={{ listStyleType: 'none' }}>
          {choices.map(choice => (
            <li>
              {choice.key}&nbsp;{choice.value}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  _renderQuestions = (questions: TQuestion[] = []) => {
    return (
      <div className="content">
        <ol>
          {questions.map(question => {
            return (
              <li>
                {question.title}
                {this._renderChoices(question.choices)}
              </li>
            );
          })}
        </ol>
      </div>
    );
  };

  render() {
    const { articles } = this.props;
    return (
      <div className="container">
        {articles.map(article => (
          <div key={article.id}>
            <h1 className="title">Article #{article.id}</h1>
            <div className="content">{article.content}</div>
            <div className="content">{this._renderQuestions(article.questions)}</div>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}
