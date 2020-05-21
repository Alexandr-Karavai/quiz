import React, {Component} from 'react';
import classes from './QuizList.module.css'
import {NavLink} from "react-router-dom";

class QuizList extends Component {
    renderQuizzes() {
        return [1, 2, 3].map((quiz, index) => {
            return (
                <li
                    key={index}
                >
                    <NavLink to={`quiz/${quiz}`}>
                        {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Quiz List</h1>
                    <ul>
                        {this.renderQuizzes()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default QuizList;