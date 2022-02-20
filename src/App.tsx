import { ReactElement } from 'react';
import {
  Footer,
  Navbar,
  Services,
  Transactions,
  SendTransaction,
} from './components';

const App = (): ReactElement => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <SendTransaction />
    </div>
    <Services />
    <Transactions />
    <Footer />
  </div>
);

export default App;
