import {Box, Stack} from "@primer/react-brand";
import {Heading, NavList, Text} from "@primer/react";
import {useTranslation} from "react-i18next";
import {FC, ReactNode} from "react";
import {type Path} from "@/router.ts";
import {Outlet, useLocation} from "react-router";
import {GlobeIcon, PaintbrushIcon} from "@primer/octicons-react";

type NavItemProps = {
  label: string;
  href: Path;
  icon?: ReactNode;
}

type NavGroupProps = {
  title: string;
  items: NavItemProps[];
}

const SettingsLayout: FC = () => {

  const {t} = useTranslation('settings');
  const {pathname} = useLocation();

  const navGroups: NavGroupProps[] = [
    {
      title: 'general_group_title',
      items: [
        {label: t('language_and_region_title'), href: '/settings/general/language-and-region', icon: <GlobeIcon/>},
      ],
    },
    {
      title: 'appearance_group_title',
      items: [
        {label: t('theme_title'), href: '/settings/appearance/theme', icon: <PaintbrushIcon/>},
      ],
    },
  ];

  return (
    <Box className='flex justify-center'>
      <Stack className='w-[95%]'>
        <Box>
          <Heading as="h1">{t('header_title')}</Heading>
          <Text>{t('header_describe')}</Text>
        </Box>
        <Box>
          <Box className='flex'>
            <Box className='flex w-full'>
              <NavList className='flex-[0_0_30%]'>
                {navGroups.map((group) => {
                  if (group.items.length === 0) return null;
                  const navItems = group.items;
                  return (
                    <NavList.Group key={group.title} title={t(group.title)}>
                      {navItems.map((item) => (
                        <NavList.Item
                          key={item.href}
                          href={item.href}
                          aria-current={pathname === item.href ? 'page' : undefined}
                        >
                          {item.icon ? <NavList.LeadingVisual>{item.icon}</NavList.LeadingVisual> : null}
                          {item.label}
                        </NavList.Item>
                      ))}
                    </NavList.Group>
                  );
                })}
              </NavList>
              <Stack className='flex-1'>
                <Outlet/>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default SettingsLayout;