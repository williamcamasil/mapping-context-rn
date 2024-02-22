import React from 'react';
import { Button, Text, View } from 'react-native';

import {
  render, fireEvent, waitFor, waitForElementToBeRemoved, act,
} from '@testing-library/react-native';

import usePagination, { PaginationPropsType, PaginationRequestArgsType } from './usePagination';

const requestMock = jest.fn();

type Item = {
  item: string;
};

const defaultRequestDataSource = async (params: PaginationRequestArgsType<Item, unknown>) => {
  await requestMock(params);
  return {
    ok: true,
    canLoadMore: true,
    dataSource: [{ item: 'item 3' }, { item: 'item 4' }],
  };
};

const defaultInitialDataSource = [{ item: 'item 1' }, { item: 'item 2' }];

const FakeScreen: React.FC<PaginationPropsType<Item>> = ({
  requestDataSource,
  initialDataSource,
  initialPage,
}) => {
  const {
    dataSource,
    loadingMore,
    canLoadMore,
    refreshing,
    doRefresh,
    doLoadMore,
    clearDataSource,
  } = usePagination({
    initialPage,
    initialDataSource,
    requestDataSource,
  });

  const canLoadMoreLabel = `Can load more: ${canLoadMore}`;
  const hasDataSourceLabel = `Has data source: ${Boolean(dataSource.length)}`;
  return (
    <>
      {loadingMore ? <View testID="loading-more" /> : null}
      {refreshing ? <View testID="refreshing" /> : null}
      {dataSource.map(item => (
        <Text key={item.item}>{item.item}</Text>
      ))}
      <Text>{canLoadMoreLabel}</Text>
      <Text>{hasDataSourceLabel}</Text>
      <Button title="doRefresh" onPress={() => doRefresh({ search: 'new param' })} />
      <Button title="doLoadMore" onPress={doLoadMore} />
      <Button title="clearDataSource" onPress={clearDataSource} />
    </>
  );
};

const renderScreen = (
  initialPage?: number,
  initialDataSource?: Item[],
  requestDataSource = defaultRequestDataSource,
) => render(
  <FakeScreen
    requestDataSource={requestDataSource}
    initialDataSource={initialDataSource}
    initialPage={initialPage}
  />,
);

beforeEach(() => {
  requestMock.mockClear();
});

describe('useKeyboard', () => {
  it('Should show the initial data', async () => {
    const screen = renderScreen(undefined, defaultInitialDataSource);
    await screen.findByText('item 1');
    await screen.findByText('item 2');
    screen.unmount();
  });
  it('Should call requestMock with new params', async () => {
    const screen = renderScreen();
    const button = screen.getByText('doRefresh');

    fireEvent.press(button);

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      dataSource: [],
      page: 1,
      tryAgain: expect.any(Function),
      parameters: {
        search: 'new param',
      },
    });
    screen.unmount();
  });
  it('Should call requestMock with the first page to reload items, even when there is a initial page', async () => {
    const screen = renderScreen(3);
    const button = screen.getByText('doRefresh');

    fireEvent.press(button);

    expect(requestMock).toHaveBeenCalledWith({
      dataSource: [],
      page: 1,
      tryAgain: expect.any(Function),
      parameters: {
        search: 'new param',
      },
    });
    screen.unmount();
  });
  it('Should not call handleLoadMore, the first page is being requested', async () => {
    const screen = renderScreen();
    const button = screen.getByText('doLoadMore');

    fireEvent.press(button);

    expect(requestMock).not.toHaveBeenCalled();
    screen.unmount();
  });
  it('Should load more data, requesting page 2', async () => {
    const screen = renderScreen();
    const refreshButton = screen.getByText('doRefresh');

    fireEvent.press(refreshButton);

    expect(requestMock).toHaveBeenCalled();

    await screen.findByText('item 3');

    const loadMoreButton = screen.getByText('doLoadMore');

    fireEvent.press(loadMoreButton);

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-more'));

    await waitFor(() => expect(requestMock).toHaveBeenCalledWith({
      dataSource: [{ item: 'item 3' }, { item: 'item 4' }],
      page: 2,
      tryAgain: expect.any(Function),
      parameters: {
        search: 'new param',
      },
    }));
    screen.unmount();
  });
  it('Should clear data source', async () => {
    const screen = renderScreen(undefined, defaultInitialDataSource);
    await screen.findByText('item 1');
    const button = screen.getByText('clearDataSource');

    fireEvent.press(button);

    expect(screen.queryByText('item 1')).toBeNull();
    screen.unmount();
  });
  it('Should call requestMock again when clicking on tryAgain', async () => {
    let triedAgain = false;
    const tryAgainRequest = async (params: PaginationRequestArgsType<Item, unknown>) => {
      await requestMock(params);
      if (!triedAgain) {
        act(() => {
          params.tryAgain();
        });
        triedAgain = true;
      }
      return {
        ok: true,
        canLoadMore: true,
        dataSource: [{ item: 'item 3' }, { item: 'item 4' }],
      };
    };
    const screen = renderScreen(undefined, undefined, tryAgainRequest);
    const button = screen.getByText('doRefresh');

    fireEvent.press(button);

    await waitForElementToBeRemoved(() => screen.queryByTestId('refreshing'));

    expect(requestMock).toHaveBeenCalledTimes(2);
    screen.unmount();
  });
  it('Should have a request with error', async () => {
    const dataRequest = async (params: PaginationRequestArgsType<Item, unknown>) => {
      await requestMock(params);
      return {
        ok: false,
        canLoadMore: false,
        dataSource: [{ item: 'item 5' }],
      };
    };
    const screen = renderScreen(undefined, undefined, dataRequest);
    const button = screen.getByText('doRefresh');

    fireEvent.press(button);

    await waitForElementToBeRemoved(() => screen.queryByTestId('refreshing'));

    expect(screen.queryByText('item 5')).toBeNull();
    screen.unmount();
  });
  it('Should not set state when screen is unmounted', async () => {
    const screen = renderScreen();
    const button = screen.getByText('doRefresh');

    fireEvent.press(button);
    screen.unmount();
  });
  it('Should use default values when properties are null', async () => {
    const dataRequest = async (params: PaginationRequestArgsType<Item, unknown>): Promise<any> => {
      await requestMock(params);
      return {
        ok: true,
        canLoadMore: null,
        dataSource: null,
      };
    };
    const screen = renderScreen(undefined, undefined, dataRequest);
    const button = screen.getByText('doRefresh');

    fireEvent.press(button);

    await waitForElementToBeRemoved(() => screen.queryByTestId('refreshing'));

    await screen.findByText('Can load more: false');
    screen.getByText('Has data source: false');
    screen.unmount();
  });
});
