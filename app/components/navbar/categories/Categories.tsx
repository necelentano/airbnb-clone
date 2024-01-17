"use client";

import React from "react";
import Container from "../../container/Container";
import { categoriesItems } from "./constants";
import CategoryBox from "../../category-box/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params?.get("category");

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categoriesItems.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
