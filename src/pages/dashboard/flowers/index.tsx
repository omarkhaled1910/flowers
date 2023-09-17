import {
  deleteFlower,
  getAllFlowers,
  getFlowersCount,
} from '@/Requests/flowers';
import Table from '@/components/Table';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';

const limit = 10;
const getLastVisible = (items: []) => {
  const numberOfPages = items.length;
  let lastVisible;
  items.map((item) => {
    if (item.page === numberOfPages) {
      lastVisible = item?.rows?.[item?.rows?.length - 1];
    }
  });
  return lastVisible;
};
const AllFlowers = ({ flowers, numberOfPages }: any) => {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([{ page: 1, rows: flowers }]);

  useEffect(() => {
    if (pageData.find((item) => item.page === page)) return;
    getAllFlowers(limit, getLastVisible(pageData)?.name).then((items) =>
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
    setPageData((old: { rows: unknown; page: number }) => [
      ...old.filter((row: unknown) => row.page !== page),
      newCurrentPageData,
    ]);
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
    console.log(data, numberOfPages);
    return {
      props: {
        flowers: data,
        numberOfPages: Math.ceil(numberOfPages / limit),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        flower: null,
      },
    };
  }
};
