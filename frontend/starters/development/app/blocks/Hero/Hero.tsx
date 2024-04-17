import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots';
import classes from './Hero.module.css';

export function HeroBlock({title, subtitle, description, buttons}) {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          <Text component="span" className={classes.highlight} inherit>
            {title}
          </Text>
        </Title>
        <Title className={classes.subtitle} order={2}>
          {subtitle}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            {description}
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} size="lg" color="powerstack">
            Book a demo
          </Button>
          <Button className={classes.control} size="lg" color="gray">
            Purchase a license
          </Button>
        </div>
      </div>
    </Container>
  );
}