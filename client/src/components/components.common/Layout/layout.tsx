// import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
// import './global.css';
// import Container from '@mui/material/Container';
// import { EffectorNext } from '@effector/next';
// import { NavBar } from '../Navbar';

// export default function RootLayout({
//     children,
// }: {
//     children: React.ReactNode
// }) {
//     return (
//         <html lang="en">
//             <body>
//                 <EffectorNext>
//                     <AppRouterCacheProvider options={{ enableCssLayer: true }}>
//                         <NavBar />
//                         <Container maxWidth="lg">
//                             {children}
//                         </Container>
//                     </AppRouterCacheProvider>
//                 </EffectorNext>
//             </body>
//         </html>
//     )
// }

// const Layout = ({ children }: {children: React.ReactNode}) => {
//     return (
//       <>
//         <Head>
//           {/* Add any necessary meta tags or title here */}
//         </Head>
//         <div className="layout">
//           {children}
//         </div>
//       </>
//     );
//   };
  
//   export default Layout;