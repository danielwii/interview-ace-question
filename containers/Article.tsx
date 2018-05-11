import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ArticleComponent from '../components/Article';
import QuestionContainer from './Question';

const GET_ARTICLES = gql`
  query articles($userId: ID!) {
    articles {
      id
      content
      answers(userId: $userId) {
        id
        isCorrect
        question {
          id
          correctChoice {
            id
            key
            value
          }
        }
        choice {
          id
        }
      }
      questions {
        id
        title
        choices {
          id
          key
          value
        }
      }
    }
  }
`;

interface IProp {
  userId: number;
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
    const { userId } = this.props;
    return (
      <Query query={GET_ARTICLES} variables={{ userId }}>
        {({ loading, error, data, refetch, networkStatus }) => {
          const { articles } = data;
          console.log(data);
          return (
            <ArticleComponent
              articles={articles || []}
              renderQuestion={(question, answer) => (
                <QuestionContainer
                  key={question.id}
                  userId={userId}
                  question={question}
                  answer={answer}
                />
              )}
            />
          );
        }}
      </Query>
    );
  }
}
