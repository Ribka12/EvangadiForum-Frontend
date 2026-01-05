// import React from 'react'
// import styles from './Pagination.module.css'

// export default function Pagination({ page, totalPages, onChange, labels }) {
//   const prev = () => { onChange(Math.max(1, page - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }
//   const next = () => { onChange(Math.min(totalPages, page + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }
//   return (
//     <div className={styles.wrap}>
//       <button className={styles.btn} onClick={prev} disabled={page<=1}>{labels.prev}</button>
//       <span className={styles.page}>{page} / {totalPages || 1}</span>
//       <button className={styles.btn} onClick={next} disabled={page>=totalPages}>{labels.next}</button>
//     </div>
//   )
// }


// Import the React library to use React components and JSX syntax
// This is necessary for any component file in a React application
import React from 'react'

// Import CSS module for styling specific to the Pagination component
// This provides scoped styles that only apply to this component
import styles from './Pagination.module.css'

// Define and export the Pagination component as the default export
// This component accepts four props: current page number, total pages available,
// function to handle page changes, and labels for navigation buttons
export default function Pagination({ page, totalPages, onChange, labels }) {
  
  // Define function to navigate to the previous page
  const prev = () => { 
    // Call the onChange function with the previous page number
    // Math.max ensures the page never goes below 1 (minimum page number)
    onChange(Math.max(1, page - 1)); 
    
    // Scroll the browser window smoothly to the top after page change
    // This provides better user experience when navigating between pages
    window.scrollTo({ top: 0, behavior: 'smooth' }) 
  }
  
  // Define function to navigate to the next page
  const next = () => { 
    // Call the onChange function with the next page number
    // Math.min ensures the page never exceeds totalPages (maximum page number)
    onChange(Math.min(totalPages, page + 1)); 
    
    // Scroll the browser window smoothly to the top after page change
    // Ensures user sees the top of the new page content
    window.scrollTo({ top: 0, behavior: 'smooth' }) 
  }
  
  // Return the JSX structure that will be rendered as the Pagination component
  return (
    // Main container div with CSS module class for overall pagination styling
    <div className={styles.wrap}>
      
      {/* Previous page button - navigates to previous page when clicked */}
      <button 
        className={styles.btn} // Apply button styling from CSS module
        onClick={prev} // Call the prev function when button is clicked
        disabled={page<=1} // Disable button when on first page (page 1 or less)
      >
        {/* Display the 'previous' label text passed via props
            This allows for customization and internationalization */}
        {labels.prev}
      </button>
      
      {/* Display current page and total pages information */}
      <span className={styles.page}>
        {/* Show current page number followed by ' / ' separator and total pages
            If totalPages is falsy (undefined or 0), show 1 as default */}
        {page} / {totalPages || 1}
      </span>
      
      {/* Next page button - navigates to next page when clicked */}
      <button 
        className={styles.btn} // Apply button styling from CSS module
        onClick={next} // Call the next function when button is clicked
        disabled={page>=totalPages} // Disable button when on last page or beyond
      >
        {/* Display the 'next' label text passed via props
            This allows for customization and internationalization */}
        {labels.next}
      </button>
      
    </div>
  )
}