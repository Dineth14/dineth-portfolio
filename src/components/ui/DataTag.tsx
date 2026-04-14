import { cn } from '@/lib/utils';

interface DataTagProps {
  label: string;
  color?: 'sapphire' | 'gold' | 'sage';
  className?: string;
}

const colorMap = {
  sapphire: 'text-[#7CB4D4] border-[#4A7FA5]/50 bg-[#4A7FA5]/10',
  gold: 'text-[#C49A6C] border-[#C49A6C]/50 bg-[#C49A6C]/10',
  sage: 'text-[#6B8F71] border-[#6B8F71]/50 bg-[#6B8F71]/10',
};

export default function DataTag({ label, color = 'sapphire', className }: DataTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono text-xs tracking-widest border rounded px-2 py-0.5',
        colorMap[color],
        className
      )}
    >
      [ {label} ]
    </span>
  );
}
