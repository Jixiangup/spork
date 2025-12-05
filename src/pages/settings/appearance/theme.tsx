import { Box } from '@primer/react-brand';
import SettingsCard from '@/pages/settings/card.tsx';
import { useTranslation } from 'react-i18next';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { getName } from '@tauri-apps/api/app';
import { Stack } from '@primer/react/experimental';
import { FormControl, Select, Text, useTheme } from '@primer/react';
import { defaultSettings, Settings, ThemeMode } from '@/stores/core.ts';
import { Api } from '@/api';
import { MoonIcon, SunIcon } from '@primer/octicons-react';

type ThemeModeOption = 'sync' | 'single';

const Theme = () => {

	const [appName, setAppName] = useState<string>('Spork');
	const [settings, setSettings] = useState<Settings>(defaultSettings());
	const { setColorMode, setDayScheme, setNightScheme, colorScheme } = useTheme();

	const { t } = useTranslation('settings');

	const themeModes: ThemeModeOption[] = ['sync', 'single'];
	const syncThemeMods = ['light', 'dark'];

	const getModeFromScheme = (): 'dark' | 'light' => {
		if (colorScheme?.startsWith('light')) {
			return 'light';
		} else {
			return 'dark';
		}
	}

	const renderThemeModeOptions = (mode: ThemeModeOption): ReactNode => {
		if (mode === 'sync') {
			return renderSyncThemeModeOptions();
		}
		return renderSingleThemeModeOptions();
	}

	const renderSingleThemeModeOptions = (): ReactNode => {
		return (
			<>Single Mode Options</>
		)
	}

	const renderSyncThemeModeOptions = (): ReactNode => {
		return (
			<Stack direction='horizontal'>
				{
					syncThemeMods.map((mod) => {
						return (
							<SettingsCard
								key={mod}
								headerAs='h3'
								headerVariant='small'
								icon={mod === 'light' ? <SunIcon /> : <MoonIcon />}
								className='w-[50%]'
								header={t(`theme_mod_${mod}`)}
								headerBorder
								contentBorder
								headerClassName='p-[var(--stack-padding-normal)]'
								enableHeaderBackground
								active={getModeFromScheme() === mod}
							>
								<div className='p-[var(--stack-padding-normal)]'>
									<Text>{t(`sync_${mod}_describe`, { appName })}</Text>
								</div>
							</SettingsCard>
						);
					})
				}
			</Stack>
		);
	}

	const fetchAppName = useCallback(async () => {
		try {
			const name = await getName();
			setAppName(name);
		} catch (e) {
			console.error('Failed to fetch app name:', e);
		}
	}, []);

	const fetchAppSettings = useCallback(async () => {
		try {
			const fetchedSettings = await Api.getSettingsApi().settings();
			setSettings(fetchedSettings);
		} catch (e) {
			console.error('Failed to fetch settings:', e);
		}
	}, []);

	useEffect(() => {
		fetchAppName().then();
	}, [fetchAppName]);

	useEffect(() => {
		fetchAppSettings().then();
	}, [fetchAppSettings]);

	const renderThemeMode = (): ReactNode => {
		return (
			<Stack>
				<Stack padding={'none'} className={'w-full'}>
					<FormControl>
						<FormControl.Label htmlFor='theme_mode'>{t('theme_mode_label')}</FormControl.Label>
						<div>
							<Select
								name='theme_mode'
								value={settings.theme.mode === 'auto' ? 'sync' : 'single'}
								onChange={async (e) => {
									const newMode = (e.target.value === 'sync' ? 'auto' : 'day') as ThemeMode;
									const newSettings = {
										...settings,
										theme: {
											...settings.theme,
											mode: newMode,
										},
									};
									try {
										await Api.getSettingsApi().updateSettings(newSettings);
									} catch (e) {
										console.error('Failed to update theme mode:', e);
										return;
									}
									setSettings(newSettings);
									console.log('Theme mode updated to:', newSettings);
									if (e.target.value === 'single') {
										setColorMode('dark');
										document.documentElement.setAttribute('data-color-mode', 'dark');
									} else {
										setColorMode(newSettings.theme.mode);
										document.documentElement.setAttribute('data-color-mode', newSettings.theme.mode);
									}
								}}
							>
								{
									themeModes.map((mode) => (
										<Select.Option key={mode} value={mode}>
											{t(`theme_mode_${mode}_label`)}
										</Select.Option>
									))
								}
							</Select>
						</div>
						{renderThemeModeOptions(settings.theme.mode === 'auto' ? 'sync' : 'single')}
					</FormControl>
				</Stack>
			</Stack>
		)
	}

	return (
		<Box>
			<SettingsCard header={t('theme_title')}>
				<Stack padding={'none'}>
					<Text>
						{t('theme_description', { appName })}
					</Text>
					{renderThemeMode()}
				</Stack>
			</SettingsCard>
		</Box >
	);
}

export default Theme;