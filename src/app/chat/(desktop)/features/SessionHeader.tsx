import { ActionIcon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { MessageSquarePlus } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { DESKTOP_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import { useSessionStore } from '@/store/session';

import { Button } from 'antd';

export const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    fill: ${token.colorText};
  `,
  top: css`
    position: sticky;
    top: 0;
  `,
}));

const Header = memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation('chat');
  const [createSession] = useSessionStore((s) => [s.createSession]);

  return (
    <Flexbox className={styles.top} gap={16} padding={16}>
      <Flexbox distribution={'space-between'} horizontal>
        {/* <Logo className={styles.logo} size={36} type={'text'} /> */}
        <Button>
          <ActionIcon
            icon={MessageSquarePlus}
            onClick={() => createSession()}
            size={DESKTOP_HEADER_ICON_SIZE}
            style={{ flex: 'none' }}
            title={t('newAgent')}
          />
            从助手创建
        </Button>
        <Button>
          <ActionIcon
            icon={MessageSquarePlus}
            onClick={() => createSession()}
            size={DESKTOP_HEADER_ICON_SIZE}
            style={{ flex: 'none' }}
            title={t('newAgent')}
          />
            创建对话
        </Button>
      </Flexbox>
    </Flexbox>
  );
});

export default Header;
