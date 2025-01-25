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
  const [counter, setCounter] = useState(0);

  const incrementCounter = async () => {
    setCounter(counter + 1);
    const counterItems = await items.queryDataItems({ dataCollectionId: 'counter' }).find();
    const counterItem = counterItems.items[0];
    
    await items.saveDataItem({
      dataItem: {
        _id: counterItem?._id,
        data: { counter: counter + 1 }
      },
      dataCollectionId: 'counter',
    });
  };

  const decrementCounter = async () => {
    setCounter(counter - 1);
    const counterItems = await items.queryDataItems({ dataCollectionId: 'counter' }).find();
    const counterItem = counterItems.items[0];

    await items.saveDataItem({
      dataItem: {
        _id: counterItem?._id,
        data: { counter: counter - 1 }
      },
      dataCollectionId: 'counter',
    });
  };

  useEffect(() => {
    (async () => {
      try {
        await collections.createDataCollection({
          displayName: 'Counter',
          _id: 'counter',
        });
      } catch (error) {}

      const responseItems = await items.queryDataItems({ dataCollectionId: 'counter' }).find();
      if (responseItems.length > 0) {
        setCounter(responseItems.items[0].data?.counter);
      }
    })();
  }, []);

  return (
    <div className="page-body">
      <div className="counter-card">
        <h3 className="counter-title">Counter: {counter}</h3>
        <div className="button-group">
          <button 
            className="counterIncrement"
            onClick={incrementCounter}>
            Increment
          </button>
          <button 
            className="counterDecrement"
            onClick={decrementCounter}>
            Decrement
          </button>
        </div>
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
            title="Counter Management Dashboard"
            subtitle="Track and manage your counter values efficiently."
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