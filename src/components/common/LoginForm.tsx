import React, { useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import userService, { UserCredentials } from '../../services/user-service';
import { AppDispatch } from '../../store/store';
import { User } from '../../store/user-store';


interface DispatchProps {
    login: (credentials: UserCredentials) => Promise<User>;
}

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
    return {
        login: (credentials: UserCredentials): Promise<User> => {
            return userService.login(dispatch, credentials);
        },
    };
};


interface Props {
    isSubmitting?: boolean;
    setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
    useExternalSubmit?: boolean;
    onSubmitSuccess?: (user: User) => void;
    onSubmitFailure?: (error: Error) => void;
}


const LoginForm: React.FC<Props & DispatchProps> = (props: Props & DispatchProps) => {
    let [isSubmitting, setIsSubmitting] = useState(!!props.isSubmitting);

    if (props.isSubmitting) {
        isSubmitting = props.isSubmitting;
    }

    if (props.setIsSubmitting) {
        setIsSubmitting = props.setIsSubmitting;
    }

    // hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [blockResubmit, setBlockResubmit] = useState(false);

    // callback receives firebase user on successful login
    const onSubmitSuccess = (user: User): void => {
        setIsSubmitting(false);
        setBlockResubmit(false);
        setErrorMessage('');
        setSuccessMessage('Success!');
        if (props.onSubmitSuccess) {
            props.onSubmitSuccess(user);
        }
    };

    // callback receives error on failed login
    const onSubmitFailure = (err: Error): void => {
        setIsSubmitting(false);
        setBlockResubmit(false);
        setErrorMessage(err.message);
        setSuccessMessage('');
        if (props.onSubmitFailure) {
            props.onSubmitFailure(err);
        }
    };

    // onSubmit handler runs when login form is submitted
    const onSubmit = (): void => {
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');
        props.login({ email, password })
            .then(onSubmitSuccess)
            .catch(onSubmitFailure);
    };

    if (props.useExternalSubmit && isSubmitting && !blockResubmit) {
        setBlockResubmit(true);
        onSubmit();
    }

    return (
        <Form>
            {/* success */}
            { successMessage && (
                <Form.Text className="text-success lead">
                    { successMessage }
                </Form.Text>
            )}

            {/* error */}
            { errorMessage && (
                <Form.Text className="text-danger lead">
                    { errorMessage }
                </Form.Text>
            )}

            {/* email */}
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={ email }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value) }
                    disabled={ isSubmitting }
                    required
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            {/* password */}
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={ password }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value) }
                    disabled={ isSubmitting }
                    required
                />
            </Form.Group>
            <hr />

            {/* submit */}
            { props.useExternalSubmit || (
                <Button
                    variant="primary"
                    type="submit"
                    disabled={ isSubmitting }
                    onClick={ onSubmit }
                >
                    Submit
                </Button>

            )}
        </Form>
    );
};
export default connect(null, mapDispatchToProps)(LoginForm);
