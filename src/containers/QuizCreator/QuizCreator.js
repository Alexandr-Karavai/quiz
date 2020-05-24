import React, {Component} from 'react';
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {connect} from 'react-redux';
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create';

function createQuestion() {
    return {
        question: {
            label: 'Enter a question',
            errorMessage: 'Value must not be empty',
            value: '',
            valid: false,
            touched: false,
            validation: {
                required: true
            }
        },
        option1: createAnswer(1),
        option2: createAnswer(2),
        option3: createAnswer(3),
        option4: createAnswer(4)
    }
}

function createAnswer(index) {
    return {
        id: index,
        label: `Answer ${index}`,
        errorMessage: 'The answer must not be empty',
        value: '',
        valid: false,
        touched: false,
        validation: {
            required: true
        }
    }
}

class QuizCreator extends Component {
    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createQuestion()
    }

    validateControl(value, validationParam) {
        if (!validationParam) {
            return true;
        }

        let isValid = true;

        if (validationParam.required) {
            isValid = value.trim() !== '';
        }

        return isValid;
    }

    onChangeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] };

        control.value = value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        })

        this.setState({
            isFormValid, formControls
        })
    }

    onSubmitHandler = e => {
        e.preventDefault();
    }

    renderFormInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={e => this.onChangeHandler(e.target.value, controlName)}
                    />
                    { index === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = e => {
        this.setState({
            rightAnswerId: e.target.value
        })
    }

    addQuestionHandler = e => {
        e.preventDefault();
        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: +this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        this.props.createQuizQuestion(questionItem);

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createQuestion()
        })
    }

    createQuizHandler = e => {
        e.preventDefault();
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createQuestion()
        })
        this.props.finishCreateQuiz();
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Quiz creation</h1>
                    <form
                        className={classes.QuizCreatorForm}
                        onSubmit={this.onSubmitHandler}
                    >
                        {this.renderFormInputs()}
                        <Select
                            label={'Choose the correct answer'}
                            value={this.state.rightAnswerId}
                            onChange={this.selectChangeHandler}
                            options={[1, 2, 3, 4].map(index => ({text: index, value: index}))}
                        />
                        <Button
                            type={'primary'}
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Add question
                        </Button>
                        <Button
                            type={'success'}
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Create test
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);