
import Node from '../Class/Node';
import type { MenuOpcion } from './menuOpciones';
import MenuItem from './menuItems';



interface SidebarProps {
    rootNode: Node<MenuOpcion>;
    onMenuClick: (link: string, title: string) => void;
}

const Sidebar = ({ rootNode, onMenuClick }: SidebarProps) => {
    return (
        <div className="sidebar-content">
            {rootNode.hijos.map((hijo, index) => (
                <MenuItem key={index} node={hijo} onMenuClick={onMenuClick} />
            ))}
        </div>
    );
};

export default Sidebar;