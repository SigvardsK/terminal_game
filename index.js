#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 4000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const neonTitle = chalkAnimation.neon(
        'Lets play a NFL trivia game! \n'
    );

    await sleep();
    neonTitle.stop();

    console.log(`
    ${chalk.bgCyan('HOW TO PLAY')} 
    I created this game from a tutorial on youtube.
    The game is a simple trivia. Answer right - move on.
    If you get any question wrong you will be ${chalk.bgRed('killed')}
    So get all the questions right...
  `);
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Im thinking...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Very good ${playerName}! That's a legit answer` });
    } else {
        spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
        process.exit(1);
    }
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

function winner() {
    console.clear();
    figlet(`Congratulations, ${playerName} !\n You are a legit Tom Brady fan!`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');

        console.log(
            chalk.green(
                `It appears you know your Tom Brady stuff!`
            )
        );
        process.exit(0);
    });
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Which number was Tom Brady drafted with?\n',
        choices: [
            '2',
            '1',
            '129',
            '199',
        ],
    });

    return handleAnswer(answers.question_1 === '199');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'In how many Super Bowls Tom Brady has played?\n',
        choices: [
            '10',
            '7',
            '11',
            '9',
        ],
    });

    return handleAnswer(answers.question_2 === '10');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'How many Regular season MVPs has Tom Brady won?\n',
        choices: [
            '1',
            '2',
            '3',
            '4',
        ],
    });

    return handleAnswer(answers.question_3 === '3');
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
winner();