import { Title, Text, Button, Container } from '@mantine/core';
import classes from './Text.module.css';

export function TextBlock({title, text}) {
  return (
    <Container className={classes.wrapper} size={'lg'}>
      <div className={classes.inner}>
        <Title className={classes.title} order={2}>
          {title}
        </Title>
        <Text size="lg">
          {text}
        </Text>
      </div>
    </Container>
  );
}