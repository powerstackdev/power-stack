import { Text, Container } from "@mantine/core"
import classes from "./Stats.module.css"

export function StatsBlock({ data }) {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ))
  return (
    <Container size={"md"}>
      <div className={classes.root}>{stats}</div>
    </Container>
  )
}
