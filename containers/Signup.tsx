import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { MutationResult } from 'react-apollo/Mutation';
import Router from 'next/router';

import Signup from '../components/Signup';

const SIGNUP = gql`
  mutation signup($username: String!) {
    signup(username: $username) {
      id
      username
    }
  }
`;

interface IState {
  loading: boolean;
}

export default class extends React.Component<any, IState> {
  input: HTMLInputElement;
  state: IState = {
    loading: false,
  };

  toArticle = ({ signup }) => {
    Router.push({ pathname: '/article', query: { name: signup.username } });
  };

  render() {
    const { loading } = this.state;

    return (
      <Mutation
        mutation={SIGNUP}
        onCompleted={this.toArticle}
        onError={() => this.setState({ loading: false })}
      >
        {(signup, result: MutationResult<any>) => (
          <Signup loading={loading} signup={signup} result={result} />
        )}
      </Mutation>
    );
  }
}
