import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';

export default function Register() {
  return (
    <div className='container flex h-[80vh] items-center justify-center'>
      <Card className='w-96'>
        <CardHeader
          variant='gradient'
          color='gray'
          className='mb-4 grid h-28 place-items-center'
        >
          <Typography variant='h3' color='white'>
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className='flex flex-col gap-4'>
          <Input label='Name' size='lg' />
          <Input label='Number' size='lg' />
          <div className='-ml-2.5'>
            <Checkbox label='Remember Me' />
          </div>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button variant='gradient' fullWidth>
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
