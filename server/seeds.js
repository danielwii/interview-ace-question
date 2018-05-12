import { getRepository } from 'typeorm';
import { Article } from './entities/Article';
import { Choice } from './entities/Choice';
import { Question } from './entities/Question';

const logger = require('consola').withScope('server');

/**
 * load test data when no articles exists
 * @returns {Promise<void>}
 */
export async function loadSeeds() {
  const articleRepo = getRepository(Article);
  const questionRepo = getRepository(Question);
  const choiceRepo = getRepository(Choice);

  const count = await articleRepo.count();
  if (count === 0) {
    logger.info('try load test data...');
    let article = new Article();
    article.content = `The Gates Foundation is regrouping after its latest school improvement disappointment, but it’s not bowing out of the education reform business.
  
  As the philanthropic powerhouse led by Bill and Melinda Gates explained in their latest
  annual letter to the public, it ended its effort to overhaul teacher evaluation systems after determining that these efforts were failing to generate intended results.
  
  “We haven’t seen the large impact we had hoped for,” the Microsoft founder and his wife
  wrote in the note they published in February.
  Bill Gates, speaking at the 2009 ‘Get Schooled’ conference his foundation co-sponsored. AP
  Photo/Jae C. Hong
  
  It’s a familiar storyline. Again and again, policymakers and philanthropists have teamed up to reform public education, only to find that their bold projects have fallen short.
  
  Like other educational policy scholars, we have observed this pattern for years. And we have
  identified a few reasons why school reform efforts so persistently get lackluster results,
  despite consistent bipartisan support and roughly US$4 billion a year in philanthropic funding derived from some of the nation’s biggest fortunes.`;

    // --------------------------------------------------------------
    // Question 1
    // --------------------------------------------------------------

    let question1 = new Question();
    question1.original = 1;
    question1.title =
      'Which Foundation is regrouping after its latest school improvement disappointment';

    let choice1_a = new Choice();
    choice1_a.key = 'A';
    choice1_a.value = 'The Material World Charitable Foundation (MWF)';
    let choice1_b = new Choice();
    choice1_b.key = 'B';
    choice1_b.value = 'ASX Thomson Reuters Charity Foundation';
    let choice1_c = new Choice();
    choice1_c.key = 'C';
    choice1_c.value = 'The Gates Foundation';
    choice1_c.isCorrect = true;
    let choice1_d = new Choice();
    choice1_d.key = 'D';
    choice1_d.value = 'Templeton World Charity Foundation, Inc. (TWCF)';

    await choiceRepo.save([choice1_a, choice1_b, choice1_c, choice1_d]);

    question1.choices = [choice1_a, choice1_b, choice1_c, choice1_d];
    question1.correctChoice = choice1_c;
    await questionRepo.save(question1);

    // --------------------------------------------------------------
    // Question 2
    // --------------------------------------------------------------

    let question2 = new Question();
    question2.original = 2;
    question2.title = 'which is smile face';

    let choice2_a = new Choice();
    choice2_a.key = 'A';
    choice2_a.value = '😊';
    choice2_a.isCorrect = true;
    let choice2_b = new Choice();
    choice2_b.key = 'B';
    choice2_b.value = '🐍';
    let choice2_c = new Choice();
    choice2_c.key = 'C';
    choice2_c.value = '🚄';
    let choice2_d = new Choice();
    choice2_d.key = 'D';
    choice2_d.value = '✈️';

    await choiceRepo.save([choice2_a, choice2_b, choice2_c, choice2_d]);

    question2.choices = [choice2_a, choice2_b, choice2_c, choice2_d];
    question2.correctChoice = choice2_a;
    await questionRepo.save(question2);

    // --------------------------------------------------------------
    // Question 3
    // --------------------------------------------------------------

    let question3 = new Question();
    question3.original = 3;
    question3.title = 'which is biggest';

    let choice3_a = new Choice();
    choice3_a.key = 'A';
    choice3_a.value = '-1';
    let choice3_b = new Choice();
    choice3_b.key = 'B';
    choice3_b.value = '100';
    let choice3_c = new Choice();
    choice3_c.key = 'C';
    choice3_c.value = '101';
    let choice3_d = new Choice();
    choice3_d.key = 'D';
    choice3_d.value = 'biggest';
    choice3_d.isCorrect = true;

    await choiceRepo.save([choice3_a, choice3_b, choice3_c, choice3_d]);

    question3.choices = [choice3_a, choice3_b, choice3_c, choice3_d];
    question3.correctChoice = choice3_d;
    await questionRepo.save(question3);

    article.questions = [question1, question2, question3];

    await articleRepo.save(article);
  }
}
