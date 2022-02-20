import { ReactElement } from 'react';

const Loader = (): ReactElement => {
  return (
    <>
      <div className="flex justify-center items-center py-3">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-200" />
      </div>
      <p className="text-pink-100 animate-pulse ml-2">Sending...</p>
    </>
  );
};

export default Loader;
