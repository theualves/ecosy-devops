import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 100, height = 100, className }: LogoProps) {
  return (
    <div className={className}>
      <Image
        src="/logo.svg" 
        alt="Logo Ecosy"
        width={width}
        height={height}
        className="mx-auto my-4" 
      />
    </div>
  );
}