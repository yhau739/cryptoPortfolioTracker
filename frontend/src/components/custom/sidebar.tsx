// export to smaller components later in the stage

// export default function Sidebar() {
//     return (
//                 <nav className="flex-1 p-4">
//                     {[
//                         { id: 'dashboard', icon: faChartLine, label: 'Dashboard' },
//                         { id: 'portfolio', icon: faWallet, label: 'Portfolio' },
//                         { id: 'transactions', icon: faExchangeAlt, label: 'Transactions' },
//                         { id: 'analytics', icon: faChartPie, label: 'Analytics' },
//                         { id: 'settings', icon: faCog, label: 'Settings' }
//                     ].map(item => (
//                         <div
//                             key={item.id}
//                             className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer whitespace-nowrap
//                             ${activeNav === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
//                             `}
//                             onClick={() => setActiveNav(item.id)}
//                         >
//                             <FontAwesomeIcon icon={item.icon} className="text-lg" />
//                             {isMenuOpen && <span className="ml-3">{item.label}</span>}
//                         </div>
//                     ))}
//                 </nav>
//     );
// }