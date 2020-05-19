import React from 'react';
import classes from './ActiveQuiz.module.css'
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{props.answerNumber}. </strong>
                    {props.question}
                </span>
                <small>{props.answerNumber} from {props.quizLength}</small>
            </p>
            <AnswersList
                answers={props.answers}
                answerState={props.answerState}
                onAnswerClick={props.onAnswerClick}
            />
        </div>
    );
};

export default ActiveQuiz;