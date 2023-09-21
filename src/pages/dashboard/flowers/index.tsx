/* eslint-disable react-hooks/exhaustive-deps */
import {
  deleteFlower,
  getAllFlowers,
  getFlowersCount,
} from '@/Requests/flowers';
import Table from '@/components/Table';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const limit = 10;
const getLastVisible = (items: []): { name: string } => {
  const numberOfPages = items.length;
  let lastVisible;
  items.map((item: any) => {
    if (item.page === numberOfPages) {
      lastVisible = item?.rows?.[item?.rows?.length - 1];
    }
  });
  return lastVisible || { name: '' };
};
const AllFlowers = ({ flowers, numberOfPages }: any) => {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([{ page: 1, rows: flowers }]);
  const { push } = useRouter();
  useEffect(() => {
    if (pageData.find((item) => item.page === page)) return;
    getAllFlowers(limit, getLastVisible(pageData as any)?.name).then((items) =>
      setPageData([...pageData, { page: page, rows: items }])
    );
  }, [page]);
  const handleDeleteFlower = async (id: string) => {
    await deleteFlower(id);
    const currentPage = pageData.find((data) => data.page === page);
    const newCurrentPageData = {
      ...currentPage,
      rows: currentPage?.rows.filter((row: any) => row.id !== id),
    };
    const newPageData: {
      rows: any;
      page?: number;
    }[] = [
      ...pageData.filter((row: any) => row.page !== page),
      newCurrentPageData,
    ];
    setPageData(
      newPageData as {
        rows: any;
        page: number;
      }[]
    );
    if (!newCurrentPageData.rows.length && page !== 1) {
      setPage((old) => --old);
    }
  };

  return (
    <div className=''>
      <h2 className=' text-center'>ALL FLOWERS</h2>
      <Table
        handlePageChange={(index: number) => setPage(index)}
        page={page}
        rows={pageData.find((item) => item.page === page)?.rows}
        totalPages={numberOfPages}
        handleEdit={(id: string) => `/dashboard/${id}`}
        rowClick={(id: string) => push(`/flower/${id}`)}
        handleDelete={handleDeleteFlower}
      />
    </div>
  );
};

export default AllFlowers;

export const getServerSideProps: GetServerSideProps = async (req) => {
  try {
    const data = await getAllFlowers(limit);

    const numberOfPages = await getFlowersCount();

    return {
      props: {
        flowers: data,
        numberOfPages: Math.ceil(numberOfPages / limit),
      },
    };
  } catch (error) {
    return {
      props: {
        flower: null,
      },
    };
  }
};
