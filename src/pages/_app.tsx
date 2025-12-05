import { ReactNode } from "react";
import { Outlet, useLocation } from "react-router";
import { NavList } from "@primer/react";
import { Box, Stack } from "@primer/react-brand";
import { AppsIcon, GearIcon, HomeIcon, InfoIcon } from "@primer/octicons-react";
import { type Path } from "@/router.ts";
import { useTranslation } from "react-i18next";

import '@/styles/layout.css';

type NavItemProps = {
	label: string;
	href: Path;
	icon?: ReactNode;
	isSetting?: boolean;
}

const SETTINGS_PATH = '/settings';

const Layout = () => {

	const { pathname } = useLocation();
	const { t } = useTranslation('layout');

	const navItems: NavItemProps[] = [
		{ label: t('nav_home_label'), href: '/', icon: <HomeIcon /> },
		{ label: t('nav_app_label'), href: '/apps', icon: <AppsIcon /> },
	];

	const footerItems: NavItemProps[] = [
		{ label: t('nav_about_label'), href: '/about', icon: <InfoIcon /> },
		{ label: t('nav_settings_label'), href: '/settings/general/language-and-region', icon: <GearIcon />, isSetting: true },
	];

	const isCurrentNav = (item: NavItemProps): 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean | undefined => {
		if (item.href) {
			if (item.isSetting) {
				return pathname.startsWith(SETTINGS_PATH) ? 'page' : undefined;
			} else {
				return pathname === item.href ? 'page' : undefined;
			}
		}
	}

	return (
		<Box className='h-[100%]'>
			<Box className='flex items-stretch h-[100%]' style={{ flexDirection: 'row' }}> {/* flex-row 不知道为什么没有生效 */}
				{/* 左侧导航容器 */}
				<Box className='layout-nav h-[100%] flex flex-[0_0_26%] flex-col'>
					{/* LOGO */}
					<Box className='layout-nav-header layout-nav-item flex-[0_0_5%] justify-center content-center'>
						<Stack>
							<div>LOGO</div>
						</Stack>
					</Box>
					{/* 导航项 */}
					<Box className='layout-nav-center layout-nav-item flex-1'>
						<Stack>
							<NavList>
								{navItems.map((item) => (
									<NavList.Item
										key={item.href}
										href={item.href}
										style={{ marginBottom: 'var(--stack-gap-normal)' }}
										aria-current={isCurrentNav(item)}
									>
										{item.icon ? <NavList.LeadingVisual>{item.icon}</NavList.LeadingVisual> : null}
										{item.label}
									</NavList.Item>
								))}
							</NavList>
						</Stack>
					</Box>
					<Box className='layout-nav-footer layout-nav-item flex-[0_0_5%] w-[100%]'>
						<Stack>
							<NavList>
								{footerItems.map((item) => (
									<NavList.Item
										key={item.href}
										href={item.href}
										style={{ marginBottom: 'var(--stack-gap-normal)' }}
										aria-current={isCurrentNav(item)}
									>
										{item.icon ? <NavList.LeadingVisual>{item.icon}</NavList.LeadingVisual> : null}
										{item.label}
									</NavList.Item>
								))}
							</NavList>
						</Stack>
					</Box>
				</Box>
				{/* 中间的分割线 */}
				<div className="divider w-px bg-[var(--borderColor-default)]" aria-hidden="true" />
				{/* 右侧内容容器 */}
				<Box className='layout-content flex-1 h-[100%]'>
					<Stack>
						<main className='layout-main'><Outlet /></main>
					</Stack>
				</Box>
			</Box>
		</Box>
	);
}

export default Layout;