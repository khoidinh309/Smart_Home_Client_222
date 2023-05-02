import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';

function TimeRangePicker(startTime, handleStartTimeChange, endTime, handleEndTimeChange) {
    return (
        <Form>
            <Form.Group as={Row} controlId="timeRangePicker">
                <Form.Label column sm={2}>
                    Giờ bật đèn
                </Form.Label>
                <Col sm={4}>
                    <TimePicker
                        value={startTime}
                        onChange={handleStartTimeChange}
                        step={15 * 60}
                        start="00:00"
                        end="23:59"
                        format={24}
                    />
                </Col>
                <Form.Label column sm={2}>
                    Giờ tắt đèn
                </Form.Label>
                <Col sm={4}>
                    <TimePicker
                        value={endTime}
                        onChange={handleEndTimeChange}
                        step={15 * 60}
                        start="00:00"
                        end="23:59"
                        format={24}
                    />
                </Col>
            </Form.Group>
        </Form>
    );
}

export default TimeRangePicker;
