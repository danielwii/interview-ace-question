import { getConnection, getManager } from 'typeorm';

import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { microGraphql } from 'apollo-server-micro';
import fetch from 'node-fetch';
import gql from 'graphql-tag';
import micro from 'micro';
import listen from 'test-listen';

import { loadSeeds } from '../server/seeds';
import createConnection from '../server/connection';
import schema from '../server/schema';
import { User } from '../server/entities/User';

describe('graphql api', () => {
  let client;

  beforeAll(async () => {
    const url = await listen(micro(microGraphql({ schema })));
    const link = createHttpLink({ uri: url, fetch: fetch });
    client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
    return createConnection();
  });

  beforeEach(async () => {
    await getConnection().synchronize(true);
    await loadSeeds();
  });

  afterEach(async () => {});

  describe('query articles', () => {
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

    it('should return correct articles by gql', async () => {
      const { data } = await client.query({
        query: GET_ARTICLES,
        variables: { userId: 1 },
      });
      expect(data.articles.length).toBe(1);
      expect(data.articles[0].questions.length).toBe(3);
      expect(data.articles[0].questions[0].choices.length).toBe(4);
    });
  });

  describe('signup', () => {
    const SIGNUP = gql`
      mutation signup($username: String!) {
        signup(username: $username) {
          id
          username
        }
      }
    `;

    it('should return username after signup', async () => {
      const { data } = await client.mutate({
        mutation: SIGNUP,
        variables: { username: 'test-user' },
      });
      expect(+data.signup.id).toBe(1);
      expect(data.signup.username).toBe('test-user');
    });
  });

  describe('answer', () => {
    const ANSWER_QUESTION = gql`
      mutation answer($userId: ID!, $questionId: ID!, $choiceId: ID!) {
        answer(userId: $userId, questionId: $questionId, choiceId: $choiceId) {
          id
          isCorrect
          choice {
            id
          }
          question {
            id
            correctChoice {
              id
              key
              value
            }
          }
        }
      }
    `;

    beforeEach(async () => {
      getManager().save(User, { username: 'u1' });
    });

    it('should return result after answer one question', async () => {
      const { data } = await client.mutate({
        mutation: ANSWER_QUESTION,
        variables: { userId: 1, questionId: 1, choiceId: 1 },
      });
      expect(+data.answer.question.id).toBe(1);
      expect(+data.answer.choice.id).toBe(1);
      expect(data.answer.isCorrect).toBeFalsy();
      expect(+data.answer.question.correctChoice.id).toBe(3);
    });
  });
});
