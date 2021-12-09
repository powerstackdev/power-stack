import React from 'react';
import { useForm, usePlugin, useCMS } from 'tinacms';
import { imagesBlock } from '../../../../components/Images';
import { paragraphBlock } from '../../../../components/Paragraph';
import { featureListBlock } from '../../../../components/FeatureList';

import { InlineForm, InlineBlocks } from 'react-tinacms-inline';
import { heroBlock } from '../../../../components/Hero';
import data from '../../../../data/data.json';
import '../../../../styles/index.css'
import Layout from '../../../../components/layout';
import Seo from '../../../../components/seo';

export default function Home() {
  const cms = useCMS();
  const formConfig = {
    id: '../../../../data/data.json',
    initialValues: data,
    onSubmit() {
      cms.alerts.success('Saved!');
    },
  };

  const [, form] = useForm(formConfig);

  usePlugin(form);

  return (
    <Layout>
      <Seo title="Edit page" />
      <div className='home'>
        <InlineForm form={form}>
          <InlineBlocks name='blocks' blocks={HOME_BLOCKS} />
        </InlineForm>
      </div>
    </Layout>
  );
}

const HOME_BLOCKS = {
  hero: heroBlock,
  images: imagesBlock,
  paragraph: paragraphBlock,
  features: featureListBlock,
};
