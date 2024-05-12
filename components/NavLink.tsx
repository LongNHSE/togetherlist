'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnchorHTMLAttributes, ReactNode } from 'react';

//* to: string - The path to navigate to.
//* activeClassName: string - The class  to apply when the link is active.
//* children: ReactNode - The content of the link.
//* icon?: ReactNode - The icon to display next to the link text (optional).
interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  activeClassName: string;
  children: ReactNode;
  icon?: ReactNode;
}

const NavLink = ({
  to,
  children,
  activeClassName,
  icon,
  ...props
}: NavLinkProps) => {
  const asPath = usePathname();
  const isActive: boolean = asPath === to;
  const className: NavLinkProps['activeClassName'] = isActive
    ? activeClassName
    : '';
  return (
    <Link className={className} href={to} {...props}>
      <div className="flex items-center gap-1">
        {icon && icon}
        <span className={className}>{children}</span>
      </div>
    </Link>
  );
};

export default NavLink;
