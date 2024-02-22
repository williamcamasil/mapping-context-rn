import { useCallback, useMemo, useState } from 'react';

import useIsMountedRef from './useIsMountedRef';

const INITIAL_PAGE = 1;

export type PaginationPropsType<Item, Parameters = unknown> = {
  initialPage?: number;
  initialDataSource?: Item[];
  requestDataSource: (
    requestArgs: PaginationRequestArgsType<Item, Parameters>
  ) => Promise<PaginationResponseType<Item>>;
};

export type PaginationRequestArgsType<Item, Parameters = unknown> = {
  page: number;
  dataSource: Item[];
  parameters?: Parameters;
  tryAgain: () => Promise<void>;
};

export type PaginationResponseType<Item> = {
  ok: boolean;
  canLoadMore?: boolean;
  dataSource?: Item[];
};

function hasMorePagesToGet(
  canLoadMore: boolean,
  loadingMore: boolean,
  requestingFirstPage: boolean,
  dataSourceLength: number,
): boolean {
  return canLoadMore && !loadingMore && !requestingFirstPage && Boolean(dataSourceLength);
}

type UsePaginationStateType<Item, Parameters> = {
  dataSource: Item[];
  currentPage: number;
  loadingMore: boolean;
  canLoadMore: boolean;
  refreshing: boolean;
  parameters?: Parameters;
};

export type UsePaginationReturnType<Item, Parameters> = {
  dataSource: Item[];
  loadingMore: boolean;
  canLoadMore: boolean;
  refreshing: boolean;
  currentPage: number;
  doRefresh: (params?: Parameters) => void;
  doLoadMore: () => void;
  clearDataSource: () => void;
};

function usePagination<Item, Parameters = unknown>({
  initialPage = INITIAL_PAGE,
  initialDataSource = [],
  requestDataSource,
}: PaginationPropsType<Item, Parameters>): UsePaginationReturnType<Item, Parameters> {
  const [genericState, setGenericState] = useState<UsePaginationStateType<Item, Parameters>>({
    dataSource: initialDataSource,
    currentPage: initialPage,
    loadingMore: false,
    canLoadMore: false,
    refreshing: false,
    parameters: undefined,
  });

  const isMountedRef = useIsMountedRef();

  const handleClearDataSource = useCallback(() => {
    setGenericState(s => ({
      ...s,
      dataSource: [],
    }));
  }, []);

  const handleRequestPage = useCallback(async (
    page: number,
    canLoadMore: boolean,
    loadingMore: boolean,
    refreshing: boolean,
    dataSource: Item[],
    params?: Parameters,
  ) => {
    const isFirstPage = page === INITIAL_PAGE;

    const hasMorePages = hasMorePagesToGet(
      canLoadMore,
      loadingMore,
      refreshing,
      dataSource.length,
    );

    if (!isFirstPage && !hasMorePages) return;

    if (isFirstPage) {
      setGenericState(s => ({
        ...s,
        refreshing: true,
        canLoadMore: false,
      }));
    } else {
      setGenericState(s => ({
        ...s,
        loadingMore: true,
      }));
    }

    try {
      const result = await requestDataSource({
        page,
        dataSource,
        parameters: params,
        tryAgain: () => handleRequestPage(
          page,
          canLoadMore,
          loadingMore,
          refreshing,
          dataSource,
          params,
        ),
      });

      if (!isMountedRef.current) {
        return;
      }

      if (result.ok) {
        setGenericState(s => ({
          ...s,
          currentPage: page,
          canLoadMore: result.canLoadMore ?? false,
          dataSource: result.dataSource ?? [],
          parameters: params,
        }));
      }
    } finally {
      if (isMountedRef.current) {
        setGenericState(s => ({
          ...s,
          refreshing: false,
          loadingMore: false,
        }));
      }
    }
  }, [isMountedRef, requestDataSource]);

  const {
    dataSource, currentPage, loadingMore, canLoadMore, refreshing, parameters,
  } = genericState;

  const handleRefresh = useCallback(
    (params?: Parameters) => handleRequestPage(
      INITIAL_PAGE,
      canLoadMore,
      loadingMore,
      refreshing,
      [],
      params,
    ),
    [canLoadMore, handleRequestPage, loadingMore, refreshing],
  );

  const handleLoadMore = useCallback(
    async () => handleRequestPage(
      currentPage + 1,
      canLoadMore,
      loadingMore,
      refreshing,
      dataSource,
      parameters,
    ),
    [handleRequestPage, currentPage, canLoadMore, loadingMore, refreshing, dataSource, parameters],
  );

  return useMemo(() => ({
    dataSource,
    loadingMore,
    canLoadMore,
    refreshing,
    currentPage,
    doRefresh: handleRefresh,
    doLoadMore: handleLoadMore,
    clearDataSource: handleClearDataSource,
  }), [
    canLoadMore,
    currentPage,
    dataSource,
    handleClearDataSource,
    handleLoadMore,
    handleRefresh,
    loadingMore,
    refreshing,
  ]);
}

export default usePagination;
