import { FC } from "react";
import { Menu, Item, Separator, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import Icon from "@components/Icon";
export const DEFAULT_ID = "contextualMenu";

interface ContextualMenuIntf {
  id?: string;
  items?: {
    elementType: "item" | "submenu" | "separator";
    name?: string;
    icon?: string;
    onClick?: () => void;
    disabled?: boolean;
    color?: "error";
  }[];
}

interface contextItems {
  elementType: "item" | "submenu" | "separator";
  name?: string;
  onClick?: () => void;
  icon?: string;
  disabled?: boolean;
  color?: "error";
}
[];

const ContextualMenu: FC<ContextualMenuIntf> = ({ id, items }) => {
  const colors = { error: "text-error" };
  const elements: {
    item: (element: contextItems) => JSX.Element;
    submenu: (element: contextItems) => JSX.Element;
    separator: () => JSX.Element;
  } = {
    item: (element) => (
      <Item
        onClick={element.onClick}
        key={`${element.name}-only-item`}
        disabled={element.disabled ? element.disabled : false}
      >
        {element.icon && (
          <Icon
            icon={element.icon}
            className={element.color ? colors[element.color] : ""}
          />
        )}{" "}
        <span className={`ms-2 ${element.color ? colors[element.color] : ""}`}>
          {element.name}
        </span>
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
