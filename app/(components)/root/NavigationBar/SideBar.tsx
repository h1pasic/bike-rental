'use client'
import { BuildingLibraryIcon, CursorArrowRaysIcon, FolderIcon, HomeIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { SideElementProps } from '@/app/(components)/root/NavigationBar/SideElement'
import Profile_Dummy from '@/public/Icons/DummyAvatar.jpg'
import MobileSidebar from '@/app/(components)/root/NavigationBar/MobileSidebar'
import DesktopSidebar from '@/app/(components)/root/NavigationBar/DesktopSidebar'
import { StaticImageData } from 'next/image'

export interface SidebarProps {
  elements: SideElementProps[]
  user?: {
    name: string
    image: StaticImageData | string
  }
}

const SidebarProps: SidebarProps = {
  elements: [
    { name: 'Home', icon: HomeIcon, href: '/' },
    {
      name: 'Browse',
      icon: FolderIcon,
      subitems: [
        {
          name: 'Rental Shops',
          href: '/stations/',
          icon: BuildingLibraryIcon,
          badge: 15,
        },
        {
          name: 'Available Bikes',
          href: '/bikes/',
          icon: ShoppingBagIcon,
          badge: 45,
        },
      ],
    },
    { name: 'Book Tickets', icon: CursorArrowRaysIcon, href: '/tickets' },
  ],
  user: {
    name: 'Max Mustermann',
    image: Profile_Dummy,
  },
}

export default function SideBar() {
  return (
    <>
      <MobileSidebar {...SidebarProps} />
      <DesktopSidebar {...SidebarProps} />
    </>
  )
}
