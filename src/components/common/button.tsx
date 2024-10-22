import type { FC, PropsWithChildren, AnchorHTMLAttributes } from 'react'
import clsx from 'clsx/lite'
import BackIcon from '~icons/material-symbols/arrow-back-rounded'

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const LinkButton: FC<PropsWithChildren<LinkButtonProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <a
      className={clsx('text-zinc-500 hover:text-zinc-800', className)}
      {...props}
    >
      {children}
    </a>
  )
}

export const BackButton: FC<LinkButtonProps> = ({ className, ...props }) => {
  return (
    <LinkButton className={clsx(className)} {...props}>
      <BackIcon />
    </LinkButton>
  )
}
