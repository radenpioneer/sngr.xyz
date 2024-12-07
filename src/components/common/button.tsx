import type { FC, PropsWithChildren, AnchorHTMLAttributes } from 'react'
import clsx from 'clsx/lite'
import BackIcon from '~icons/material-symbols/arrow-back-rounded'
import HomeIcon from '~icons/material-symbols/house-rounded'

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const LinkButton: FC<PropsWithChildren<LinkButtonProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <a
      className={clsx(
        'text-lg text-zinc-400 hover:text-zinc-800 sm:text-2xl',
        className
      )}
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

export const HomeButton: FC<LinkButtonProps> = ({ className, ...props }) => {
  return (
    <LinkButton className={clsx(className)} {...props}>
      <HomeIcon />
    </LinkButton>
  )
}
