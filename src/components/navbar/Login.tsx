import React from 'react';
import Nav from 'react-bootstrap/Nav';

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setShowModal }: Props) => {
    return (
        <Nav.Link href="#" className="text-success" onClick={ (): void => setShowModal(true) }>
            Login
        </Nav.Link>
    );
};
export default Login;
