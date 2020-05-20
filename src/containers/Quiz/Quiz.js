import React, {Component} from 'react';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import classes from './Quiz.module.css'

class Quiz extends Component {
    state = {
        isFinished: false,
        activeQuestion: 0,
        results: {},
        answerState: null, // {[id]: 'success' 'error'}
        quiz: [
            {
                id: 101,
                question: 'What color is the sky?',
                rightAnswerId: 123,
                answers: [
                    {id: 121, text: 'Black'},
                    {id: 122, text: 'Green'},
                    {id: 123, text: 'Blue'},
                    {id: 124, text: 'Red'}
                ]
            },
            {
                id: 102,
                question: 'In what year was St. Petersburg founded?',
                rightAnswerId: 222,
                answers: [
                    {id: 221, text: '1700'},
                    {id: 222, text: '1703'},
                    {id: 223, text: '1702'},
                    {id: 224, text: '1803'}
                ]
            }
        ]
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setAnswerState(answerId, 'success', results);

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                    console.log('Finished')
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout);
            }, 1000)
        } else {
            results[question.id] = 'error';
            this.setAnswerState(answerId, 'error', results)
        }

    }

    setAnswerState(answerId, msg, results) {
        this.setState({
            answerState: {[answerId]: msg},
            results
        })
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all the questions</h1>
                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                          />
                        : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                answerState={this.state.answerState}
                          />
                    }
                </div>
            </div>
        );
    }
}

export default Quiz;