#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playername;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'HEY YOU! WANT A MILLION DOLLARS??'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am MR.PAPER, and i am installed on your computer.
        If you get any questions wrong, I will ${chalk.bgRed('kill Jeff.')}
        So get all the questions right...
    `);

}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'what is your name?',
        default () {
            return 'Player';
        },
    });

    playername = answers.player_name;
}

// QUESTIONS

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Who made Jeff?',
        choices: [
            'Foonn',
            'Alek',
            'Lois',
            'Nugget',
        ],
    });

    return handleAnswer(answers.question_1 == 'Foonn')
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Who made Rob?',
        choices: [
            'Cooner',
            'Alek',
            'Lois',
            'Charlie',
        ],
    });

    return handleAnswer(answers.question_1 == 'Cooner')
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'Who made Mr. No Internet',
        choices: [
            'Foonn',
            'Alek',
            'Bobby',
            'Nugget',
        ],
    });

    return handleAnswer(answers.question_1 == 'Alek')
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'Who made Madcow?',
        choices: [
            'Lois',
            'Foonn',
            'Bobby',
            'Nugget',
        ],
    });

    return handleAnswer(answers.question_1 == 'Bobby')
}

async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'WHO IS THE BEST???',
        choices: [
            'Mr. Paper',
            'Mr.Paper',
            'Jeff',
            'MrPaper',
        ],
    });

    return handleAnswer(answers.question_1 == 'Mr. Paper')
}

// Handle Answers

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking Answer...').start();
    await sleep();
    
    if (isCorrect) {
        spinner.success({ text: `Good job, ${playername}, i guess.`});
    } else {
        spinner.error({text: `HA HA! JEFF IS GONNA DIE!!!`})
        process.exit(1);
    }
}

// Winner

function winner() {
    console.clear();
    const msg = `Ok then, ${playername}, you get the million dollars.`;

    figlet(msg, (err, data) => {
        console.log(msg)
    });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await winner();