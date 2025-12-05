import { Box } from '@primer/react-brand';
import SettingsCard from '@/pages/settings/card.tsx';
import { useTranslation } from 'react-i18next';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { getName } from '@tauri-apps/api/app';
import { Stack } from '@primer/react/experimental';
import { FormControl, Select, Text } from '@primer/react';
import { ThemeMod, type ThemeMode } from '@/theme';
import { defaultSettings, Settings } from '@/stores/core.ts';
import { Api } from '@/api';
import { MoonIcon, SunIcon } from '@primer/octicons-react';

const Theme = () => {

	const [appName, setAppName] = useState<string>('Spork');
	const [settings, setSettings] = useState<Settings>(defaultSettings);

	const { t } = useTranslation('settings');

	const themeModes: ThemeMode[] = ['sync', 'single'];
	const syncThemeMods: ThemeMod[] = ['light', 'dark'];

	const renderThemeModeOptions = (mode: ThemeMode): ReactNode => {
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
								headerAs='h3'
								headerVariant='small'
								icon={mod === 'light' ? <SunIcon /> : <MoonIcon />}
								className='w-[50%]'
								header={t(`theme_mod_${mod}`)}
								headerBorder
								contentBorder
								headerClassName='p-[var(--stack-padding-normal)]'
								enableHeaderBackground
								active={'dark' === mod}
							>
								<div className='p-[var(--stack-padding-normal)]'>
									内容
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
				<FormControl>
					<Stack padding={'none'} className={'w-full'}>
						<FormControl.Label>{t('theme_mode_label')}</FormControl.Label>
						<div>
							<Select
								name='theme_mode'
								value={settings.theme.mode}
								onChange={async (e) => {
									const newMode = e.target.value as ThemeMode;
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
						{renderThemeModeOptions(settings.theme.mode)}
					</Stack>
				</FormControl>
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