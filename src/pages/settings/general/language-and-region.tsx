import { FC, useCallback, useEffect, useRef, useState } from "react";
import SettingsCard from "@/pages/settings/card";
import { useTranslation } from "react-i18next";
import { Button, FormControl, Select } from "@primer/react";
import { type SupportedLanguages } from "@/i18n.ts";
import { defaultSettings, type Settings } from "@/stores/core.ts";
import { Api } from "@/api";
import { Stack } from '@primer/react/experimental'

type LanguageOption = {
	code: SupportedLanguages;
	label: string;
}

const LanguageAndRegion: FC = () => {
	const [settings, setSettings] = useState<Settings>(defaultSettings());
	const languageSettingsFormRef = useRef<HTMLFormElement>(null);
	const [isSaveLanguage, setSaveLanguage] = useState<boolean>(false);
	const { i18n } = useTranslation();

	const languageOptions: LanguageOption[] = [
		{ code: 'en-US', label: 'English' },
		{ code: 'zh-Hans', label: '简体中文' },
	];

	const fetchSettings = useCallback(async () => {
		try {
			let settings = await Api.getSettingsApi().settings();
			console.log('Fetched settings', settings);
			setSettings(settings);
		} catch (e) {
			console.error('Failed to fetch settings:', e);
		}
	}, []);

	useEffect(() => {
		fetchSettings().then();
	}, [fetchSettings]);

	const { t } = useTranslation('settings');
	return (
		<div>
			<SettingsCard header={t('language_label')}>
				<form
					ref={languageSettingsFormRef}
					onSubmit={async (event) => {
						event.preventDefault();
						setSaveLanguage(true);
						if (!languageSettingsFormRef.current) {
							setSaveLanguage(false);
							return
						}
						const fd = new FormData(languageSettingsFormRef.current);
						const data = Object.fromEntries(fd.entries());
						const language = (data.language ?? settings.general.language) as SupportedLanguages;
						await i18n.changeLanguage(language);
						const next = { ...settings, general: { ...settings.general, language } };
						try {
							await Api.getSettingsApi().updateSettings(next);
						} catch (e) {
							console.error('Failed to save language settings:', e);
						}
						setSettings(next);
						setSaveLanguage(false);
					}}>
					<Stack padding='none'>
						<FormControl>
							<FormControl.Label>{t('language_setting_description')}</FormControl.Label>
							<Stack padding='none'>
								<Select
									name='language'
									value={settings.general.language}
									onChange={(e) => {
										const language = e.target.value as SupportedLanguages
										setSettings(prev => ({ ...prev, general: { ...prev.general, language } }))
									}}
								>
									{languageOptions.map((option) => (
										<Select.Option key={option.code} value={option.code}>
											{option.label}
										</Select.Option>
									))}
								</Select>
							</Stack>
						</FormControl>
						<Button loading={isSaveLanguage} variant='primary' type='submit'>{t('save_language_button')}</Button>
					</Stack>
				</form>
			</SettingsCard>
		</div>
	)
}

export default LanguageAndRegion;