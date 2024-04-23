import type { Config } from "@measured/puck"
import { HeaderMenu } from "./components/Header/Header"
import { FooterLinks } from "./components/Footer/Footer"
import { HeroBlock } from "./app/blocks/Hero/Hero"
import { TextBlock } from "./app/blocks/Text/Text"
import { StatsBlock } from "./app/blocks/Stats/Stats"

type Props = {
  HeadingBlock: { title: string }
}

export const config: Config<Props> = {
  components: {
    Hero: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "text" },
        description: { type: "textarea" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title, subtitle, description }) => (
        <HeroBlock
          title={title}
          subtitle={subtitle}
          description={description}
        />
      ),
    },
    Text: {
      fields: {
        title: { type: "text" },
        text: { type: "textarea" },
      },
      defaultProps: {
        title: "Heading",
        text: "Enter text here",
      },
      render: ({ title, text }) => <TextBlock title={title} text={text} />,
    },
    // Stats: {
    //   fields: {
    //     stats: {
    //       type: "array",
    //       arrayFields: {
    //         stats: { type: "text" },
    //         title: { type: "text" },
    //         description: { type: "textarea" }
    //       }
    //     },
    //   },
    //   defaultProps: {
    //     stats: [
    //       {
    //         title: 'Page views',
    //         stats: '456,133',
    //         description: '24% more than in the same month last year, 33% more that two years ago',
    //       },
    //       {
    //         title: 'New users',
    //         stats: '2,175',
    //         description: '13% less compared to last month, new user engagement up by 6%',
    //       },
    //       {
    //         title: 'Completed orders',
    //         stats: '1,994',
    //         description: '1994 orders were completed this month, 97% satisfaction rate',
    //       },
    //     ]
    //   },
    //   render: ({ stats }) => (
    //     <StatsBlock data={stats}/>
    //   ),
    // },
  },
  root: {
    render: ({ children }) => {
      return (
        <>
          <HeaderMenu />
          {children}
          <FooterLinks />
        </>
      )
    },
  },
}

export default config
