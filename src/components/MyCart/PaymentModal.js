import React, { useState } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';

function PaymentModal({ open, onClose }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleSubmit = () => {
    alert('Payment is in preview mode!');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Enter payment details</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Card Number</label>
            <input placeholder='Card Number' value={cardNumber} onChange={handleCardNumberChange} />
          </Form.Field>
          <Form.Field>
            <label>Expiry Date</label>
            <input placeholder='MM/YY' value={expiryDate} onChange={handleExpiryDateChange} />
          </Form.Field>
          <Form.Field>
            <label>CVV</label>
            <input placeholder='CVV' value={cvv} onChange={handleCvvChange} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={onClose}>Cancel</Button>
        <Button color='green' onClick={handleSubmit}>Pay</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default PaymentModal;
