import React from 'react';
import classes from './FinishedQuiz.module.css'
import Button from "../UI/Button/Button";

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++;
        }

        return total;
    }, 0);

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((item, index) => {
                    const cls = [
                        'fa',
                        props.results[item.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[item.id]]
                    ];

                    return (
                        <li key={item.id}>
                            <strong>{index + 1}. </strong>
                            {item.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    );
                  })
                }
            </ul>
            <p>Right {successCount} from {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type='primary'>Repeat</Button>
                <Button type='success'>All tests</Button>
            </div>
        </div>
    );
};

export default FinishedQuiz;