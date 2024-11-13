type ButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function Button(props: ButtonProps) {
  const { type, onClick, className, children, disabled } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} text-white font-bold w-full rounded-lg p-4 bg-gradient-to-r from-[#62cdcb] to-[#4599db] ${
        disabled && 'opacity-50 cursor-not-allowed'
      } shadow-xl shadow-[#62cdcb]/50 hover:shadow-[#4599db]`}>
      {children}
    </button>
  );
}
