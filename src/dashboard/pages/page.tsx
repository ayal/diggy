import React, { useEffect, useState, type FC } from 'react';
import { dashboard } from '@wix/dashboard';
import "./styles.global.css";

import {
  Button,
  EmptyState,
  Page,
  TextButton,
  WixDesignSystemProvider,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import * as Icons from '@wix/wix-ui-icons-common';
import ErrorBoundary from './ErrorBoundary';
import { items, collections } from '@wix/data';

const PageBody = () => {
  return (
    <div className="page-body">
     <EmptyState />
    </div>
  );
};

const Index: FC = () => {
  return (
    <WixDesignSystemProvider>
      <ErrorBoundary>
        <Page>
          <Page.Header
            title="Some App"
            subtitle="Some App subtitle"
          />
          <Page.Content>
            <PageBody />
          </Page.Content>
        </Page>
      </ErrorBoundary>
    </WixDesignSystemProvider>
  );
};

export default Index;