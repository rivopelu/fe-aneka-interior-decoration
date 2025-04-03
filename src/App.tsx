import { Toaster } from 'react-hot-toast';
import RouteBuilder from './routes/route-builder.tsx';

function App() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <RouteBuilder />
    </>
  );
}

export default App;
