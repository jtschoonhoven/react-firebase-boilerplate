import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
    title: string;
    children: React.ReactNode;
    onSubmit: () => void;
}

const ModalView: React.FC<Props> = (props: Props) => {
    const {
        title,
        children,
        show,
        setShow,
        onSubmit,
    } = props;

    return (
        <Modal show={ show } onHide={ (): void => setShow(false) }>
            <Modal.Header closeButton>
                <Modal.Title>{ title }</Modal.Title>
            </Modal.Header>
            <Modal.Body> { children }</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ (): void => setShow(false) }>
                    Close
                </Button>
                <Button variant="primary" onClick={ (): void => onSubmit() }>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalView;
