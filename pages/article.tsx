import React from 'react';
import _ from 'lodash';
import Link from 'next/link';

import Layout from '../components/Layout';
import Article from '../containers/Article';

export default ({ url }) => (
  <Layout>
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link href="/">
              <a className="navbar-item">to home</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <Article userId={_.get(url, 'query.uid')} />
  </Layout>
);
