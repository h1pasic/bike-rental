import { SideElementProps } from '@/app/(components)/root/NavigationBar/SideElement'
import { StaticImageData } from 'next/image'
import DesktopSidebar from '@/app/(components)/root/NavigationBar/DesktopSidebar'
import MobileSidebar from '@/app/(components)/root/NavigationBar/MobileSidebar'

export interface SidebarProps {
  elements: SideElementProps[]
  user?: {
    name: string
    image: StaticImageData | string
  }
}

export default function SideBar() {
  const SidebarProps: SidebarProps = {
    elements: [
      { name: 'Home', icon: 'HomeIcon', href: '/' },
      {
        name: 'Browse',
        icon: 'FolderIcon',
        subitems: [
          {
            name: 'Rental Shops',
            href: '/stations/',
            icon: 'BuildingStoreFrontIcon',
            badge: 15,
          },
          {
            name: 'Available Bikes',
            href: '/bikes/',
            icon: 'ShoppingBagIcon',
            badge: 45,
          },
        ],
      },
      { name: 'Book Tickets', icon: 'CursorArrowRaysIcon', href: '/tickets' },
    ],
  }

  return (
    <>
      <MobileSidebar {...SidebarProps} />
      <DesktopSidebar {...SidebarProps} />
    </>
  )
}
