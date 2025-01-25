import React, { useEffect, useState, type FC } from 'react';
import { dashboard } from '@wix/dashboard';
import {
  Button,
  EmptyState,
  Image,
  Page,
  TextButton,
  WixDesignSystemProvider,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import * as Icons from '@wix/wix-ui-icons-common';
import wixLogo from './wix_logo.svg';
import ErrorBoundary from './ErrorBoundary';
import { items, collections } from '@wix/data';

const PageBody = () => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = async () => {
    setCounter(counter + 1);
    const counterItems = await items.queryDataItems({ dataCollectionId: 'counter' }).find();
    const counterItem = counterItems.items[0];
    
    // update the counter in the data collection
    await items.saveDataItem({
      dataItem: {
        _id: counterItem?._id,
        data: { counter: counter + 1 }
      },
      dataCollectionId: 'counter',
    });
    
  }
  const decrementCounter = async () => {
    setCounter(counter - 1);
    
    const counterItems = await items.queryDataItems({ dataCollectionId: 'counter' }).find();
    const counterItem = counterItems.items[0];

    // update the counter in the data collection
    await items.saveDataItem({
      dataItem: {
        _id: counterItem?._id,
        data: { counter: counter - 1 }
      },
      dataCollectionId: 'counter',
    });
    
  }

  useEffect(() => {

    (async () => {
      // make sure the "counter" collection exists
      try {
        const id = await collections.createDataCollection({
          displayName: 'Counter',
          _id: 'counter',
        });
      }
      catch (error) {
      }

      // get the current value of the counter:
      const responseItems = await items.queryDataItems({ dataCollectionId: 'counter' }).find();
      if (responseItems.length > 0) {
        setCounter(responseItems.items[0].data?.counter);
      }
    })();
  }, []);

  return (
    <div>
      <EmptyState
        image={
          <Image fit="contain" height="100px" src={wixLogo} transparent />
        }
        title="Start editing this dashboard page"
        subtitle="Learn how to work with dashboard pages and how to add functionality to them using Wix APIs."
        theme="page"
      >
        <TextButton
          as="a"
          href="https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/supported-extensions/dashboard-extensions/dashboard-pages/add-dashboard-page-extensions-with-the-cli#add-dashboard-page-extensions-with-the-cli"
          target="_blank"
          prefixIcon={<Icons.ExternalLink />}
        >
          Dashboard pages documentation
        </TextButton>
      </EmptyState>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h3>Counter: {counter}</h3>
        <Button onClick={incrementCounter} style={{ marginRight: '10px' }}>
          Increment
        </Button>
        <Button onClick={decrementCounter}>
          Decrement
        </Button>
      </div>
    </div>
  );
};

const Index: FC = () => {
  return (
    <WixDesignSystemProvider>
      <ErrorBoundary>
        <Page>
          <Page.Header
            title="Dashboard Page"
            subtitle="Add management capabilities to your app."
            actionsBar={
              <Button
                onClick={() => {
                  dashboard.showToast({
                    message: 'Your first toast message!',
                  });
                }}
                prefixIcon={<Icons.GetStarted />}
              >
                Show a toast
              </Button>
            }
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