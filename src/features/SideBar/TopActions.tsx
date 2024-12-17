import { ActionIcon } from '@lobehub/ui';
import { BookOpenCheck, MessageSquare,Bot,Settings } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { GlobalStore, useGlobalStore } from '@/store/global';
import { SidebarTabKey } from '@/store/global/initialState';
import { useSessionStore } from '@/store/session';

export interface TopActionProps {
  tab?: GlobalStore['sidebarKey'];
}

const TopActions = memo<TopActionProps>(({ tab }) => {
  const { t } = useTranslation('common');
  const switchBackToChat = useGlobalStore((s) => s.switchBackToChat);

  return (
    <>
      <Link
        aria-label={t('tab.chat')}
        href={'/chat'}
        onClick={(e) => {
          e.preventDefault();
          switchBackToChat(useSessionStore.getState().activeId);
        }}
      >
        <ActionIcon
          active={tab === SidebarTabKey.Chat}
          icon={MessageSquare}
          placement={'right'}
          size="large"
          title={t('tab.chat')}
        />
        {/* <span>AI对话</span> */}
      </Link>
      <Link aria-label={t('tab.market')} href={'/market'}>
        <ActionIcon
          active={tab === SidebarTabKey.Market}
          icon={Bot}
          placement={'right'}
          size="large"
          title={t('tab.market')}
        />
        {/* <span>助手</span> */}
      </Link>
      <Link aria-label={t('tab.market')} href={'/market'}>
        <ActionIcon
          active={tab === SidebarTabKey.Market}
          icon={BookOpenCheck}
          placement={'right'}
          size="large"
          title={t('tab.market')}
        />
        {/* <span>知识库</span> */}
      </Link>
      <Link aria-label={t('tab.market')} href={'/market'}>
        <ActionIcon
          active={tab === SidebarTabKey.Market}
          icon={Settings}
          placement={'right'}
          size="large"
          title={t('tab.market')}
        />
        {/* <span>设置</span> */}
      </Link>
    </>
  );
});

export default TopActions;
