import React from 'react';
import classes from './AnswersList.module.css'
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => {
    return (
        <ul className={classes.AnswersList}>
            { props.answers.map((answer, index) => (
                <AnswerItem
                    key={answer.id}
                    answer={answer}
                    answerState={props.answerState ? props.answerState[answer.id] : null}
                    onAnswerClick={props.onAnswerClick}
                />
                ))}

            {/*{ props.answers.map((answer, index) => {*/}
            {/*   return (*/}
            {/*       <AnswerItem*/}
            {/*       key={index}*/}
            {/*       answer={answer}/>)*/}
            {/*})}*/}
        </ul>
    );
};

export default AnswersList;