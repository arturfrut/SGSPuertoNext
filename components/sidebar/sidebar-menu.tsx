import React from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
  bigText?: boolean;
}

export const SidebarMenu = ({ title, children, bigText }: Props) => {
  return (
    <div className="flex gap-2 flex-col">
      <span className={`${bigText ? "text-xl font-bold" : "text-xs" } font-normal  `}>{title}</span>
      {children}
    </div>
  );
};
