import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';

const VideoRecommendations = () => {
    const [userInput, setUserInput] = useState('');
    const [videoRecommendations, setVideoRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Show spinner
        try {
            const response = await axios.post('http://localhost:8000/api/v1/recommendations', {
                usertext: userInput.trim(),
            });
            setVideoRecommendations(response.data.videoRecommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
        setIsLoading(false); // Hide spinner
    };

    return (
        <Container>
            <h1 className="mt-4 mb-3">YouTube Video Recommendations</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="userInput">
                    <Form.Label>Enter Your Input:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Type your input here"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required
                    />
                </Form.Group>
                {isLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="sr-only"></span>
                    </Spinner>
                ) : (
                    <Button variant="primary" type="submit">
                        Get Recommendations
                    </Button>
                )}
            </Form>
            <Row>
                {videoRecommendations.map(video => (
                    <Col key={video.id.videoId} lg={4} md={6} className="mb-4">
                        <Card>
                            <iframe
                                title={video.snippet.title}
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <Card.Body>
                                <Card.Title>{video.snippet.title}</Card.Title>
                                <Card.Text>{video.snippet.description}</Card.Text>
                                <Card.Text>Channel: {video.snippet.channelTitle}</Card.Text>
                                <Card.Text>Publish Time: {video.snippet.publishTime}</Card.Text>
                            </Card.Body>
                        </Card>

                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default VideoRecommendations;
