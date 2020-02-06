import React, { useState } from 'react';

import Modal from './Modal';
import LoginForm from '../common/LoginForm';


interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
}


const LoginModal: React.FC<Props> = ({ show, setShow }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onSuccess = (): void => { setShow(false); };

    return (
        <Modal
            title="Login"
            show={ show }
            setShow={ setShow }
            onSubmit={ (): void => setIsSubmitting(true) }
        >
            <LoginForm
                onSubmitSuccess={ onSuccess }
                isSubmitting={ isSubmitting }
                setIsSubmitting={ setIsSubmitting }
                useExternalSubmit
            />
        </Modal>
    );
};
export default LoginModal;
