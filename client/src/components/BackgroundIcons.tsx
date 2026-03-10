import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export const BackgroundIcons = () => {
  const backgroundIcons = [
    {
      icon: <SiMongodb />,
      color: "text-emerald-400/10",
      pos: "top-20 left-[8%] hidden lg:block",
      rotate: "rotate-[17deg]",
      size: "text-8xl",
    },
    {
      icon: <SiReact />,
      color: "text-cyan-400/10",
      pos: "bottom-40 left-[15%] hidden lg:block",
      rotate: "rotate-[52deg]",
      size: "text-9xl",
    },
    {
      icon: <SiNodedotjs />,
      color: "text-lime-400/10",
      pos: "bottom-32 right-[8%] hidden lg:block",
      rotate: "-rotate-[15deg]",
      size: "text-7xl",
    },
    {
      icon: <SiTailwindcss />,
      color: "text-sky-400/10",
      pos: "top-1/2 left-[5%] hidden lg:block",
      rotate: "rotate-[8deg]",
      size: "text-8xl",
    },
    {
        icon: <SiTypescript />,
        color: "text-blue-400/10",
        pos: "top-32 right-[15%] hidden lg:block",
        rotate: "-rotate-[12deg]",
        size: "text-8xl",
    },
    {
        icon: <SiExpress />,
        color: "text-gray-500/10",
        pos: "top-1/3 right-[5%] hidden lg:block",
        rotate: "rotate-[25deg]",
        size: "text-7xl",
    },
  ];

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(69,40,41,0.05) 1px, rgba(69,40,41,0.05) 3px),
            repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(69,40,41,0.05) 1px, rgba(69,40,41,0.05) 3px)
          `,
          }}
        ></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(69,40,41,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        {backgroundIcons.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.pos} ${item.color} ${item.rotate} ${item.size}`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </>
  );
};
