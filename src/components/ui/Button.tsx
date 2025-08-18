import { Send } from "lucide-react";
import { ReactNode } from "react";

const Button = ({
  children,
  className,
  isActive = false,
}: {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
}) => {
  const colorClasses = isActive
    ? "bg-[#D08700]"
    : "bg-[#bebebe] hover:bg-[#D08700]";

  return (
    <button
      className={`${className} ${colorClasses} inline-flex items-center justify-center gap-3 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
    >
      {children}
    </button>
  );
};

export default Button;
