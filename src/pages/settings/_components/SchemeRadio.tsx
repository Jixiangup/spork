import { FormControl, Radio, Stack } from "@primer/react";
import { FC } from "react";

import './SchemeRadio.scss';

type SchemeRadioProps = {
	label?: string;
	value: string;
	disabled?: boolean;
	name?: string;
	checked?: boolean;
	className?: string;
};

const SchemeRadio: FC<SchemeRadioProps> = ({
	label,
	value,
	disabled = false,
	name = '',
	checked = false,
	className,
}) => {
	return (
		<div className={`${checked ? 'scheme-radio-checked' : ''} ${className ? className : ''} scheme-radio-container`}>
			<Stack className='scheme-radio-content' padding='condensed'>
				内容
			</Stack>
			<FormControl className='scheme-radio-form-control flex items-center p-[var(--stack-padding-condensed,.5rem)]'>
				<FormControl.Label htmlFor={name}>{label}</FormControl.Label>
				<Radio value={value} disabled={disabled} name={name} checked={checked} />
			</FormControl>
		</div>

	)
};

export default SchemeRadio;