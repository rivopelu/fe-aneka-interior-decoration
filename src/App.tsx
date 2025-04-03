import { Toaster } from 'react-hot-toast';
import RouteBuilder from './routes/route-builder.tsx';

function App() {
  return (
    <main className='bg-base-background'>
      <Toaster position="bottom-center" reverseOrder={false} />
      <RouteBuilder />
    </main>
  );
}

export default App;
