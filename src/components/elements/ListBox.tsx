"use client";

import {
  Listbox as IListbox,
  ListboxButton,
  ListboxOption as IListboxOption,
  ListboxOptions,
  ListboxSelectedOption,
  ListboxOptionProps,
  ListboxProps,
} from "@headlessui/react";
import clsx from "clsx";
import { Fragment, ReactElement } from "react";

type ListBoxProps = {
  children?: React.ReactNode;
  placeholder?: string;
  anchor?: "bottom end" | "bottom start" | "top end" | "top start";
} & ListboxProps;

const ListBox = ({
  placeholder,
  children,
  anchor = "bottom end",
  ...props
}: ListBoxProps) => {
  return (
    <IListbox {...props}>
      <ListboxButton className="bg-red-700 relative block w-full rounded-lg bg-white/5">
        <ListboxSelectedOption
          options={children}
          placeholder={<span className="opacity-50">{placeholder}</span>}
        />
        {"ButtonValue"}
      </ListboxButton>
      <ListboxOptions
        anchor={anchor}
        transition
        className={clsx(
          "bg-yellow-400",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
        )}
      >
        {children}
      </ListboxOptions>
    </IListbox>
  );
};

const ListboxOption = ({ children, ...props }: ListboxOptionProps) => {
  return (
    <IListboxOption as={Fragment} {...props}>
      {({ selectedOption }): ReactElement => {
        return selectedOption ? (
          <>{children}</>
        ) : (
          <div className="data-[focus]:bg-blue-100">
            <>{children}</>
          </div>
        );
      }}
    </IListboxOption>
  );
};

ListBox.Option = ListboxOption;

export { ListboxOption };
export default ListBox;
