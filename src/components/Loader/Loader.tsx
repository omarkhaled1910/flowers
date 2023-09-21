const Loader = ({ overlay }: any) => {
  return (
    <div className={overlay ? 'overlayLoader' : 'loaderContainer'}>
      <figure className='loader'>
        <div className='dot white'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
      </figure>
    </div>
  );
};

export default Loader;
