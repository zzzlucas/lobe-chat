import { SideNav } from '@lobehub/ui';
import { memo } from 'react';

import AvatarWithUpload from '@/features/AvatarWithUpload';
import AvatarWithUploadStatic from '@/features/AvatarWithUpload/static';
import { SidebarTabKey } from '@/store/global/initialState';

import TopActions from './TopActions';

interface Props {
  sidebarKey?: SidebarTabKey;
}

export default memo<Props>(({ sidebarKey }) => {
  return (
    <SideNav
      avatar={<AvatarWithUploadStatic />}
      bottomActions={<AvatarWithUpload id={'avatar'} />}
      style={{ height: '100%' }}
      topActions={<TopActions tab={sidebarKey} />}
    />
  );
});
