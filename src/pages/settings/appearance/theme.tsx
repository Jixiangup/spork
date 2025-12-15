import SettingsCard from '@/pages/settings/_components/Card';
import { useTranslation } from 'react-i18next';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { getName } from '@tauri-apps/api/app';
import { Stack } from '@primer/react/experimental';
import { FormControl, Select, Text, useTheme } from '@primer/react';
import { defaultSettings, Settings, ThemeMode, ThemeScheme } from '@/stores/core.ts';
import { Api } from '@/api';
import { MoonIcon, SunIcon } from '@primer/octicons-react';
import SchemeRadio from '@/pages/settings/_components/SchemeRadio';

type ThemeModeOption = 'sync' | 'single';

const Theme = () => {

	const [appName, setAppName] = useState<string>('Spork');
	const [settings, setSettings] = useState<Settings>(defaultSettings());
	const { setColorMode, colorScheme } = useTheme();
	const [availableSchemes, setAvailableSchemes] = useState<ThemeScheme[]>([]);

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
			<Stack className='w-full' wrap={'wrap'} direction='horizontal'>
				{
					availableSchemes.map((scheme) => {
						return (
							<SchemeRadio
								className='w-[33.33%] box-border flex-shrink-0 mr-[var(--base-size-8)]'
								key={scheme}
								checked={scheme === settings.theme.scheme}
								label={scheme}
								value={scheme}
								name="use_scheme"
							/>
						)
					})
				}
			</Stack>
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

	const fetchAvailableSchemes = useCallback(async () => {
		try {
			const schemes = await Api.getSettingsApi().schemes();
			setAvailableSchemes(schemes);
		} catch (e) {
			console.error('Failed to fetch available schemes:', e);
		}
	}, []);

	useEffect(() => {
		fetchAvailableSchemes().then();
	}, [fetchAvailableSchemes]);

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
		<div>
			<SettingsCard header={t('theme_title')}>
				<Stack padding={'none'}>
					<Text>
						{t('theme_description', { appName })}
					</Text>
					{renderThemeMode()}
				</Stack>
			</SettingsCard>
		</div >
	);
}

export default Theme;