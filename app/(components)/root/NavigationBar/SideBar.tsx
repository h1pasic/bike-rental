import { SideElementProps } from '@/app/(components)/root/NavigationBar/SideElement'
import { StaticImageData } from 'next/image'
import DesktopSidebar from '@/app/(components)/root/NavigationBar/DesktopSidebar'
import MobileSidebar from '@/app/(components)/root/NavigationBar/MobileSidebar'
import getSessionData from '@/lib/Shared/getSessionData'

export interface SidebarProps {
  elements: SideElementProps[]
  user?: {
    name: string
    image: StaticImageData | string
  }
}

export default async function SideBar() {
  const { data } = await getSessionData()

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
  const ManagementElements: SideElementProps[] = [
    {
      icon: 'LockOpenIcon',
      name: 'Management',
      subitems: [
        {
          icon: 'AdjustmentsVerticalIcon',
          name: 'Manage Stations',
          href: '/management/stations',
        },
      ],
    },
  ]

  if (data?.managementAccess) SidebarProps.elements.push(...ManagementElements)

  return (
    <>
      <MobileSidebar {...SidebarProps} />
      <DesktopSidebar {...SidebarProps} />
    </>
  )
}
