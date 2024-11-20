const tagsView = {
  default: {
    color: "#996600",
    bgColor: "#FFEECC",
    className: "text-yellowShades-text bg-yellowShades-background",
  },
  Latest: {
    color: "#006633",
    bgColor: "#006633",
    className: "text-orangeShades-text bg-orangeShades-background",
  },
  "Hot & New": {
    color: "#990000",
    bgColor: "#FFCCCC",
    className: "text-redShades-text bg-redShades-background",
  },
  "Highest Rated": {
    color: "#336699",
    bgColor: "#CCE0FF",
    className: "text-blueShades-text bg-blueShades-background",
  },
  Bestseller: {
    color: "#994C00",
    bgColor: "#FFD8A8",
    className: "text-greenShades-text bg-greenShades-background",
  },
  New: {
    color: "#663366",
    bgColor: "#CC99CC",
    className: "text-purpleShades-text bg-purpleShades-background",
  },
};

const getBgColor = (tag: string) => {
  if (tag in tagsView) return `bg-[${tagsView[tag as "default"].bgColor}]`;
  return `bg-[${tagsView.default.bgColor}]`;
};

const getTextColor = (tag: string) => {
  if (tag in tagsView) return `text-[${tagsView[tag as "default"].color}]`;
  return `text-[${tagsView.default.color}]`;
};

const getClassName = (tag: string) => {
  if (tag in tagsView) return `${tagsView[tag as "default"].className}`;
  return `text-[${tagsView.default.className}]`;
};

export default function CategoryTags({ children }: { children: string }) {
  return (
    <span className={`${getClassName(children)} p-2 m-2`}>{children}</span>
  );
}
