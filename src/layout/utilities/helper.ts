import { NavigationItem } from "./navigationMenu";

export const getOpenKeys = (
  items: NavigationItem[],
  path: string
): string[] => {
  const openKeys: string[] = [];

  const traverse = (item: NavigationItem, parentKeys: string[] = []) => {
    const currentKeys = [...parentKeys, item.key];

    if (item.to && path.startsWith(item.to)) {
      openKeys.push(...currentKeys);
      return true;
    }

    if (item.children) {
      for (const child of item.children) {
        if (traverse(child, currentKeys)) {
          openKeys.push(...currentKeys);
          return true;
        }
      }
    }

    return false;
  };

  items.forEach((item) => traverse(item));
  return [...new Set(openKeys)];
};
