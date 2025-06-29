// src/components/NavBar.jsx
export function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-card rounded-t-2xl flex justify-around py-2 z-50">
      <NavLink href="/dashboard" icon="dashboard" label="Dashboard" />
      <NavLink href="/jobs" icon="work" label="Jobs" />
      <NavLink href="/portfolio" icon="collections" label="Portfolio" />
      <NavLink href="/notifications" icon="notifications" label="Alerts" />
    </nav>
  );
}

function NavLink({ href, icon, label }) {
  return (
    <a href={href} className="flex flex-col items-center text-primary">
      <span className="material-icons">{icon}</span>
      <span className="text-xs">{label}</span>
    </a>
  );
}
