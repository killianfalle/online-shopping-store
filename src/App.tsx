import React from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Body from './components/body';

const App: React.FC = () => {
  const links = [
    { label: 'Link 1', url: '#' },
    { label: 'Link 2', url: '#' },
    { label: 'Link 3', url: '#' },
  ];

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar links={links} />
        <Body>
          <h1>Welcome to my app</h1>
          <p>This is the main content of my app.</p>
        </Body>
      </div>
    </div>
  );
};

export default App;