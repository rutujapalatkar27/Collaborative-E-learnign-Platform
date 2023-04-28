import React from 'react';
import { Container, Row } from "react-bootstrap";
import { Card, CardMedia } from "@mui/material";

const PdfViewer = () => {


  const fileUrl = localStorage.getItem("fileUrl")

  return (

    <Container fluid >
      <Row className="resume">
        <Card sx={{ maxWidth: 824 }}>
          <CardMedia
            className="cardmedia"
            component="iframe"
            Height="895px"
            src={fileUrl}
          />
        </Card>
      </Row>
    </Container>
  );
};

export default PdfViewer;
