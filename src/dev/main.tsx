import React from 'react';
import ReactDOM from 'react-dom/client';
import NewDevShowcase from '@/dev/NewDevShowcase';
import '@/dev/dev.css';

const App: React.FC = () => {
  return (
    <div>
      <NewDevShowcase />
    </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
