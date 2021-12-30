type ButtonProps = {
  title: string;
  alt: string;
  src: string;
};

const ButtonIcon = ({ title, alt, src }: ButtonProps) => {
  return (
    <button className="px-4 py-2 inline-flex justify-center border border-gray-300 text-sm font-medium rounded-md text-white bg-white w-full hover:bg-gray-300">
      <img src={src} width={16} className="mr-2" alt={alt} />
      <span className="text-black">{title}</span>
    </button>
  );
};

export default ButtonIcon;
