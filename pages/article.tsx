import React from 'react';
import _ from 'lodash';

import Layout from '../components/Layout';
import Article from '../containers/Article';

export default ({ url }) => (
  <Layout>
    <Article userId={_.get(url, 'query.uid')} />
  </Layout>
);
