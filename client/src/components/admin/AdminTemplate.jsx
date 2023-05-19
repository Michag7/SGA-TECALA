import PropTypes from "prop-types";
import SidebarAdmin from "./SidebarAdmin";

function AdminTemplate({ children }) {
  return (
    <div className="flex">
      <SidebarAdmin />
      <main className="max-w flex-1">{children}</main>
    </div>
  );
}

AdminTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminTemplate;