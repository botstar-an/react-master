import { Icon } from '@ahaui/react';

function Header({ title, description }: { title: string, description?: string }) {
  return (
    <div className="header">
      <div className="texts">
        <div className="title">
          {
            title && (<div className="text">{title}</div>)
          }
          {/* <div className="icon">
            <Icon size="small" name="more"/>
          </div> */}
        </div>
        {
          description && (<div className="description">{description}</div>)
        }
      </div>
    </div>
  );
}
export default Header;
