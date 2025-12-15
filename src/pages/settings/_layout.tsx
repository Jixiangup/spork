import { Heading, NavList, Stack, Text } from "@primer/react";
import { useTranslation } from "react-i18next";
import { FC, ReactNode } from "react";
import { type Path } from "@/router.ts";
import { Outlet, useLocation } from "react-router";
import { GlobeIcon, PaintbrushIcon } from "@primer/octicons-react";

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

	const { t } = useTranslation('settings');
	const { pathname } = useLocation();

	const navGroups: NavGroupProps[] = [
		{
			title: 'general_group_title',
			items: [
				{ label: t('language_and_region_title'), href: '/settings/general/language-and-region', icon: <GlobeIcon /> },
			],
		},
		{
			title: 'appearance_group_title',
			items: [
				{ label: t('theme_title'), href: '/settings/appearance/theme', icon: <PaintbrushIcon /> },
			],
		},
	];

	return (
		<div className='flex justify-center'>
			<Stack className='w-[95%]'>
				<div>
					<Heading as="h1">{t('header_title')}</Heading>
					<Text>{t('header_describe')}</Text>
				</div>
				<div>
					<div className='flex'>
						<div className='flex w-full'>
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
								<Outlet />
							</Stack>
						</div>
					</div>
				</div>
			</Stack>
		</div>
	);
}

export default SettingsLayout;