import { Avatar } from '@lobehub/ui';
import { Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useSessionStore } from '@/store/session';
import { agentSelectors, sessionSelectors } from '@/store/session/selectors';
import { pathString } from '@/utils/url';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  txt: css`
    font-size: 20px;
    font-weight: bold;
    line-height: 40px;
    height: 40px;
  `,
}));

const Main = memo(() => {
  const { t } = useTranslation('chat');
  const { styles } = useStyles();

  const router = useRouter();

  const [init, isInbox, title, description, avatar, backgroundColor] = useSessionStore((s) => [
    sessionSelectors.isSomeSessionActive(s),
    sessionSelectors.isInboxSession(s),
    agentSelectors.currentAgentTitle(s),
    agentSelectors.currentAgentDescription(s),
    agentSelectors.currentAgentAvatar(s),
    agentSelectors.currentAgentBackgroundColor(s),
  ]);

  const displayTitle = isInbox ? t('inbox.title') : title;
  const displayDesc = isInbox ? t('inbox.desc') : description;

  return !init ? (
    <Flexbox horizontal>
      <Skeleton
        active
        avatar={{ shape: 'circle', size: 'default' }}
        paragraph={false}
        title={{ style: { margin: 0, marginTop: 8 }, width: 200 }}
      />
    </Flexbox>
  ) : (
    <Flexbox align={'flex-start'} gap={12} horizontal>
      <Avatar
        avatar={avatar}
        background={backgroundColor}
        onClick={() =>
          isInbox
            ? router.push('/settings/agent')
            : router.push(pathString('/chat/settings', { search: location.search }))
        }
        size={40}
        title={title}
      />
      {/* <ChatHeaderTitle desc={displayDesc} tag={<Tags />} title={displayTitle} /> */}
      <div className={styles.txt}>{displayTitle}</div>
    </Flexbox>
  );
});

export default Main;
