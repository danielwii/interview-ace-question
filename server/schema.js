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
    answers(userId: ID!): [Answer]
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
    isCorrect: Boolean
    key: String
    value: String
    question: Question
    createdAt: String
    updatedAt: String
  }
  
  type Answer {
    id: ID!
    isCorrect: Boolean
    choice: Choice
    question: Question
    article: Article
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
    question(id: ID!): Question
  }
`;

// Put together a schema
const resolvers = {
  Query: {
    articles: () => getRepository(Article).find(),
    questions: () => getRepository(Question).find(),
    question: (_, { id }) => getRepository(Question).findOneOrFail(id),
  },

  Mutation: {
    /**
     * 用户注册
     * @param _
     * @param username
     * @returns {Promise<{username: *}>}
     */
    async signup(_, { username }) {
      logger.debug('signup', JSON.stringify({ username }, null, 2));
      const [, exists] = await getRepository(User).findAndCount({ username });
      if (exists) {
        throw new Error(`user '${username}' already exists.`);
      }
      if (!(username && username.trim().length >= 6)) {
        throw new Error(`username's length must be larger or equal to 6.`);
      }
      return getRepository(User).save({ username });
    },
    /**
     * 回答问题
     * @param _
     * @param userId
     * @param questionId
     * @param choiceId
     * @returns {Promise<Answer>}
     */
    async answer(_, { userId, questionId, choiceId }) {
      logger.debug('answer question', JSON.stringify({ userId, questionId, choiceId }, null, 2));
      const user = await getRepository(User).findOneOrFail(userId);
      const question = await getRepository(Question).findOneOrFail(questionId, {
        loadRelationIds: true,
      });
      const choice = await getRepository(Choice).findOneOrFail(choiceId);
      // logger.info(JSON.stringify({ choice, user, question }, null, 2));

      if (!question.choices.includes(choice.id)) {
        throw new Error(`operation error! ${choice.id} not in ${question.choices}`);
      }

      const entity = new Answer();
      entity.article = { id: question.article };
      entity.question = { id: questionId };
      entity.choice = choiceId;
      entity.isCorrect = choice.isCorrect;
      entity.user = { id: userId };

      const [existsAnswers, exists] = await getRepository(Answer).findAndCount({
        where: {
          user: { id: userId },
          article: { id: question.article },
          question: { id: questionId },
        },
      });
      if (exists) {
        // 目前限制了只能回答一次
        // await getRepository(Answer).remove(existsAnswers);
        throw new Error(`question '${questionId}' already answered.`);
      }
      const answer = await getRepository(Answer).save(entity);
      return getRepository(Answer).findOneOrFail(answer.id, { loadRelationIds: true });
    },
  },

  Article: {
    questions: article =>
      getRepository(Question).find({
        where: { article: { id: article.id } },
        loadRelationIds: true,
      }),
    answers: (article, { userId }) => {
      logger.debug('Article.answers', JSON.stringify({ article, userId }, null, 2));
      return getRepository(Answer).find({
        where: {
          user: { id: userId },
          article,
        },
        loadRelationIds: true,
      });
    },
  },

  Answer: {
    choice: answer => {
      // logger.info('Answer.choice', JSON.stringify(answer, null, 2));
      return answer.choice && getRepository(Choice).findOneOrFail(answer.choice);
    },
    question: answer => {
      // logger.info('Answer.question', JSON.stringify(answer, null, 2));
      return answer.question && getRepository(Question).findOneOrFail(answer.question);
    },
    article: answer => {
      // logger.info('Answer.article', JSON.stringify(answer, null, 2));
      return answer.article && getRepository(Article).findOneOrFail(answer.article);
    },
  },

  Question: {
    article(question) {
      return question.article && getRepository(Article).findOneOrFail(question.article);
    },
    async correctChoice(question) {
      const reload = await getRepository(Question).findOne(question.id, { loadRelationIds: true });
      // logger.info(JSON.stringify({ question, reload }, null, 2));
      return reload.correctChoice && getRepository(Choice).findOneOrFail(reload.correctChoice);
    },
    choices(question) {
      return question && getRepository(Choice).find({ where: { question } });
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
