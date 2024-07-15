// MainApp.js
import React, { useState } from 'react';
import { Form, Button, Spinner, Card, Row, Col } from 'react-bootstrap';
import '../App.css';
import sajiya from '../images/1.jpg'
import mahiya from '../images/3.jpg'
import ranila from '../images/4.jpg'
import narmal from '../images/2.jpg'


const MainApp = () => {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isCow, setIsCow] = useState(false);
  const [owner, setOwner] = useState(null);

  const apiKey = 'acc_eb11111ba4618f5';
  const apiSecret = '33a81ef7ece365eaad2c2342d38842c1';

  const owners = [
    { name: 'මහින්ද මහත්තයා', photo: mahiya },
    { name: 'නාමල් බේබි', photo: narmal },
    { name: 'රනිල් බොසා', photo: ranila },
    { name: 'සජියා', photo: sajiya }
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    setIsCow(false);
    setOwner(null);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://api.imagga.com/v2/tags', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${apiKey}:${apiSecret}`)
        },
        body: formData
      });
      const data = await response.json();
      if (data.result && data.result.tags) {
        const extractedTags = data.result.tags.map(tag => tag.tag.en);
        setTags(extractedTags);
        if (extractedTags.includes('cow')) {
          setIsCow(true);
          setOwner(owners[Math.floor(Math.random() * owners.length)]);
        }
      } else {
        setTags([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setTags([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative-box">
      <div className="preview-image-box">
        {preview ? (
          <img src={preview} className="img-fluid preview-image" alt="Preview" />
        ) : (
          <p>No image uploaded</p>
        )}
      </div>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row>
          <Col xs={10}>
            <Form.Group>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Col>
          <Col xs={2} className="d-flex align-items-center justify-content-end">
            <Button type="submit" variant="primary">Upload</Button>
          </Col>
        </Row>
      </Form>
      {loading && <Spinner animation="border" variant="primary" />}
      {!loading && tags.length > 0 && !isCow && (
        <div className="alert alert-warning">
          <p>මේ හරකෙක් නෙවේ</p>
        </div>
      )}
      {isCow && owner && (
        <div className="alert alert-success text-center">
                  <p>හරකාගේ අයිතිකරු</p>
                  <Card style={{ width: '18rem' }}>
                      <Card.Img className='card-image' variant="top" src={owner.photo} />
                      <Card.Body>
                          <Card.Title>{owner.name}</Card.Title>
                      </Card.Body>
                  </Card>
              </div>
      )}
    </div>
  );
};

export default MainApp;
