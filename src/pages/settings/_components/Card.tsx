import { Heading, Label } from '@primer/react';
import { FC, type PropsWithChildren, ReactNode } from 'react';
import './Card.scss';
import { useTranslation } from 'react-i18next';

type CardsProps = {
	icon?: ReactNode;
	header: string;
	headerClassName?: string;
	enableHeaderBackground?: boolean;
	active?: boolean;
	headerAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	headerVariant?: 'large' | 'medium' | 'small';
	headerBorder?: boolean;
	contentBorder?: boolean;
	className?: string;
} & PropsWithChildren;

export const SettingsCard: FC<CardsProps> = ({
	icon,
	header,
	headerClassName = '',
	enableHeaderBackground = false,
	active = false,
	children,
	headerAs = 'h2',
	headerBorder = false,
	contentBorder = false,
	className = '',
	headerVariant = 'medium',
}) => {

	const { t } = useTranslation();

	const headerClasses = [
		'settings-card__header',
		headerClassName,
		headerBorder ? 'settings-card__header--full-border' : 'settings-card__header--bottom-border',
		contentBorder ? 'settings-card__header--clip-bottom-radius' : '',
	].join(' ');

	const contentClasses = [
		'settings-card__content',
		contentBorder ? 'settings-card__content--border' : 'settings-card__content--no-border',
		headerBorder ? 'settings-card__content--clip-top-radius' : '',
	].join(' ');

	const headerBgClass = () => {
		if (enableHeaderBackground) {
			return 'bg-[var(--bgColor-inset)]';
		}
		return '';
	};

	return (
		<div className={`settings-card ${active ? 'settings-card--active' : ''} ${className}`}>
			<div className={`${active ? 'header-active' : ''} ${headerClasses} ${headerBgClass()}`}>
				{/* 合并为一个容器：左侧图标+标题，右侧可选 Active 标签 */}
				<div className="settings-card__header-main">
					{icon && <span className="settings-card__icon">{icon}</span>}
					<Heading as={headerAs} variant={headerVariant} className="settings-card__title">
						{header}
					</Heading>
				</div>

				{active && (
					<Label variant='accent'>
						{t('active')}
					</Label>
				)}
			</div>

			<div className={contentClasses}>{children}</div>
		</div>
	);
};

export default SettingsCard;