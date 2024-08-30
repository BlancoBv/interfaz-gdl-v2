import { FC, Fragment } from "react";
import { Menu, Item, Separator, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import Icon from "@components/Icon";
export const DEFAULT_ID = "contextualMenu";

export interface contextItems {
  elementType: "item" | "submenu" | "separator";
  name?: string;
  onClick?: () => void;
  icon?: string;
  disabled?: boolean;
  color?: "error";
}

interface contextualMenuInterface {
  id?: string;
  items?: contextItems[];
}

const ContextualMenu: FC<contextualMenuInterface> = ({ id, items }) => {
  const colors = { error: "text-error" };
  const elements: {
    item: (element: contextItems, index: number) => JSX.Element;
    submenu: (element: contextItems) => JSX.Element;
    separator: () => JSX.Element;
  } = {
    item: (element, index) => (
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
        items.map((el, index) => (
          <Fragment key={`${el.elementType} ${index}`}>
            {elements[el.elementType](el, index)}
          </Fragment>
        ))
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
