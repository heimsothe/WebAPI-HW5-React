/*
- File: reviewForm.js
- Author: Elijah Heimsoth
- Date: 04/16/2026
- Assignment: WebAPI-HW5
- Class: CSCI 3916

Description: Inline form for submitting a new movie review on the
detail page. Dispatches submitReview thunk; on success, the parent
re-renders with the new review via fetchMovie.
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { submitReview } from '../actions/movieActions';

function ReviewForm({ movieId }) {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!review.trim()) {
            setError('Review text is required.');
            return;
        }
        setSubmitting(true);
        setError(null);
        dispatch(submitReview(movieId, review, rating))
            .then(() => {
                setReview('');
                setRating(5);
            })
            .catch((err) => setError(err.message))
            .finally(() => setSubmitting(false));
    };

    return (
        <Card className="mt-4">
            <Card.Header>Add Your Review</Card.Header>
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                            {[5, 4, 3, 2, 1].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="What did you think?"
                        />
                    </Form.Group>
                    <Button type="submit" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ReviewForm;
