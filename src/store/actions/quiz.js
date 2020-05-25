import axios from 'axios';
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZZES_START,
    FETCH_QUIZZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from './actionTypes';

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
            dispatch(fetchQuizzesError(e));
        }
    }
}

export function fetchQuizById(id) {
    return async dispatch => {
        dispatch(fetchQuizzesStart());
        try {
            const res = await axios.get(`https://quiz-react-d35d5.firebaseio.com/quizzes/${id}.json`);
            const quiz = res.data;
            dispatch(fetchQuizSuccess(quiz));
        } catch (e) {
            dispatch(fetchQuizzesError(e));
        }
    }
}

export function fetchQuizzesStart() {
    return {
        type: FETCH_QUIZZES_START
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
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

export function setAnswerState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion];
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            dispatch(setAnswerState({[answerId]: 'success'}, results));

            const timeout = window.setTimeout(() => {
                if (state.activeQuestion + 1 === state.quiz.length) {
                    dispatch(finishQuiz());
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1));
                }
                window.clearTimeout(timeout);
            }, 1000)
        } else {
            results[question.id] = 'error';
            dispatch(setAnswerState({[answerId]: 'error'}, results));

            const timeout = window.setTimeout(() => {
                dispatch(quizNextQuestion(state.activeQuestion + 1));
                window.clearTimeout(timeout);
            }, 1000)
        }
    }
}