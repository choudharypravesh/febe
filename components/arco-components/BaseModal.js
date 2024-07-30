import React from 'react';
import { Modal, Button } from '@arco-design/web-react';

const BaseModal = ({
    showConfirmation,
    setShowConfirmation,
    title,
    text,
    onConfirm,
    markClosable = false,
}) => {
    const onOkClick = () => {
        onConfirm();
        setShowConfirmation(false);
    };

    return (
        <div>
            <Modal
                title={title}
                visible={showConfirmation}
                okText="Yes"
                cancelText="No"
                onOk={() => onOkClick()}
                onCancel={() => setShowConfirmation(false)}
                autoFocus={false}
                focusLock={true}
                maskClosable={markClosable}
            >
                <p>{text}</p>
            </Modal>
        </div>
    );
};

export default BaseModal;
