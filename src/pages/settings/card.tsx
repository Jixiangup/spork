import {Box, Stack} from "@primer/react-brand";
import {Heading, Label} from "@primer/react";
import {FC, PropsWithChildren, ReactNode} from "react";

type SettingsCardProps = {
  className?: string;
  icon?: ReactNode;
  title: string;
  enableTitleBorder?: boolean;
  enableDescriptionBorder?: boolean;
  muted?: boolean;
  active?: boolean;
} & PropsWithChildren;

const SettingsCard: FC<SettingsCardProps> = ({
                                               className,
                                               icon,
                                               title,
                                               enableTitleBorder,
                                               enableDescriptionBorder,
                                               muted,
                                               active,
                                               children
                                             }) => {
  return (
    <Box className={`w-full h-1/12 ${className}`}>
      {
        enableTitleBorder ? (
          <div
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: active ? `var(--borderColor-accent-${muted ? 'muted' : 'inset'})` : `var(--borderColor-${muted ? 'muted' : 'inset'})`,
              backgroundColor: active ? `var(--bgColor-accent-${muted ? 'muted' : 'inset'})` : `var(--bgColor-${muted ? 'muted' : 'inset'})`,
            }}
            className={`rounded-[var(--borderRadius-default)]`
            }
          >
            <Stack direction='horizontal' alignItems='center' justifyContent={'space-between'} gap={4}>
              <Stack direction='horizontal' alignItems='center' gap={4} padding={'none'}>
                {icon ? icon : <></>}<Heading as='h2'>{title}</Heading>
              </Stack>
              {active ? <Label variant="accent">&nbsp;&nbsp;Active&nbsp;&nbsp;</Label> : <></>}
            </Stack>
          </div>
        ) : <div style={{marginBottom: 'var(--stack-gap-normal)'}}><Heading as='h2'>{title}</Heading></div>
      }
      {
        enableDescriptionBorder ?
          (
            <div
              className='border border-solid border-[var(--borderColor-default)] rounded-[var(--borderRadius-default)]'
              style={{
                borderTopWidth: 0,
                borderColor: active ? `var(--borderColor-accent-${muted ? 'muted' : 'inset'})` : `var(--borderColor-default)`,
              }}
            >
              <Stack>
                {children}
              </Stack>
            </div>
          ) :
          <div className='border-0 border-t border-solid border-[var(--borderColor-default)]'
               style={{paddingTop: 'var(--stack-gap-normal)'}}>
            {children}
          </div>
      }
    </Box>
  );
}

export default SettingsCard;