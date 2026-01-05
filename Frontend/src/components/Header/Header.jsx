// import React, { useContext } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { AuthContext } from '../../App'
// import styles from './Header.module.css'

// export default function Header() {
//   const { token, username, role, logout } = useContext(AuthContext)
//   const location = useLocation()
//   const { t, i18n } = useTranslation()
//   const theme = typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'light') : 'light'
//   const toggleTheme = () => {
//     const next = (document.documentElement.getAttribute('data-theme') || theme) === 'dark' ? 'light' : 'dark'
//     document.documentElement.setAttribute('data-theme', next)
//     localStorage.setItem('theme', next)
//   }
//   const notifPath = '/notifications'
//   return (
//     <header className={styles.header}>
//       <div className={styles.headerInner}>
//         <Link to="/" className={styles.logo}>EVANGADI</Link>
//         <nav className={styles.nav}>
//           <Link to="/">{t('header.home')}</Link>
//           <Link to="/about">{t('header.howItWorks')}</Link>
//           {token ? (
//             <button className={styles.btn} onClick={logout}>{t('header.logout')}</button>
//           ) : (
//             <Link to={location.pathname === '/signup' ? '/login' : '/signup'} className={styles.btn}>
//               {location.pathname === '/signup' ? t('header.signIn') : t('header.signUp')}
//             </Link>
//           )}
//           <select className={styles.lang} value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)}>
//             <option value="en">EN</option>
//             <option value="am">አማ</option>
//             <option value="gez">ግዕዝ</option>
//           </select>
//           <button className={styles.btn} onClick={toggleTheme}>Dark/Light</button>
//           {token && <Link to={notifPath} className={styles.btn}>Notifications</Link>}
//           {token && role === 'admin' && <Link to="/admin" className={styles.btn}>Admin</Link>}
//           {token && username && <Link to={`/profile/${username}`} className={styles.btn}>Profile</Link>}
//         </nav>
//         {username && <Link to={`/profile/${username}`} className={styles.welcome}>{t('header.welcome')}: {username}</Link>}
//       </div>
//     </header>
//   )
// }


// Import the React library and the useContext hook from React
// This allows us to use React components and access context values
import React, { useContext } from 'react'

// Import Link component for navigation and useLocation hook to get current URL path
// from React Router DOM library for handling routing in the application
import { Link, useLocation } from 'react-router-dom'

// Import translation hook from react-i18next library
// This provides functions for internationalization and language switching
import { useTranslation } from 'react-i18next'

// Import AuthContext from the App component file
// This context contains authentication information like user token, username, and role
import { AuthContext } from '../../App'

// Import CSS module for styling the Header component
// This uses CSS Modules to scope styles locally to this component
import styles from './Header.module.css'

// Define and export the Header component as the default export
// This is a functional React component that renders the website header
export default function Header() {
  
  // Use the useContext hook to access authentication context values
  // Destructure to get: token (authentication token), username (logged-in user's name),
  // role (user role like 'admin' or 'user'), and logout function to end user session
  const { token, username, role, logout } = useContext(AuthContext)
  
  // Use the useLocation hook to get information about the current URL path
  // This helps determine which page the user is currently viewing
  const location = useLocation()
  
  // Use the useTranslation hook to get translation functions
  // 't' is the translation function, 'i18n' is the instance for language management
  const { t, i18n } = useTranslation()
  
  // Check if window object exists (for server-side rendering compatibility)
  // Get theme preference from browser's localStorage, default to 'light' if not set
  // This ensures theme persistence across browser sessions
  const theme = typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'light') : 'light'
  
  // Define function to toggle between dark and light themes
  const toggleTheme = () => {
    // Check current theme from HTML element attribute or fallback to saved theme
    // Determine the opposite theme: if current is 'dark', next is 'light', and vice versa
    const next = (document.documentElement.getAttribute('data-theme') || theme) === 'dark' ? 'light' : 'dark'
    
    // Set the new theme on the root HTML element
    // This allows CSS to apply theme-specific styles throughout the application
    document.documentElement.setAttribute('data-theme', next)
    
    // Save the selected theme preference to browser's localStorage
    // This remembers the user's theme choice for future visits
    localStorage.setItem('theme', next)
  }
  
  // Define a constant for the notifications page path
  // This makes the path reusable and easier to maintain if changed later
  const notifPath = '/notifications'
  
  // Return the JSX that will be rendered as the header
  return (
    // Main header element with CSS module class for styling
    <header className={styles.header}>
      
      {/* Inner container div for layout and alignment of header content */}
      <div className={styles.headerInner}>
        
        {/* Logo link that navigates to the home page when clicked
            Uses CSS module class for logo-specific styling */}
        <Link to="/" className={styles.logo}>EVANGADI</Link>
        
        {/* Navigation container for all header links and buttons */}
        <nav className={styles.nav}>
          
          {/* Link to home page with translated text for 'home'
              Translation key 'header.home' is looked up in language files */}
          <Link to="/">{t('header.home')}</Link>
          
          {/* Link to about page with translated text for 'how it works' */}
          <Link to="/about">{t('header.howItWorks')}</Link>
          
          {/* Conditional rendering based on whether user has authentication token */}
          {token ? ( // If user is logged in (token exists)
            
            // Render logout button that calls logout function when clicked
            // Button shows translated text for 'logout'
            <button className={styles.btn} onClick={logout}>{t('header.logout')}</button>
            
          ) : ( // If user is not logged in (no token)
            
            // Render a link that toggles between login and signup pages
            // If current path is '/signup', link goes to '/login', otherwise to '/signup'
            <Link to={location.pathname === '/signup' ? '/login' : '/signup'} className={styles.btn}>
              
              {/* Conditional text: if on signup page, show 'sign in', otherwise show 'sign up'
                  Text is translated based on current language */}
              {location.pathname === '/signup' ? t('header.signIn') : t('header.signUp')}
              
            </Link>
          )}
          
          {/* Language selector dropdown menu
              Current language value is set as the select element's value
              onChange handler updates language when user selects different option */}
          <select className={styles.lang} value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)}>
            
            {/* Option for English language with display text 'EN' */}
            <option value="en">EN</option>
            
            {/* Option for Amharic language with display text in Amharic script */}
            <option value="am">አማ</option>
            
            {/* Option for Ge'ez language with display text in Ge'ez script */}
            <option value="gez">ግዕዝ</option>
            
          </select>
          
          {/* Button to toggle between dark and light themes
              Calls toggleTheme function when clicked, shows 'Dark/Light' text */}
          <button className={styles.btn} onClick={toggleTheme}>Dark/Light</button>
          
          {/* Conditional link to notifications page - only shows if user has authentication token */}
          {token && <Link to={notifPath} className={styles.btn}>Notifications</Link>}
          
          {/* Conditional link to admin page - only shows if user has token AND role is 'admin' */}
          {token && role === 'admin' && <Link to="/admin" className={styles.btn}>Admin</Link>}
          
          {/* Conditional link to user's profile page - only shows if user has token AND username exists
              Dynamically creates profile URL using the username */}
          {token && username && <Link to={`/profile/${username}`} className={styles.btn}>Profile</Link>}
          
        </nav>
        
        {/* Conditional welcome message - only shows if username exists
            Displays translated welcome text followed by username
            Also serves as a link to the user's profile page */}
        {username && <Link to={`/profile/${username}`} className={styles.welcome}>{t('header.welcome')}: {username}</Link>}
        
      </div>
    </header>
  )
}