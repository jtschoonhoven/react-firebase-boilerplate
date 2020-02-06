import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


interface Props {
    email: string;
    logout: () => void;
    isLoggingOut: boolean;
}


const Logout: React.FC<Props> = ({ email, logout, isLoggingOut }: Props) => {
    return (
        <div>
            <Navbar.Text>
                Logged in as { email }
                <Button
                    variant="link"
                    className="text-success"
                    onClick={ logout }
                    disabled={ isLoggingOut }
                >
                    logout
                </Button>
            </Navbar.Text>
        </div>
    );
};
export default Logout;
