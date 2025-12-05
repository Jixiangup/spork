import { useTheme, ActionMenu, ActionList } from '@primer/react'
import { SunIcon, MoonIcon } from '@primer/octicons-react'

import styles from './ColorModeSwitcher.module.css'

const ColorModeSwitcher = () => {
  const {setDayScheme, setNightScheme, colorScheme} = useTheme()

  const setScheme = (schemeValue: string, mode: string) => {
    setDayScheme(schemeValue);
    setNightScheme(schemeValue);
    const html = document.documentElement;
    const currentMode = html.getAttribute('data-color-mode');
    if (currentMode && mode !== currentMode) {
      html.setAttribute('data-color-mode', mode);
    }
  }

  const schemes = [
    {
      name: 'Light',
      value: 'light',
      mode: 'light',
      icon: SunIcon,
    },
    {
      name: 'Light colorblind',
      value: 'light_colorblind',
      mode: 'light',
      icon: SunIcon,
    },
    {
      name: 'Dark',
      value: 'dark',
      mode: 'dark',
      icon: MoonIcon,
    },
    {
      name: 'Dark colorblind',
      value: 'dark_colorblind',
      mode: 'dark',
      icon: MoonIcon,
    },
    {
      name: 'Dark high contrast',
      value: 'dark_high_contrast',
      mode: 'dark',
      icon: MoonIcon,
    },
    {
      name: 'Dark Dimmed',
      value: 'dark_dimmed',
      mode: 'dark',
      icon: MoonIcon,
    },
  ]

  const current = schemes.find((scheme) => scheme.value === colorScheme)

  return (
    <div className={styles.switcher}>
      <ActionMenu>
        <ActionMenu.Button size="medium">
          { current ? <current.icon/> : <></> }
          <div className={styles.btnText}> {current?.name}</div>
        </ActionMenu.Button>
        <ActionMenu.Overlay align="end">
          <ActionList>
            <ActionList.Group selectionVariant="single">
              {schemes.map((scheme) => (
                <ActionList.Item
                  key={scheme.value}
                  selected={scheme.value === colorScheme}
                  onSelect={() => setScheme(scheme.value, scheme.mode)}
                >
                  {scheme.name}
                </ActionList.Item>
              ))}
            </ActionList.Group>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </div>
  )

}

export default ColorModeSwitcher;