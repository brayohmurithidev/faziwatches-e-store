import React from 'react';
import {Button} from "@mui/material";

const DynamicModal = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">

            <div className="modal-content">
                {children}
                <Button variant='contained' className="close-button" onClick={onClose}>Close</Button>
            </div>
        </div>
    );
};

export default DynamicModal;
