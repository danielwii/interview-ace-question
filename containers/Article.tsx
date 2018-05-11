import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ArticleComponent from '../components/Article';

const GET_ARTICLES = gql`
  {
    articles {
      id
      content
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

interface IProp {}

interface IState {
  loading: boolean;
}

export default class Article extends React.Component<IProp, IState> {
  input: HTMLInputElement;
  state: IState = {
    loading: false,
  };

  render() {
    return (
      <Query query={GET_ARTICLES}>
        {({ loading, error, data, refetch, networkStatus }) => {
          const articles = data.articles;
          return <ArticleComponent articles={articles || []} />;
        }}
      </Query>
    );
  }
}
