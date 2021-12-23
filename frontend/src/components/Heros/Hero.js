/** @jsx jsx */
import { jsx } from 'theme-ui'
import { InlineText, BlocksControls, InlineWysiwyg } from 'react-tinacms-inline';
import Zoom from 'react-reveal/Zoom';
import {darken} from "@theme-ui/color";

export function Hero({ text_color, background_color, align, subtext }) {
  return (
    <div
      className="hero"
      sx={{
        color: text_color || '#000',
        backgroundImage: (theme) => `linear-gradient(45deg, ${background_color || 'aliceblue'}, ${darken(background_color, .2)(theme)})`,
        textAlign: align,
        justifyContent: align === 'left' ? 'start' : align,
      }}
    >
      <div sx={{
         width: `100%`,
         maxWidth: `1200px`,
         m: `0 auto`,
         p: `5rem 4rem`
      }}>
        <Zoom>
          <h1>
            <InlineText name="headline" focusRing={false} />
          </h1>
          <InlineWysiwyg name="subtext" format="html">
            <p
              dangerouslySetInnerHTML={{
                __html: subtext,
              }}
            />
          </InlineWysiwyg>
        </Zoom>
      </div>
    </div>
  );
}

export const heroBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <Hero {...data} />
    </BlocksControls>
  ),
  template: {
    label: 'Hero',
    defaultItem: {
      headline: 'Suspended in a Sunbeam',
      subtext: 'Dispassionate extraterrestrial observer',
      background_color: '#051e26',
      text_color: '#fffaf4',
      align: 'center',
    },
    fields: [
      {
        name: 'text_color',
        label: 'Text Color',
        component: 'color',
        widget: 'block',
        colors: ['#051e26', '#f2dfc6', '#cfdcc8', '#ebbbbb', '#8a1414'],
      },
      {
        name: 'align',
        label: 'Alignment',
        component: 'select',
        options: ['center', 'left'],
      },
      {
        name: 'background_color',
        label: 'Background Color',
        component: 'color',
        widget: 'block',
        colors: ['#051e26', '#f2dfc6', '#cfdcc8', '#ebbbbb', '#8a1414'],
      },
    ],
  },
};
