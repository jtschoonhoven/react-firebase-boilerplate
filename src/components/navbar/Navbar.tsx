import React, { useState } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Login from './Login';
import Logout from './Logout';
import LoginModal from '../modal/LoginModal';
import userService from '../../services/user-service';
import { User } from '../../store/user-store';
import { AppState, AppDispatch } from '../../store/store';


interface StateProps {
    user: User | null;
    email: string;
    isLoggingOut: boolean;
}

interface DispatchProps {
    logout: () => void;
}

const mapStateToProps = (state: AppState): StateProps => {
    const { user } = state.users;
    const email = user ? user.email : 'unknown';
    const { isLoggingOut } = state.users;
    return { user, email, isLoggingOut };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
    return {
        logout: (): void => { userService.logout(dispatch); },
    };
};

const NavBar: React.FC<StateProps & DispatchProps> = (props: StateProps & DispatchProps) => {
    const [showModal, setShowModal] = useState(false);
    const {
        user,
        email,
        logout,
        isLoggingOut,
    } = props;

    return (
        <Navbar variant="dark" bg="dark" expand="sm">
            <Navbar.Brand href="#" className="text-secondary">TEMPLATE</Navbar.Brand>
            <Nav className="ml-auto">
                {(user
                    ? <Logout email={ email } logout={ logout } isLoggingOut={ isLoggingOut } />
                    : <Login setShowModal={ setShowModal } />
                )}
            </Nav>
            { showModal && <LoginModal show={ showModal } setShow={ setShowModal } /> }
        </Navbar>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
