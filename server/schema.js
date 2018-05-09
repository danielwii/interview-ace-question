import { makeExecutableSchema } from 'graphql-tools';
import { getRepository } from 'typeorm';

import { Article } from './entities/Article';
import { Question } from './entities/Question';
import { Choice } from './entities/Choice';
import { User } from './entities/User';
import { Answer } from './entities/Answer';

const logger = require('consola').withScope('schema');

const typeDefs = `
  type Article {
    id: ID!
    content: String
    questions: [Question]
    createdAt: String
    updatedAt: String
  }
  
  type Question {
    id: ID!
    title: String
    correctChoice: Choice
    choices: [Choice]
    article: Article
    createdAt: String
    updatedAt: String
  }
  
  type Choice {
    id: ID!
    key: String
    value: String
    question: Question
    createdAt: String
    updatedAt: String
  }
  
  type Answer {
    id: ID!
    choice: Choice
    isRight: Boolean
    createdAt: String
    updatedAt: String
  }
  
  type User {
    id: ID!
    username: String
    createdAt: String
    updatedAt: String
  }
  
  type Mutation {
    signup(username: String!): User
    # 临时使用 userId 来获取当前用户，TODO 通过验证框架拿到当前用户
    answer(userId: ID!, questionId: ID!, choiceId: ID!): Answer
  }
  
  type Query {
    articles: [Article]
    questions: [Question]
  }
`;

// Put together a schema
const resolvers = {
  Query: {
    articles: () => getRepository(Article).find(),
    questions: () => getRepository(Question).find(),
  },

  Mutation: {
    async signup(_, { username }) {
      logger.info('signup', JSON.stringify({ username }, null, 2));
      const [, exists] = await getRepository(User).findAndCount({ username });
      if (exists) {
        throw new Error(`user '${username}' already exists.`);
      }
      if (!(username && username.trim().length >= 6)) {
        throw new Error(`username's length must be larger or equal to 6.`);
      }
      return getRepository(User).save({ username });
    },
    async answer(_, { userId, questionId, choiceId }) {
      logger.info('answer question', JSON.stringify({ userId, questionId, choiceId }, null, 2));
      const user = await getRepository(User).findOneOrFail(userId);
      const question = await getRepository(Question).findOneOrFail(questionId, {
        loadRelationIds: true,
      });
      const choice = await getRepository(Choice).findOneOrFail(choiceId);

      if (!(choice.id in question.choices)) {
        throw new Error(`operation error! ${choice.id} not in ${question.choices()}`);
      }
      const correct = await getRepository(Choice).findOneOrFail(question.correctChoice);

      const entity = new Answer();
      entity.article = { id: question.article };
      entity.isRight = choiceId === question.correctChoice;
      entity.question = { id: questionId };
      entity.choice = choiceId;
      entity.user = { id: userId };
      const answer = await getRepository(Answer).save(entity);
      return {
        answer,
        correct,
      };
    },
  },

  Article: {
    questions(article) {
      return getRepository(Question).find({
        article: { id: article.id },
        loadRelationIds: true,
      });
    },
  },

  Question: {
    article(question) {
      return getRepository(Article).findOne(question.article);
    },
    correctChoice(question) {
      return getRepository(Choice).findOne(question.correctChoice);
    },
    choices(question) {
      return getRepository(Choice).find({ question: { id: question.id } });
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
