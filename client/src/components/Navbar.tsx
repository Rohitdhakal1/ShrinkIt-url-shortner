import { FaLinkedinIn, FaGithub, FaFileAlt } from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav
        className="w-full p-5 flex justify-between items-center border-b-[3px] border-[#452829] bg-[#F3E8DF]/95 backdrop-blur sticky top-0 z-50"
        style={{ transform: "rotate(-0.3deg)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 bg-[#452829] rounded-sm flex items-center justify-center font-bold text-2xl text-[#E8D1C5] border-[3px] border-[#452829] shadow-[4px_4px_0px_0px_#452829]"
            style={{ transform: "rotate(3deg)" }}
          >
            S
          </div>
          <span className="font-black text-xl tracking-tight text-[#452829]">
            Shrink<span className="text-[#57595B]">It</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/rohitdhakal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#57595B] hover:text-[#452829] transition-colors duration-200 hover:scale-110 transform"
          >
            <FaLinkedinIn size={24} />
          </a>

          <a
            href="https://github.com/Rohitdhakal1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#57595B] hover:text-[#452829] transition-colors duration-200 hover:scale-110 transform"
          >
            <FaGithub size={24} />
          </a>

          <a
            href="/resume.pdf"
            download="Rohit_Dhakal_Resume.pdf"
            className="text-[#57595B] hover:text-[#452829] transition-colors duration-200 hover:scale-110 transform"
          >
            <FaFileAlt size={24} />
          </a>
        </div>
      </nav>
  );
};
