import { CssBaseline } from '@mui/material';
import { BrandProvider } from './components';
import Example2 from './views/Example2';

function App() {
  return (
    <BrandProvider>
      <CssBaseline />
      <Example2 />
    </BrandProvider>
  );
}

export default App;
