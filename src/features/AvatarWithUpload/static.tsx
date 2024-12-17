import { createStyles } from 'antd-style';
import Avatar from 'next/image';
import { CSSProperties, memo } from 'react';

import { imageUrl } from '@/const/url';
import { useGlobalStore } from '@/store/global';
import { commonSelectors } from '@/store/global/selectors';

const useStyle = createStyles(
  ({ css, token }) => css`
    cursor: pointer;
    overflow: hidden;
    border-radius: 50%;
    transition:
      scale 400ms ${token.motionEaseOut},
      box-shadow 100ms ${token.motionEaseOut};

    &:active {
      scale: 0.8;
    }
  `,
);

interface AvatarWithUploadProps {
  compressSize?: number;
  id?: string;
  size?: number;
  style?: CSSProperties;
}

const AvatarWithUpload = memo<AvatarWithUploadProps>(
  ({ size = 60, style, id }) => {
    const { styles } = useStyle();
    const [avatar] = useGlobalStore((s) => [
      commonSelectors.userAvatar(s),
      s.updateAvatar,
    ]);

    return (
      <div className={styles} id={id} style={{ maxHeight: size, maxWidth: size, ...style }}>
          <Avatar
            alt={avatar ? 'userAvatar' : 'LobeChat'}
            height={size}
            src={imageUrl('blue_logo.png')}
            width={size}
          />
      </div>
    );
  },
);

export default AvatarWithUpload;
