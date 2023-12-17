'use client'
import { parseCookies, setCookie } from 'nookies'
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import { GlobalColorSettings } from '@/lib/root/ColorSettings'

export default function ColorModeSwitcher({ className }: { className?: string }) {
  const [mode, setMode] = useState<'light' | 'dark' | undefined>()
  const cookiePermission = !!parseCookies()?.essentialCookies

  const current = () => parseCookies()?.colorMode
  const toggleMode = () => {
    const updateCookies = (mode: 'dark' | 'light') => {
      if (cookiePermission) {
        setCookie(null, 'colorMode', mode, {
          maxAge: 24 * 60 * 60 * 300, // 300 days
          path: '/',
          secure: false,
          sameSite: true,
        })
      } else console.log(`Essential cookies were denied, color-mode preference won't be saved.`)

      document.documentElement.classList.toggle('dark')
      document.documentElement.classList.toggle(GlobalColorSettings.lightBackground)
      document.documentElement.classList.toggle(GlobalColorSettings.raw_darkBackground)
    }

    //? When the user first visits the site, we want to set the color mode to their preference.
    if (!current()) {
      const userPreference = window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      updateCookies(userPreference)
      setMode(userPreference)
      return
    }

    const newMode = current() === 'dark' ? 'light' : 'dark'
    updateCookies(newMode)
    setMode(newMode)
  }

  useEffect(() => {
    if (!current()) {
      console.log('Welcome, your color-preference has been saved.')
      toggleMode()
      return
    }

    setMode(current() === 'light' ? 'light' : 'dark')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={twMerge('h-6 w-6 hover:cursor-pointer', className)}>
      <Transition show={mode === 'light'} enter='transition duration-300' enterFrom='rotate-45 opacity-50' enterTo='rotate-0 opacity-100'>
        {mode === 'light' && <SunIcon onClick={toggleMode} />}
      </Transition>

      <Transition show={mode === 'dark'} enter='transition duration-300' enterFrom='-rotate-45 opacity-50' enterTo='rotate-45 opacity-100'>
        {mode === 'dark' && <MoonIcon onClick={toggleMode} />}
      </Transition>
    </div>
  )
}
