import { ReactElement } from 'react';

import { PAGE_NAMES } from '../utils/constants';
import logo from '../../images/euro.png';

const Footer = (): ReactElement => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center">
      <div className="flex flex-[0.5] justify-center items-center">
        <img src={logo} alt="logo" className="w-32" />
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        {PAGE_NAMES.map((pageName) => (
          <p
            key={`${pageName}_footer_link`}
            className="text-white text-base text-center mx-2 cursor-pointer"
          >
            {pageName}
          </p>
        ))}
      </div>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-3 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">@jamtay</p>
      <p className="text-white text-right text-xs">Crypto testing website</p>
    </div>
  </div>
);

export default Footer;
