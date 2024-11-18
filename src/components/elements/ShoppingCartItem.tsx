"use client";

import React, { useState } from "react";
import Checkbox from "./Checkbox";
import DeletePopup from "../popup/DeletePopup";
import Button from "./Button";
import { GoTrash } from "react-icons/go";
import { ICartPayload } from "@/lib/types";
import { useAppDispatch } from "@/hooks/redux";
import { addCartItem, removeCartItem } from "@/lib/features/checkout/cartSlice";
import NumberInput from "./NumberInput";
import Image from "next/image";
import { formatCurrency } from "@/utils/core";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { InventoryMdl } from "@/models/products/inventory";
import clsx from "clsx";
import { BiCheckCircle, BiChevronDown } from "react-icons/bi";

type ShoppingCartItemProps = {
  cartPayload: ICartPayload;
  item: "shopping-cart" | "icon";
  isSelect?: boolean;
  onSelect?: (val: boolean) => void;
  onChangeInventory?: (val: InventoryMdl | undefined) => void;
};

const ShoppingCartItem = ({
  cartPayload,
  item,
  isSelect,
  onSelect,
  onChangeInventory,
}: ShoppingCartItemProps) => {
  const [showDeletePop, setShowDeletePop] = useState(false);

  const dispatch = useAppDispatch();

  const [selectedType, setSelectedType] = useState<InventoryMdl | string>(
    cartPayload.itemMdl.inventories[0]?.variantName || "Loại"
  );

  const onConfirmDelete = () => {
    dispatch(removeCartItem({ ...cartPayload, quantity: -1 }));

    setShowDeletePop(false);
  };

  const handleCartItemValChange = (val: number, cartPayload: ICartPayload) => {
    if (!val) {
      return;
    }

    const changedNum = val - cartPayload.quantity;

    if (changedNum > 0) {
      dispatch(addCartItem({ ...cartPayload, quantity: changedNum }));
    } else if (changedNum < 0) {
      dispatch(
        removeCartItem({ ...cartPayload, quantity: Math.abs(changedNum) })
      );
    }
  };

  const handleChangeInventory = (val: InventoryMdl) => {
    if (!onChangeInventory) return;

    if (!val) return onChangeInventory(undefined);

    setSelectedType(val);
    onChangeInventory(val);
  };

  return item === "shopping-cart" ? (
    <div key={cartPayload.itemMdl.id} className="grid grid-cols-12 gap-3 py-4">
      <div className="col-span-6 flex gap-4 max-h-20">
        <Checkbox
          id={cartPayload.itemMdl.id}
          value={isSelect}
          onCheck={onSelect}
        >
          <Checkbox.Indicator />
        </Checkbox>
        <div className="flex gap-3">
          <Image
            src={cartPayload.itemMdl.imageUrl}
            alt={"Brand Name"}
            width={70}
            height={50}
            className="block rounded-md border-[0.5px] border-informal"
          />
          <div className="flex flex-col justify-between md:gap-2">
            <h2 className="text-base font-normal md:text-sm whitespace-nowrap">
              {cartPayload.itemMdl.name}
            </h2>
            <div className="flex flex-col gap-2">
              <Listbox value={selectedType} onChange={handleChangeInventory}>
                <ListboxButton
                  aria-placeholder="Product Characteristic"
                  className={clsx(
                    "relative flex items-center justify-between w-28 md:w-20 rounded-md bg-white py-1.5 px-2 text-left text-sm/6 border-[0.5px] border-informal",
                    "focus:outline-none md:size-5"
                  )}
                >
                  <span className="block text-sm md:text-xs whitespace-nowrap">
                    {(typeof selectedType !== "string" &&
                      selectedType?.variantValue) ||
                      selectedType.toString()}
                  </span>
                  <BiChevronDown
                    className="pointer-events-none size-4 fill-slate-800"
                    aria-hidden="true"
                  />
                </ListboxButton>
                <ListboxOptions
                  anchor={{ to: "bottom start", gap: 2 }}
                  transition
                  className={clsx(
                    "w-36 flex flex-col gap-1 bg-white rounded-md shadow-inner border border-informal py-1 focus:outline-none",
                    "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                  )}
                >
                  {cartPayload.itemMdl.inventories.map((inventory, index) => (
                    <ListboxOption
                      key={index}
                      value={inventory}
                      className="group flex items-center gap-2 py-1 px-2 text-sm justify-between select-none hover:bg-green-50 hover:cursor-pointer data-[selected]:text-primary"
                    >
                      <div className="flex gap-2 items-center">
                        <span className="invisible block border-l h-5 border-l-informal group-data-[focus]:visible"></span>
                        <span>{inventory.variantValue}</span>
                      </div>
                      <BiCheckCircle className="invisible size-4 fill-black group-data-[selected]:visible group-data-[selected]:fill-primary" />
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
              <div className="hidden md:flex md:flex-row md:gap-3">
                <div className="w-full h-full">
                  <NumberInput
                    value={cartPayload.quantity}
                    size="small"
                    onValChange={(val) => {
                      handleCartItemValChange(val, cartPayload);
                    }}
                  />
                </div>
                <span className="text-base text-discount block whitespace-nowrap md:text-lg">
                  {formatCurrency(
                    (typeof selectedType !== "string"
                      ? selectedType.price
                      : cartPayload.itemMdl.price) * cartPayload.quantity
                  )}{" "}
                  <u>đ</u>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 col-span-6 gap-1 items-center justify-items-center">
        <span className="col-span-3 text-base block whitespace-nowrap md:hidden">
          {formatCurrency(
            (typeof selectedType !== "string" && selectedType?.price) ||
              cartPayload.itemMdl.price
          )}{" "}
          <u>đ</u>
        </span>
        <div className="col-span-5 md:hidden">
          <NumberInput
            value={cartPayload.quantity}
            size="small"
            onValChange={(val) => {
              handleCartItemValChange(val, cartPayload);
            }}
          />
        </div>
        <span className="col-span-3 text-base text-discount block whitespace-nowrap md:hidden">
          {formatCurrency(
            (typeof selectedType !== "string"
              ? selectedType.price
              : cartPayload.itemMdl.price) * cartPayload.quantity
          )}{" "}
          <u>đ</u>
        </span>
        <div className="col-span-1 md:col-span-12 justify-self-end mb-auto">
          <Button
            onClick={() => setShowDeletePop(true)}
            className="group border rounded-md bg-[#ebf1f5] p-1 hover:border-primary"
          >
            <GoTrash className="size-4 text-informal group-hover:text-primary" />
          </Button>
        </div>
        <DeletePopup
          show={showDeletePop}
          onClose={() => setShowDeletePop(false)}
          onConfirm={onConfirmDelete}
        />
      </div>
    </div>
  ) : (
    <div className="flex gap-3 overflow-hidden mx-4 py-2">
      <div className="w-1/5 relative">
        <Image
          src={cartPayload.itemMdl.imageUrl}
          alt={cartPayload.itemMdl.name}
          fill={true}
          className="rounded-md"
        />
      </div>
      <div className="w-4/5 flex flex-col">
        <h3 className="font-medium text-base">{cartPayload.itemMdl.name}</h3>
        {/* TODO: [EW-101] enhance later */}
        <div>
          <span className="text-discount text-sm">
            {formatCurrency(cartPayload.itemMdl.price)} đ
          </span>
        </div>
        {/* {cartPayload.itemMdl.discount ? (
          <div className="flex text-sm gap-2 items-center">
            <span className="text-discount">
              {formatCurrency(cartPayload.itemMdl.discount.discountPrice)} đ
            </span>
            <span className="line-through text-xs text-informal">
              {formatCurrency(cartPayload.itemMdl.price)} đ
            </span>
          </div>
        ) : (
          <div>
            <span className="text-default">
              {formatCurrency(cartPayload.itemMdl.price)} đ
            </span>
          </div>
        )} */}
        <div className="flex justify-between">
          <div className="flex flex-row gap-2 items-center justify-start w-full h-full">
            <NumberInput
              size="small"
              value={cartPayload.quantity}
              onValChange={(val) => {
                handleCartItemValChange(val, cartPayload);
              }}
            />
          </div>
          <Button
            onClick={() => setShowDeletePop(true)}
            className="bg-slate-100 rounded w-8 h-7 min-w-7 min-h-5 flex items-center justify-center data-[hover]:bg-slate-200 data-[hover]:text-green-900 shadow-inner"
          >
            <GoTrash />
          </Button>
          <DeletePopup
            show={showDeletePop}
            onClose={() => setShowDeletePop(false)}
            onConfirm={onConfirmDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
