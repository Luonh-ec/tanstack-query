import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, Text} from 'react-native';
import ProductCart from '../../components/productCart';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import axios from 'axios';

function Home() {
  const fetchPage = async ({pageParam}: {pageParam: number}) => {
    const apiUrl =
      'https://apistg.droppii.com/search-service/v1/app/customer/product/search';
    const requestData = {
      PageNumber: pageParam,
      PageSize: 10,
      SearchTerm: '',
      CategoryIds: [],
      BrandIds: [],
      WarehouseIds: [],
      ProductTab: 1,
      ProductIds: [],
      SortField: 'userOrdered',
    };

    const response = await axios.post(apiUrl, requestData, {
      headers: {
        os: 'ios-17.2',
        Accept: 'application/json, text/plain, */*',
        deviceid: 'F72CA7E4-D023-49FA-B043-50C65BD20936',
        'app-version': '1.0.65.1708936853',
        'full-version': '1.0.65',
        'Content-Type': 'application/json',
      },
    });

    if (!response.data) {
      throw new Error(`No data returned from the server`);
    }

    return response.data.data;
  };

  // const {data, isLoading} = useQuery({
  //   queryKey: ['products'],
  //   queryFn: fetchData,
  // });

  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['Products'],
    queryFn: fetchPage,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  const renderItem = useCallback(
    ({item}) => <ProductCart product={item} />,
    [],
  );

  const dataArr = data?.pages
    ?.map(page => page)
    .reduce((acc, page) => [...acc, ...page], []);

  // const dataArr2 = data?.pages?.map(page => )

  return (
    <View>
      <FlatList
        numColumns={2}
        initialNumToRender={1}
        data={dataArr}
        renderItem={renderItem}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

export default Home;
