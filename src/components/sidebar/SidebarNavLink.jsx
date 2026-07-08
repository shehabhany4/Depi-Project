<<<<<<< HEAD
=======
// // import { Link, useLocation } from "react-router-dom";
// // import { SidebarMenuItem } from "@/components/ui/sidebar";

// // const EASE = "cubic-bezier(0.165,0.85,0.45,1)";

// // export function SidebarNavLink({ to, icon: Icon, label, collapsed, isPrefix }) {
// //   const { pathname } = useLocation();
// //   const isActive = isPrefix ? pathname.startsWith(to) : pathname === to;

// //   return (
// //     <SidebarMenuItem className="list-none!">
// //       <Link
// //         to={to}
// //         className={`group relative flex h-9 w-full items-center rounded-lg px-4 text-sm transition-colors duration-75 active:scale-[0.99] overflow-hidden ${
// //           isActive
// //             ? "bg-sidebar-accent text-sidebar-accent-foreground"
// //             : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
// //         }`}
// //       >
// //         <div className="flex w-full -translate-x-2 items-center gap-3">
// //           <span className="grid size-5 shrink-0 place-items-center text-sidebar-foreground">
// //             <Icon size={16} />
// //           </span>
// //           <span
// //             className="flex-1 truncate text-left"
// //             style={{
// //               transition: `opacity 150ms ${EASE}`,
// //               opacity: collapsed ? 0 : 1,
// //             }}
// //           >
// //             {label}
// //           </span>
// //         </div>
// //       </Link>
// //     </SidebarMenuItem>
// //   );
// // }
// // src/components/sidebar/SidebarNavLink.jsx
// import { NavLink } from "react-router-dom";

// export function SidebarNavLink({ to, icon: Icon, label, collapsed }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
//           isActive
//             ? "bg-teal-50 text-teal-700 border border-teal-200"
//             : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//         }`
//       }
//     >
//       {Icon && <Icon size={18} />}
//       {!collapsed && <span>{label}</span>}
//     </NavLink>
//   );
// }
// src/components/sidebar/SidebarNavLink.jsx
>>>>>>> e643cd17d834f31dda68613b868f138e2b3c008d
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";

export function SidebarNavLink({
  to,
  icon: Icon,
  label,
  collapsed,
  protected: isProtected,
}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const openModal = useAuthStore((s) => s.openModal);

  const handleClick = (e) => {
    if (isProtected && !isAuthenticated) {
      e.preventDefault();
      openModal("signin", to);
    }
  };

<<<<<<< HEAD
export function SidebarNavLink({ to, icon: Icon, label, collapsed }) {
  const baseClass = "group relative flex items-center justify-center w-full mx-auto rounded-xl transition-all duration-200";

=======
>>>>>>> e643cd17d834f31dda68613b868f138e2b3c008d
  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={({ isActive }) =>
        collapsed
          ? `${baseClass} ${
              isActive
                ? "bg-teal-50 text-teal-700 border border-teal-200"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 hover:scale-105"
            }`
          : `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-teal-50 text-teal-700 border border-teal-200"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
      }
      style={collapsed ? { aspectRatio: "1/1" } : undefined}
    >
      {Icon && <Icon size={collapsed ? 20 : 22} strokeWidth={collapsed ? 2 : 2} />}
      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-2 z-[9999] w-max rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-150 group-hover:opacity-100 before:absolute before:left-[-4px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-gray-900">
          {label}
        </span>
      )}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}