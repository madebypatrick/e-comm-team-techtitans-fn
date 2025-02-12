import SideBar from "../../components/SideBar/SideBar";
import Content from "../../components/Content/Content";
import NavBar from "../../components/NavMenu/NavBar";
import UserTable from "./UserTable";
import "../../styles/interface.scss";

function ListUser() {
  return (
    <>
      <div className="interface" id="interface">
        <NavBar />
        <Content>
          <p className="title">List of Users</p>
          <UserTable />
        </Content>
      </div>
      <SideBar />
    </>
  );
}

export default ListUser;
