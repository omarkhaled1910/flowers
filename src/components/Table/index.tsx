import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import Link from 'next/link';

const TABS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Monitored',
    value: 'monitored',
  },
  {
    label: 'Unmonitored',
    value: 'unmonitored',
  },
];

const TABLE_HEAD = ['Name', 'Status', 'price', 'Width', 'height', 'actions'];

const TABLE_ROWS = [
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'John Michael',
    email: 'john@creative-tim.com',
    job: 'Manager',
    org: 'Organization',
    online: true,
    date: '23/04/18',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg',
    name: 'Alexa Liras',
    email: 'alexa@creative-tim.com',
    job: 'Programator',
    org: 'Developer',
    online: false,
    date: '23/04/18',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg',
    name: 'Laurent Perrier',
    email: 'laurent@creative-tim.com',
    job: 'Executive',
    org: 'Projects',
    online: false,
    date: '19/09/17',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg',
    name: 'Michael Levi',
    email: 'michael@creative-tim.com',
    job: 'Programator',
    org: 'Developer',
    online: true,
    date: '24/12/08',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    email: 'richard@creative-tim.com',
    job: 'Manager',
    org: 'Executive',
    online: false,
    date: '04/10/21',
  },
];

export default function Table({
  handlePageChange,
  page,
  totalPages,
  rows = [],
  handleEdit,
  handleDelete,
  rowClick,
}: any) {
  return (
    <Card className='h-full w-full'>
      {/* <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-8 flex items-center justify-between gap-8'>
          <div>
            <Typography variant='h5' color='blue-gray'>
              Members list
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
              See information about all members
            </Typography>
          </div>
          <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
            <Button variant='outlined' size='sm'>
              view all
            </Button>
            <Button className='flex items-center gap-3' size='sm'>
              <UserPlusIcon strokeWidth={2} className='h-4 w-4' /> Add member
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <Tabs value='all' className='w-full md:w-max'>
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className='w-full md:w-72'>
            <Input
              label='Search'
              icon={<MagnifyingGlassIcon className='h-5 w-5' />}
            />
          </div>
        </div>
      </CardHeader> */}
      <CardBody className='overflow-scroll px-0'>
        <table className='mt-4 w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
                >
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal leading-none opacity-70'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(rows) &&
              rows?.map(
                (
                  { images, name, id, width, height, inStock, price },
                  index
                ) => {
                  const isLast = index === rows.length - 1;
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50';

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div
                          onClick={() => rowClick?.(id)}
                          className='flex items-center gap-3'
                          style={{ cursor: rowClick && 'pointer' }}
                        >
                          <Avatar
                            src={images?.[0] || ''}
                            alt={name}
                            size='sm'
                          />
                          <div className='flex flex-col'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal'
                            >
                              {name}
                            </Typography>
                            {/* <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal opacity-70'
                          ></Typography> */}
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className='w-max'>
                          <Chip
                            variant='ghost'
                            size='sm'
                            value={inStock ? 'in Stock' : 'out Stock'}
                            color={inStock ? 'green' : 'blue-gray'}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className='flex flex-col'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {price} $
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className='flex flex-col'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {height} cm
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {width} cm
                        </Typography>
                      </td>
                      <td className={`flex ${classes}`}>
                        <Tooltip content='Edit Flower'>
                          <Link href={handleEdit(id)}>
                            <IconButton className='flex gap-3' variant='text'>
                              <PencilIcon className='h-4 w-4' />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip content='Delete Flower'>
                          <IconButton
                            onClick={() => handleDelete(id)}
                            className='flex gap-3'
                            variant='text'
                          >
                            <TrashIcon className='h-4 w-4' />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          Page {page} of {totalPages || 1}
        </Typography>
        <div className='flex gap-2'>
          <Button
            onClick={() => handlePageChange(--page)}
            variant='outlined'
            size='sm'
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange(++page)}
            variant='outlined'
            size='sm'
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
