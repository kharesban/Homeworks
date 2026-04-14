
import Node from '../Class/Node';
import type { MenuOpcion } from '../Components/menuOpciones';

export const crearMenuData = (): Node<MenuOpcion> => {
    const root = new Node<MenuOpcion>({ nombre: 'root', link: '#' });

    const profile = new Node<MenuOpcion>({ nombre: 'Profile', link: '/profile' });
    

    const messages = new Node<MenuOpcion>({ nombre: 'Messages', link: '/messages' });
    
    const settings = new Node<MenuOpcion>({ nombre: 'Settings', link: '/settings' });
    const account = new Node<MenuOpcion>({ nombre: 'Account', link: '/settings/account' });
    const profileSetting = new Node<MenuOpcion>({ nombre: 'Profile', link: '/settings/profile' });
    const security = new Node<MenuOpcion>({ nombre: 'Security & Privacy', link: '/settings/security' });
    const password = new Node<MenuOpcion>({ nombre: 'Password', link: '/settings/password' });
    const notification = new Node<MenuOpcion>({ nombre: 'Notification', link: '/settings/notification' });
    
    const help = new Node<MenuOpcion>({ nombre: 'Help', link: '/help' });
    const faqs = new Node<MenuOpcion>({ nombre: "FAQ's", link: '/help/faqs' });
    const ticket = new Node<MenuOpcion>({ nombre: 'Submit a Ticket', link: '/help/ticket' });
    const network = new Node<MenuOpcion>({ nombre: 'Network Status', link: '/help/network' });
    
    const logout = new Node<MenuOpcion>({ nombre: 'Logout', link: '/logout' });
    

    settings.agregarHijo(account);
    settings.agregarHijo(profileSetting);
    settings.agregarHijo(security);
    settings.agregarHijo(password);
    settings.agregarHijo(notification);
    
    help.agregarHijo(faqs);
    help.agregarHijo(ticket);
    help.agregarHijo(network);
    
    root.agregarHijo(profile);
    root.agregarHijo(messages);
    root.agregarHijo(settings);
    root.agregarHijo(help);
    root.agregarHijo(logout);
    
    return root;
};