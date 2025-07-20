// import { useState, useEffect } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import styles from "./AdminSidebar.module.css"

// const AdminSidebar = ({ isOpen, setIsOpen, isMobileView }) => {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const menuItems = [
//     { name: "Dashboard", icon: "dashboard", path: "AdminDashboard" },
//     {
//       name: "Sections",
//       icon: "layers",
//       hasDropdown: true,
//       key: "sections",
//       subItems: [
//         { name: "Student Section", path: "AdminDashboard/StudentSection" },
//         { name: "College Section", path: "AdminDashboard/CollegeSection" },
//       ],
//     },
//     {
//       name: "Exams",
//       icon: "assignment",
//       hasDropdown: true,
//       key: "exams",
//       subItems: [
//         { name: "Manage Exams", path: "AdminDashboard/Manage_Exams" },
//         { name: "Manage College Exams", path: "AdminDashboard/College_Exams" },
//       ],
//     },
//     {
//       name: "Questions",
//       icon: "help_outline",
//       hasDropdown: true,
//       key: "questions",
//       subItems: [
//         { name: "Manage Questions", path: "AdminDashboard/ManageQuestions" },
//         { name: "Manage College Questions", path: "AdminDashboard/ManageCollegeQuestions" },
//       ],
//     },
//     { name: "Courses", icon: "menu_book", path: "AdminDashboard/AdminCourses" },
//     { name: "Logout", icon: "logout", path: "/" },
//   ]

//   // Check if current path exactly matches the given path
//   const isActive = (path) => {
//     if (!path) return false

//     const currentPath = location.pathname
//     const targetPath = path.startsWith("/") ? path : `/${path}`

//     // For exact matching - only highlight if exactly on this page
//     return currentPath === targetPath
//   }

//   // Check if any submenu item under a key is active
//   const isParentActive = (key) => {
//     const parent = menuItems.find((item) => item.key === key)
//     if (!parent || !parent.hasDropdown || !parent.subItems) return false
//     return parent.subItems.some((sub) => isActive(sub.path))
//   }

//   // Find which section should be open based on current page
//   const getActiveSection = () => {
//     for (const item of menuItems) {
//       if (item.hasDropdown && item.subItems) {
//         const hasActiveChild = item.subItems.some((sub) => isActive(sub.path))
//         if (hasActiveChild) {
//           return item.key
//         }
//       }
//     }
//     return null
//   }

//   // State to track which dropdown is open (only one at a time)
//   const [openSection, setOpenSection] = useState(getActiveSection())

//   // Update open section when location changes
//   useEffect(() => {
//     const activeSection = getActiveSection()
//     setOpenSection(activeSection)
//   }, [location.pathname])

//   // Toggle dropdown - close others when opening a new one
//   const toggleSection = (section) => {
//     setOpenSection((prev) => (prev === section ? null : section))
//   }

//   // Navigate to route & close sidebar on mobile
//   const handleNavClick = (path) => {
//     const navigationPath = path.startsWith("/") ? path : `/${path}`
//     navigate(navigationPath)
//     if (isMobileView) {
//       setIsOpen(false)
//     }
//   }

//   // Handle keyboard navigation for accessibility
//   const handleKeyDown = (e, action, param) => {
//     if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault()
//       if (action === "toggle") {
//         toggleSection(param)
//       } else if (action === "navigate") {
//         handleNavClick(param)
//       }
//     }
//   }

//   return (
//     <nav
//       className={`${styles.sidebarWrapper} ${isOpen ? styles.open : styles.closed}`}
//       aria-label="Sidebar navigation"
//       role="navigation"
//     >
//       <div className={styles.userProfile}>
//         <div className={styles.userAvatar}>
//           <span className="material-icons" aria-hidden="true">
//             groups
//           </span>
//         </div>
//         <div className={styles.userInfo}>
//           <div className={styles.userName}>Admin</div>
//           <div className={styles.userRole}>Super Administrator</div>
//         </div>
//       </div>

//       <div className={styles.nav}>
//         {menuItems.map((item, index) => (
//           <div key={index} className={styles.navItem}>
//             {item.hasDropdown ? (
//               <>
//                 <div
//                   className={`${styles.navLink} ${isParentActive(item.key) ? styles.active : ""}`}
//                   onClick={() => toggleSection(item.key)}
//                   role="button"
//                   tabIndex={0}
//                   onKeyDown={(e) => handleKeyDown(e, "toggle", item.key)}
//                   aria-expanded={openSection === item.key}
//                   aria-controls={`${item.key}-submenu`}
//                   aria-label={`${item.name} menu`}
//                 >
//                   <span className={`material-icons ${styles.navIcon}`} aria-hidden="true">
//                     {item.icon}
//                   </span>
//                   <span className={styles.navText}>{item.name}</span>
//                   <span
//                     className={`material-icons ${styles.dropdownIcon} ${
//                       openSection === item.key ? styles.dropdownOpen : ""
//                     }`}
//                     aria-hidden="true"
//                   >
//                     keyboard_arrow_down
//                   </span>
//                 </div>
//                 {openSection === item.key && (
//                   <div
//                     id={`${item.key}-submenu`}
//                     className={styles.subMenu}
//                     role="menu"
//                     aria-label={`${item.name} submenu`}
//                   >
//                     {item.subItems.map((subItem, subIndex) => (
//                       <button
//                         key={subIndex}
//                         className={`${styles.subNavLink} ${isActive(subItem.path) ? styles.active : ""}`}
//                         onClick={() => handleNavClick(subItem.path)}
//                         onKeyDown={(e) => handleKeyDown(e, "navigate", subItem.path)}
//                         role="menuitem"
//                         aria-label={subItem.name}
//                       >
//                         <span className={styles.subNavText}>{subItem.name}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </>
//             ) : (
//               <button
//                 className={`${styles.navLink} ${isActive(item.path) ? styles.active : ""}`}
//                 onClick={() => handleNavClick(item.path)}
//                 onKeyDown={(e) => handleKeyDown(e, "navigate", item.path)}
//                 aria-label={item.name}
//               >
//                 <span className={`material-icons ${styles.navIcon}`} aria-hidden="true">
//                   {item.icon}
//                 </span>
//                 <span className={styles.navText}>{item.name}</span>
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </nav>
//   )
// }

// export default AdminSidebar



import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styles from "./AdminSidebar.module.css"

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { name: "Dashboard", icon: "dashboard", path: "AdminDashboard" },
    {
      name: "Sections",
      icon: "layers",
      hasDropdown: true,
      key: "sections",
      subItems: [
        { name: "Student Section", path: "AdminDashboard/StudentSection" },
        { name: "College Section", path: "AdminDashboard/CollegeSection" },
      ],
    },
    {
      name: "Exams",
      icon: "assignment",
      hasDropdown: true,
      key: "exams",
      subItems: [
        { name: "Manage Exams", path: "AdminDashboard/Manage_Exams" },
        { name: "Manage College Exams", path: "AdminDashboard/College_Exams" },
      ],
    },
    {
      name: "Questions",
      icon: "help_outline",
      hasDropdown: true,
      key: "questions",
      subItems: [
        { name: "Manage Questions", path: "AdminDashboard/ManageQuestions" },
        { name: "Manage College Questions", path: "AdminDashboard/ManageCollegeQuestions" },
      ],
    },
    { name: "Courses", icon: "menu_book", path: "AdminDashboard/AdminCourses" },
    { name: "Logout", icon: "logout", path: "/" },
  ]

  const isActive = (path) => {
    if (!path) return false

    const currentPath = location.pathname
    const targetPath = path.startsWith("/") ? path : `/${path}`
    return currentPath === targetPath
  }

  const isParentActive = (key) => {
    const parent = menuItems.find((item) => item.key === key)
    if (!parent || !parent.hasDropdown || !parent.subItems) return false
    return parent.subItems.some((sub) => isActive(sub.path))
  }

  const getActiveSection = () => {
    for (const item of menuItems) {
      if (item.hasDropdown && item.subItems) {
        const hasActiveChild = item.subItems.some((sub) => isActive(sub.path))
        if (hasActiveChild) {
          return item.key
        }
      }
    }
    return null
  }

  // Dropdown open section state
  const [openSection, setOpenSection] = useState(getActiveSection())

  useEffect(() => {
    const activeSection = getActiveSection()
    setOpenSection(activeSection)
  }, [location.pathname])

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section))
  }

  const handleNavClick = (path) => {
    const navigationPath = path.startsWith("/") ? path : `/${path}`
    navigate(navigationPath)
    // Do NOT close sidebar on desktop, isOpen is controlled externally
    // You can add logic here if you want
  }

  const handleKeyDown = (e, action, param) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (action === "toggle") {
        toggleSection(param)
      } else if (action === "navigate") {
        handleNavClick(param)
      }
    }
  }

  return (
    <nav
      className={`${styles.sidebarWrapper} ${isOpen ? styles.open : styles.closed}`}
      aria-label="Sidebar navigation"
      role="navigation"
    >
      <div className={styles.userProfile}>
        <div className={styles.userAvatar}>
          <span className="material-icons" aria-hidden="true">
            groups
          </span>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Admin</div>
          <div className={styles.userRole}>Super Administrator</div>
        </div>
      </div>

      <div className={styles.nav}>
        {menuItems.map((item, index) => (
          <div key={index} className={styles.navItem}>
            {item.hasDropdown ? (
              <>
                <div
                  className={`${styles.navLink} ${isParentActive(item.key) ? styles.active : ""}`}
                  onClick={() => toggleSection(item.key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, "toggle", item.key)}
                  aria-expanded={openSection === item.key}
                  aria-controls={`${item.key}-submenu`}
                  aria-label={`${item.name} menu`}
                >
                  <span className={`material-icons ${styles.navIcon}`} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className={styles.navText}>{item.name}</span>
                  <span
                    className={`material-icons ${styles.dropdownIcon} ${
                      openSection === item.key ? styles.dropdownOpen : ""
                    }`}
                    aria-hidden="true"
                  >
                    keyboard_arrow_down
                  </span>
                </div>
                {openSection === item.key && (
                  <div
                    id={`${item.key}-submenu`}
                    className={styles.subMenu}
                    role="menu"
                    aria-label={`${item.name} submenu`}
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        className={`${styles.subNavLink} ${isActive(subItem.path) ? styles.active : ""}`}
                        onClick={() => handleNavClick(subItem.path)}
                        onKeyDown={(e) => handleKeyDown(e, "navigate", subItem.path)}
                        role="menuitem"
                        aria-label={subItem.name}
                      >
                        <span className={styles.subNavText}>{subItem.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <button
                className={`${styles.navLink} ${isActive(item.path) ? styles.active : ""}`}
                onClick={() => handleNavClick(item.path)}
                onKeyDown={(e) => handleKeyDown(e, "navigate", item.path)}
                aria-label={item.name}
              >
                <span className={`material-icons ${styles.navIcon}`} aria-hidden="true">
                  {item.icon}
                </span>
                <span className={styles.navText}>{item.name}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default AdminSidebar
