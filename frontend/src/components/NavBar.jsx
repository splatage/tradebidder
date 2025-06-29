import { useLocation } from "react-router-dom";

// Add Material Icons font in index.html if not already!
export function NavBar({ className = "" }) {
  const location = useLocation();
  const navLinks = [
    { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { href: "/jobs", icon: "work", label: "Jobs" },
    { href: "/portfolio", icon: "collections", label: "Portfolio" },
    { href: "/notifications", icon: "notifications", label: "Alerts" },
  ];
  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-white shadow-card rounded-t-2xl flex justify-around py-2 z-50 md:hidden ${className}`}>
      {navLinks.map((l) => (
        <NavLink key={l.href} {...l} active={location.pathname.startsWith(l.href)} />
      ))}
    </nav>
  );
}

function NavLink({ href, icon, label, active }) {
  return (
    <a
      href={href}
      className={`flex flex-col items-center px-2 py-1 rounded-lg ${active ? "bg-blue-100 text-blue-700 font-bold" : "text-primary"} transition`}
      style={{ minWidth: 60 }}
    >
      <span className="material-icons text-2xl">{icon}</span>
      <span className="text-xs">{label}</span>
    </a>
  );
}
