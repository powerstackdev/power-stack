/** @jsx jsx */
import { jsx } from 'theme-ui'

import { InlineText, BlocksControls, InlineWysiwyg } from 'react-tinacms-inline';

export function Hero({ text_color, background_color, align, subtext }) {
  return (
    <div
      className="hero"
      style={{
        color: text_color || '#000',
        backgroundColor: background_color || 'aliceblue',
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
        <h1 style={{
          color: text_color || '#000'
        }}>
          <InlineText name="headline" focusRing={false} />
        </h1>
        <InlineWysiwyg name="subtext" format="html">
          <p
            dangerouslySetInnerHTML={{
              __html: subtext,
            }}
          />
        </InlineWysiwyg>
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
