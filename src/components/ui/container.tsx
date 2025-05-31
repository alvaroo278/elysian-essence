import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div 
      className={cn('container-custom py-8 md:py-12', className)}
      {...props}
    >
      {children}
    </div>
  );
}