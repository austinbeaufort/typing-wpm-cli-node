'use strict'

const { input } = require('console-input')
const randomWords = require('random-words')


async function main() {
    print(getWelcome())
    checkUserReady()
    await countdown()
    print(getBorder())
    const words = getWords()
    print(words)

    const { start, end, userInput } = getTimeAndInput()
    const secondsElapsed = (end - start) / 1000

    const accuracy = getAccuracy(userInput, words)
    const WPM = getWPM(userInput, secondsElapsed)

    print(WPM)
    print(accuracy)
}


function getTimeAndInput() {
    const start = Date.now()
    const userInput = input('')
    const end = Date.now()
    return { start, end, userInput }
}

function getWPM(userInput, secondsElapsed) {
    const numChars = userInput.length;
    const WPM = Math.round((numChars / 5) / secondsElapsed * 60);
    return `Words per Minute: ${WPM}`;
}


function getAccuracy(userInput, words) {
    const userArray = userInput.split('')
    const chars = words.split('')
    
    const correct = getNumberCorrect(chars, userArray)
    const percentCorrect = getPercent(correct, chars.length)
    return `Accuracy: ${percentCorrect}%`
}

const getPercent = (correct, totalChars) => Math.round((correct / totalChars) * 100)

function getNumberCorrect(chars, userArray) {
    let correct = 0
    chars.forEach((_, index) => {
        if (chars[index] === userArray[index])
            correct += 1
    })
    return correct
}


const getWelcome = () => '\nCheck Your WPM.\nTo begin type "start"'


function checkUserReady() {
    while(true) {
        const userInput = input('')
        if (userInput.toLowerCase() === 'start')
            break
        else
            print('\nplease type "start" to begin')
    }
}


async function countdown() {
    print('\n3')
    await sleep(1)
    print('2')
    await sleep(1)
    print('1')
    await sleep(1)
    print('GO!!!\n')
}



const sleep = seconds => new Promise(resolve => setTimeout(resolve, (seconds * 1000)))

const getBorder = () => '***************************************************************************************'

const getWords = () => randomWords({ exactly: 10, join: ' ' })

const print = item => console.log(item)

main()