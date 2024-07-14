import { Button } from "pixel-retroui";

interface LButtonProps {
  text: string;
  onClick?: () => void;
  bg?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
}

const LButton = ({
  text,
  onClick,
  bg,
  textColor,
  borderColor,
  className,
}: LButtonProps) => {
  return (
    <Button
      onClick={onClick}
      bg={bg}
      textColor={textColor}
      borderColor={borderColor}
      className={`px-3 ${className}`}
    >
      {text}
    </Button>
  );
};

export default LButton;
