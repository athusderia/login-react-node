import { Link } from "react-router-dom";
import "./DefaultLayout.css";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <nav>
          <ul className="layout-nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </nav>
      </header>
      <main className="layout-main">{children}</main>
    </div>
  );
}
