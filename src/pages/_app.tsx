import { Button, NavList, PageLayout, Stack, Text } from '@primer/react'
import { AppsIcon, GearIcon, HomeIcon, InfoIcon, ThreeBarsIcon } from '@primer/octicons-react';
import { Link, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useNavigate, type Path } from '@/router';

import '../styles/_app.scss';

type NavItem = {
	label: string;
	icon: React.ReactNode;
	path?: Path;
}

export default function Layout() {

	const { t } = useTranslation();
	const navigate = useNavigate();

	const navs: NavItem[] = [
		{ label: t('home_label'), icon: <HomeIcon />, path: '/' },
		{ label: t('app_label'), icon: <AppsIcon />, path: '/apps' },
	];

	return (
		<PageLayout containerWidth='full' className='app-layout h-full' padding='none' rowGap='none' columnGap='none'>
			<PageLayout.Header divider="line" padding='none'>
				<div className="header">
					<Stack direction="horizontal" align={'center'} justify={'center'} gap={'none'} padding={'none'}>
						<Button className='w-[var(--base-size-32)] h-[var(--base-size-32)]' variant='invisible' aria-label="Menu">
							<Text size='large'><ThreeBarsIcon /></Text>
						</Button>
						<Link reloadDocument to={'/'} className='text-[var(--fgColor-default)] hover:no-underline'>
							<Text size='large' weight='semibold'>Header</Text>
						</Link>
					</Stack>
				</div>
			</PageLayout.Header>

			<PageLayout.Pane position="start" divider="line" padding='none' sticky >
				<div className="sidebar">
					<div className='sidebar-nav sidebar-item'>
						<NavList>
							{
								navs.map((nav) => (
									<Link key={nav.label} to={nav.path ?? '#'} className='sidebar-link'>
										<NavList.Item
											key={nav.label}
											aria-current={window.location.pathname === (nav.path ?? '#') ? 'page' : undefined}
										>
											<NavList.LeadingVisual>{nav.icon}</NavList.LeadingVisual>
											{nav.label}
										</NavList.Item>
									</Link>
								))
							}
						</NavList>
					</div>
					<div className='sidebar-settings'>
						<Button block leadingVisual={InfoIcon} onClick={() => navigate('/about', { replace: true })} variant='invisible' alignContent='start'>{t('about_label')}</Button>
						<Button block leadingVisual={GearIcon} onClick={() => navigate('/settings/general/language-and-region', { replace: true })} variant='invisible' alignContent='start'>{t('settings_label')}</Button>
					</div>
				</div>
			</PageLayout.Pane>

			<PageLayout.Content padding='none'>
				<Outlet />
			</PageLayout.Content>

			<PageLayout.Footer divider="line" padding='none' hidden>
				<div className="footer">
					Footer
				</div>
			</PageLayout.Footer>
		</PageLayout>

	)
}
