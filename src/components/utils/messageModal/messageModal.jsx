import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MessageModal(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Phát hiện đột nhập</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Cảnh báo</h4>
                <p>Nhà của bạn đang có người lạ, hãy xác nhận với người thân của bạn để đảm bảo an toàn</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MessageModal;
