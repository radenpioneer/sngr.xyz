import type { FC } from 'react'
import type { CollectionEntry } from 'astro:content'
import MenuIcon from '~icons/material-symbols/menu-rounded'

interface HeaderProps {
  site: CollectionEntry<'site'>
  menu: CollectionEntry<'menu'>
}

const Header: FC<HeaderProps> = ({ site, menu }) => {
  return (
    <nav className='max-w-screen-2xl font-heading bg-bg/[.8] border-muted/[.2] fixed inset-x-0 top-0 z-[99] mx-auto flex items-center justify-between border-b py-2 px-4 backdrop-blur sm:py-4'>
      <ul>
        <li className='from-primary to-secondary bg-gradient-to-r bg-clip-text font-[700] uppercase text-transparent md:text-xl'>
          <a href='/#top'>
            <strong>{site.data.name}</strong>
          </a>
        </li>
      </ul>
      <HeaderMenu menu={menu} />
    </nav>
  )
}

const HeaderMenu: FC<Pick<HeaderProps, 'menu'>> = ({ menu }) => {
  return (
    <>
      <ul className='text-primary hidden text-lg font-bold md:flex md:gap-4'>
        {menu.data.items.map((item, _i) => (
          <li key={_i}>
            <a href={item.path}>{item.label}</a>
          </li>
        ))}
      </ul>
      <ul className='text-primary flex items-center md:hidden'>
        <li>
          <button>
            <MenuIcon className='text-lg' />
          </button>
        </li>
      </ul>
    </>
  )
}

export default Header
