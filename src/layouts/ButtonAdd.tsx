import { Button, Icon } from '@ahaui/react';

export default function ButtonAdd({ handleOnClick }: { handleOnClick: any }) {
  return (
  <div className="btn-add">
    <Button size="small" onClick={() => handleOnClick()}>
      <Icon size="small" name="plus"/>
      Add category
    </Button>
  </div>
);
}
