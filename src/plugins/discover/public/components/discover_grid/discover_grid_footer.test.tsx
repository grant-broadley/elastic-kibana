/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mountWithIntl } from '@kbn/test-jest-helpers';
import { findTestSubject } from '@elastic/eui/lib/test';
import { KibanaContextProvider } from '@kbn/kibana-react-plugin/public';
import { DiscoverGridFooter } from './discover_grid_footer';
import { discoverServiceMock } from '../../__mocks__/services';

describe('DiscoverGridFooter', function () {
  it('should not render anything when not on the last page', async () => {
    const component = mountWithIntl(
      <KibanaContextProvider services={discoverServiceMock}>
        <DiscoverGridFooter
          pageCount={5}
          pageIndex={0}
          sampleSize={500}
          totalHits={1000}
          rowCount={500}
        />
      </KibanaContextProvider>
    );
    expect(component.isEmptyRender()).toBe(true);
  });

  it('should not render anything yet when all rows shown', async () => {
    const component = mountWithIntl(
      <KibanaContextProvider services={discoverServiceMock}>
        <DiscoverGridFooter
          pageCount={5}
          pageIndex={4}
          sampleSize={500}
          totalHits={500}
          rowCount={500}
        />
      </KibanaContextProvider>
    );
    expect(component.isEmptyRender()).toBe(true);
  });

  it('should render a message for the last page', async () => {
    const component = mountWithIntl(
      <KibanaContextProvider services={discoverServiceMock}>
        <DiscoverGridFooter
          pageCount={5}
          pageIndex={4}
          sampleSize={500}
          totalHits={1000}
          rowCount={500}
        />
      </KibanaContextProvider>
    );
    expect(findTestSubject(component, 'discoverTableFooter').text()).toBe(
      'Search results are limited to 500 documents. Add more search terms to narrow your search.'
    );
    expect(findTestSubject(component, 'dscGridSampleSizeFetchMoreLink').exists()).toBe(false);
  });

  it('should render a message and the button for the last page', async () => {
    const mockLoadMore = jest.fn();

    const component = mountWithIntl(
      <KibanaContextProvider services={discoverServiceMock}>
        <DiscoverGridFooter
          pageCount={5}
          pageIndex={4}
          sampleSize={500}
          totalHits={1000}
          rowCount={500}
          isLoadingMore={false}
          onFetchMoreRecords={mockLoadMore}
        />
      </KibanaContextProvider>
    );
    expect(findTestSubject(component, 'discoverTableFooter').text()).toBe(
      'Search results are limited to 500 documents.Load more'
    );

    const button = findTestSubject(component, 'dscGridSampleSizeFetchMoreLink');
    expect(button.exists()).toBe(true);

    button.simulate('click');

    expect(mockLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should render a disabled button when loading more', async () => {
    const mockLoadMore = jest.fn();

    const component = mountWithIntl(
      <KibanaContextProvider services={discoverServiceMock}>
        <DiscoverGridFooter
          pageCount={5}
          pageIndex={4}
          sampleSize={500}
          totalHits={1000}
          rowCount={500}
          isLoadingMore={true}
          onFetchMoreRecords={mockLoadMore}
        />
      </KibanaContextProvider>
    );
    expect(findTestSubject(component, 'discoverTableFooter').text()).toBe(
      'Search results are limited to 500 documents.Load more'
    );

    const button = findTestSubject(component, 'dscGridSampleSizeFetchMoreLink');
    expect(button.exists()).toBe(true);
    expect(button.prop('disabled')).toBe(true);

    button.simulate('click');

    expect(mockLoadMore).not.toHaveBeenCalled();
  });

  it('should render a message when max total limit is reached', async () => {
    const component = mountWithIntl(
      <KibanaContextProvider services={discoverServiceMock}>
        <DiscoverGridFooter
          pageCount={100}
          pageIndex={99}
          sampleSize={500}
          totalHits={11000}
          rowCount={10000}
        />
      </KibanaContextProvider>
    );
    expect(findTestSubject(component, 'discoverTableFooter').text()).toBe(
      'Search results are limited to 10000 documents. Add more search terms to narrow your search.'
    );
  });
});
