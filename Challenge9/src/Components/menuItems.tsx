
import { useState } from 'react';
import Node from '../Class/Node';
import type { MenuOpcion } from './menuOpciones';

interface MenuItemProps {
    node: Node<MenuOpcion>;
    nivel?: number;
    onMenuClick: (link: string, title: string) => void;
}

const MenuItem = ({ node, nivel = 0, onMenuClick }: MenuItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const tieneHijos = node.hijos.length > 0;
    const menuItem = node.valor;

    const paddingStyle = {
        paddingLeft: `${25 + nivel * 20}px`
    };
    const handleClick = (e: React.MouseEvent) => {
        if (!tieneHijos) {
            e.preventDefault();
            onMenuClick(menuItem.link, menuItem.nombre);
        } else {
            setIsOpen(!isOpen);
        }
    };

        return (
        <div>
            <div 
                onClick={handleClick}
                style={{
                    display: 'block',
                    padding: '12px 15px',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'background 0.3s',
                    cursor: 'pointer',
                    backgroundColor: isOpen ? '#34495e' : 'transparent',
                    ...paddingStyle
                }}
                onMouseEnter={(e) => {
                    if (!isOpen) {
                        e.currentTarget.style.backgroundColor = '#34495e';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isOpen) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }
                }}
            >
                {tieneHijos && (
                    <span style={{ 
                        marginRight: '10px', 
                        display: 'inline-block',
                        fontSize: '12px'
                    }}>
                        {isOpen ? '▼' : '►'}
                    </span>
                )}
                <span style={{ color: 'white' }}>
                    {menuItem.nombre}
                </span>
            </div>
            {isOpen && tieneHijos && (
                <div>
                    {node.hijos.map((hijo, index) => (
                        <MenuItem 
                            key={index} 
                            node={hijo} 
                            nivel={nivel + 1} 
                            onMenuClick={onMenuClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuItem;