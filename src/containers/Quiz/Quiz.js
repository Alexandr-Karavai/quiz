import React, {Component} from 'react';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import classes from './Quiz.module.css'

class Quiz extends Component {
    state = {
        activeQuestion: 0,
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
        const question = this.state.quiz[this.state.activeQuestion];

        if (question.rightAnswerId === answerId) {
            this.setAnswerState(answerId, 'success')

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
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
            this.setAnswerState(answerId, 'error')
        }

    }

    setAnswerState(answerId, msg) {
        this.setState({
            answerState: {[answerId]: msg}
        })
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all the questions</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        answerState={this.state.answerState}
                    />
                </div>
            </div>
        );
    }
}

export default Quiz;