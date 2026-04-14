import './App.css';
import { useEffect, useRef, useState } from 'react';
import Sidebar from './Components/Sidebaar';
import { crearMenuData } from './Data/menuData';

function App() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [currentLink, setCurrentLink] = useState<string>('/');
  const [currentTitle, setCurrentTitle] = useState<string>('Inicio');
  const menuRoot = crearMenuData();

  const toggleSidebar = (): void => {
    const sidebar = sidebarRef.current;
    
    if (sidebar) {
      if (isOpen) {
        sidebar.classList.add('closed');
        document.body.style.marginLeft = "0";
        setIsOpen(false);
      } else {
        sidebar.classList.remove('closed');
        document.body.style.marginLeft = "250px";
        setIsOpen(true);
      }
    }
  };

  const handleMenuClick = (link: string, title: string) => {
    setCurrentLink(link);
    setCurrentTitle(title);
  };

  useEffect(() => {
    if (sidebarRef.current) {
      document.body.style.marginLeft = "250px";
      setIsOpen(true);
    }
  }, []);

  return (
    <>
      <div style={{ marginLeft: isOpen ? '270px' : '20px', transition: 'margin-left 0.3s ease' }}>
        <h2>Challenge9 - SideMenu con Árbol N-ario</h2>
      </div>
      <div className='sideBar'>
        <button onClick={toggleSidebar}>☰</button>
        <div className="menuDesplegado" ref={sidebarRef}>
          <Sidebar rootNode={menuRoot} onMenuClick={handleMenuClick} />
        </div>
      </div>
      <div style={{ 
        marginLeft: isOpen ? '270px' : '20px', 
        padding: '20px',
        transition: 'margin-left 0.3s ease',
        marginTop: '20px'
      }}>
        <p style={{
          fontSize: '18px',
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          borderLeft: '4px solid #2c3e50'
        }}>
          <strong>Ubicación actual:</strong> {currentLink}
        </p>
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>{currentTitle}</h2>
          <p>Estás en: <code>{currentLink}</code></p>
        </div>
      </div>
    </>
  );
}

export default App;