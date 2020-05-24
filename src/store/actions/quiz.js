import axios from 'axios';
import {FETCH_QUIZZES_ERROR, FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS} from './actionTypes';

export function fetchQuizzes() {
    return async dispatch => {
        dispatch(fetchQuizzesStart());
        try {
            const res = await axios.get('https://quiz-react-d35d5.firebaseio.com/quizzes.json');
            const quizzes = [];
            Object.keys(res.data).forEach((key, index) => {
                quizzes.push({
                    id: key,
                    name: `Test №${index + 1}`
                })
            })
            dispatch(fetchQuizzesSuccess(quizzes));
        } catch (e) {
            dispatch(fetchQuizzesError(e))
            console.log(e);
        }
    }
}

export function fetchQuizzesStart() {
    return {
        type: FETCH_QUIZZES_START,
    }
}

export function fetchQuizzesSuccess(quizzes) {
    return {
        type: FETCH_QUIZZES_SUCCESS,
        quizzes
    }
}

export function fetchQuizzesError(e) {
    return {
        type: FETCH_QUIZZES_ERROR,
        error: e
    }
}