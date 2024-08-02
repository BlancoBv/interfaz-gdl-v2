import { FC } from "react";
import { Menu, Item, Separator, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
export const DEFAULT_ID = "contextualMenu";

const ContextualMenu: FC<{ id?: string }> = ({ id }) => {
  return (
    <Menu id={id ? id : DEFAULT_ID}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Separator />
      <Item disabled>Disabled</Item>
      <Separator />
      <Submenu label="Submenu">
        <Item>Sub Item 1</Item>
        <Item>Sub Item 2</Item>
      </Submenu>
    </Menu>
  );
};

export default ContextualMenu;
