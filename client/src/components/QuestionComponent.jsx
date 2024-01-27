import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
`;

const Title = styled.h2`
  margin: 0;
  padding-bottom: 0.5rem;
  color: #3c6ca8;
`;

const Description = styled.p`
  margin: 0 0 1rem 0;
`;

const Button = styled(motion.button)`
  border: none;
  padding: 0.5rem 1rem;
  margin: 0.2rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
`;

export default function Question({ id, title, description, answer, setAnswer }) {

  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <div>
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAnswer(id, true)}
          style={{ backgroundColor: answer === true ? 'lightgreen' : 'initial' }}
        >
          Yes
        </Button>
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAnswer(id, false)}
          style={{ backgroundColor: answer === false ? 'salmon' : 'initial' }}
        >
          No
        </Button>
      </div>
    </Container>
  );
}
