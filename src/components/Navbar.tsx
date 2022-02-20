import React, { ReactElement, useContext } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import { PAGE_NAMES } from '../utils/constants';
import logo from '../../images/euro.png';
import { TransactionContext } from '../context/TransactionContext';

type NavBarItemProps = {
  title: String;
  classnames?: String;
};

const NavBarItem = ({ title, classnames }: NavBarItemProps): ReactElement => (
  <li className={`mx-4 cursor-pointer ${classnames}`}>{title}</li>
);

const NavBarItems = PAGE_NAMES.map((item, index) => (
  <NavBarItem key={item + index + '_navbar'} title={item} />
));

const MobileNavBarItems = PAGE_NAMES.map((item, index) => (
  <NavBarItem
    key={item + index + '_navbar_mobile'}
    title={item}
    classnames="my-2 text-lg"
  />
));

const Navbar = (): ReactElement => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const { currentAccount, connectWallet, disconnectWallet } =
    useContext(TransactionContext);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center px-4 pt-4 pb-1">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {NavBarItems}
        <button
          type="button"
          onClick={currentAccount ? disconnectWallet : connectWallet}
          className="bg-blue-700 py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-blue-500"
        >
          <p className="text-white text-base font-semibold">
            {currentAccount ? 'Logout' : 'Login'}
          </p>
        </button>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <>
            <AiOutlineClose
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
            <ul
              className="z-10 fixed -top-0 -right-2 p-3 w-[50vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
            >
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={() => setToggleMenu(false)} />
              </li>
              {MobileNavBarItems}
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
