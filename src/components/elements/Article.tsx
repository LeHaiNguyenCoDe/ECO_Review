"use client";

import { Button } from "@headlessui/react";
import React, { useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";

type ArticleProps = {
  title?: string;
  children?: React.ReactNode;
  slice: number | -1;
  className?: string;
};

const Article = ({ children, ...props }: ArticleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const childrenArr = React.Children.toArray(children);

  const handleBtnClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <article className="relative text-left flex flex-col gap-3">
        <h2 className="text-lg font-semibold">{props.title}</h2>
        {childrenArr.map((element, index) => {
          let ret;
          if (index < props.slice) {
            ret = (
              <div key={index} className="block">
                {element}
              </div>
            );
          } else {
            ret = (
              <AnimatePresence key={index}>
                {isExpanded && (
                  <m.div
                    initial={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -20 }}
                    transition={{
                      ease: "easeInOut",
                      duration: 0.4,
                      delay: 0.05 * index,
                    }}
                  >
                    {element}
                  </m.div>
                )}
              </AnimatePresence>
            );
          }
          return ret;
        })}
        {!isExpanded && (
          <div
            className="absolute bottom-10 border-none w-full h-28 bg-gradient-to-t from-white to-slate-100"
            style={{
              background:
                "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.25))",
            }}
          ></div>
        )}
        {props.slice !== -1 ? (
          <div className="flex justify-center mt-2">
            <Button
              onClick={handleBtnClick}
              className="h-8 px-3 py-1.5 bg-slate-100 rounded-md justify-center items-center inline-flex shadow-inner data-[hover]:bg-slate-200"
            >
              {!isExpanded ? "Xem thêm" : "Thu gọn"}
            </Button>
          </div>
        ) : (
          ""
        )}
      </article>
    </>
  );
};

export default Article;
