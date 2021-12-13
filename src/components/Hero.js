import React from 'react';
import { InlineTextarea, BlocksControls, InlineWysiwyg } from 'react-tinacms-inline';
import '../styles/hero.css';

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
      <div className="wrapper wrapper--narrow">
        <h1 style={{
          color: text_color || '#000'
        }}>
          <InlineTextarea name="headline" focusRing={false} style={{
          color: text_color + `!important` || '#000'
        }} />
        </h1>
        <InlineWysiwyg name="text" format="html">
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
        component: 'select',
        options: ['white', 'black'],
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
