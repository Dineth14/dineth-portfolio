import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  number,
  title,
  subtitle,
  className,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-16', align === 'center' && 'text-center', className)}>
      <div className={cn('flex items-center gap-4 mb-3', align === 'center' && 'justify-center')}>
        <div className="h-px w-8 bg-[#4A7FA5]" />
        <span className="font-mono text-xs text-[#4A7FA5] tracking-[0.3em] uppercase">
          {number}
        </span>
      </div>
      <h2 className="font-[Syne,sans-serif] text-4xl md:text-5xl font-bold text-[#E2DDD4] tracking-tight leading-none">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-mono text-sm text-[#8B8578] tracking-widest uppercase">
          // {subtitle}
        </p>
      )}
    </div>
  );
}
