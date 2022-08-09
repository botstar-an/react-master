import { useAuth } from "../hooks/useAuth";
import { Avatar, Dropdown, Icon } from '@ahaui/react';

function NavBar() {
  const { user } = useAuth();

  const handleToggle = () => {
    console.log('handleToggle');
  };

  if (!user) {
    return <></>;
  }

  return (
    <div className="navbar">
      <div className="name">{user?.name}</div>
      <Dropdown onToggle={handleToggle}>
        <Dropdown.Toggle className="u-textLight u-lineHeightNone" >
          <div className="avatar u-inlineBlock u-marginLeftSmall u-marginRightMedium">
            <Avatar src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/uifaces/m-10.jpg" />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Container className="u-paddingVerticalExtraSmall">
          <Dropdown.Item>
            <Icon name="setting" size="small" />
            <span className="u-marginLeftExtraSmall">My Profile</span>
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name="card" size="small" />
            <span className="u-marginLeftExtraSmall">Payment</span>
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name="power" size="small" />
            <span className="u-marginLeftExtraSmall">Logout</span>
          </Dropdown.Item>
        </Dropdown.Container>
      </Dropdown>
    </div>
  );
}

export default NavBar;
