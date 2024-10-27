
import "../css/admin-styles.css";
import AdminLinks from "@/components/admin/adminlinks";

export default async function Layout({ children }) {


  return (
    <div className="admin-container">
        <AdminLinks />
      <div
        style={{
          padding: "10px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
