import { ReactElement } from 'react';
import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

type ServiceCardProps = {
  color: string;
  title: string;
  icon: ReactElement;
  subtitle: string;
};

const ServiceCard = ({
  color,
  title,
  icon,
  subtitle,
}: ServiceCardProps): ReactElement => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl hover:animate-pulse">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-96">{subtitle}</p>
    </div>
  </div>
);

const Services = (): ReactElement => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-2xl sm:text-5xl py-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 ">
          Solidity, tailwindCSS,
          <br />
          and React
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          Connect your wallet, send ethereum with GIFs, and view market
          information
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Security"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Secure transactions using Ethereum and Metamask"
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Send GIFs"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="Attach a GIF keyword and see it displayed below in your latest transactions"
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Market information"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="View market information -> Coming soon..."
        />
      </div>
    </div>
  </div>
);

export default Services;
