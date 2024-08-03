import { FC } from "react";
import { Menu, Item, Separator, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import Icon from "../Icon";
export const DEFAULT_ID = "contextualMenu";

interface ContextualMenuIntf {
  id?: string;
  items?: {
    elementType: "item" | "submenu" | "separator";
    name?: string;
    icon?: string;
    onClick?: () => void;
  }[];
}

interface contextItems {
  elementType: "item" | "submenu" | "separator";
  name?: string;
  onClick?: () => void;
  icon?: string;
}
[];

const ContextualMenu: FC<ContextualMenuIntf> = ({ id, items }) => {
  const elements: {
    item: (element: contextItems) => JSX.Element;
    submenu: (element: contextItems) => JSX.Element;
    separator: () => JSX.Element;
  } = {
    item: (element) => (
      <Item onClick={element.onClick}>
        {element.icon && <Icon icon={element.icon} />}{" "}
        <span className="ms-2">{element.name}</span>
      </Item>
    ),
    submenu: (element) => <Item>{element.name}</Item>,
    separator: () => <Separator />,
  };
  return (
    <Menu id={id ? id : DEFAULT_ID}>
      {items ? (
        <>{items.map((el) => elements[el.elementType](el))}</>
      ) : (
        <>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Separator />
          <Item disabled>Disabled</Item>
          <Separator />
          <Submenu label="Submenu">
            <Item>Sub Item 1</Item>
            <Item>Sub Item 2</Item>
          </Submenu>
        </>
      )}
    </Menu>
  );
};

export default ContextualMenu;
