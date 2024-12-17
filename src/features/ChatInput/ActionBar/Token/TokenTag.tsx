import numeral from 'numeral';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useTokenCount } from '@/hooks/useTokenCount';
import { useChatStore } from '@/store/chat';
import { chatSelectors } from '@/store/chat/selectors';
import { useGlobalStore } from '@/store/global';
import { modelProviderSelectors } from '@/store/global/selectors';
import { useSessionStore } from '@/store/session';
import { agentSelectors } from '@/store/session/selectors';
import { useToolStore } from '@/store/tool';
import { toolSelectors } from '@/store/tool/selectors';
import { createStyles } from 'antd-style';
import { imageUrl } from '@/const/url';
import Image from 'next/image';

const useStyles = createStyles(({ css }) => ({
  pic: css`
    width: 20px;
    height: 20px;
    margin-right: 10px;
  `,  
  token_tag: css`
    color:#4865E8;
    font-size: 14px;
    display: flex;
    align-items: center;
    line-height: 20px;
  `,
}));

const format = (number: number) => numeral(number).format('0,0');

const Token = memo(() => {
  const { t } = useTranslation('chat');
  const { styles } = useStyles();

  const [input, messageString] = useChatStore((s) => [
    s.inputMessage,
    chatSelectors.chatsMessageString(s),
  ]);

  const [systemRole, model] = useSessionStore((s) => [
    agentSelectors.currentAgentSystemRole(s),
    agentSelectors.currentAgentModel(s) as string,
  ]);

  const maxTokens = useGlobalStore(modelProviderSelectors.modelMaxToken(model));

  // Tool usage token
  const canUseTool = useGlobalStore(modelProviderSelectors.modelEnabledFunctionCall(model));
  const plugins = useSessionStore(agentSelectors.currentAgentPlugins);
  const toolsString = useToolStore((s) => {
    const pluginSystemRoles = toolSelectors.enabledSystemRoles(plugins)(s);
    const schemaNumber = toolSelectors
      .enabledSchema(plugins)(s)
      .map((i) => JSON.stringify(i))
      .join('');

    return pluginSystemRoles + schemaNumber;
  });
  const toolsToken = useTokenCount(canUseTool ? toolsString : '');

  // Chat usage token
  const inputTokenCount = useTokenCount(input);

  const chatsToken = useTokenCount(messageString) + inputTokenCount;

  // SystemRole token
  const systemRoleToken = useTokenCount(systemRole);

  // Total token
  const totalToken = systemRoleToken + toolsToken + chatsToken;
  return (
    <div className={styles.token_tag}>
      <Image alt={'token_tag'} className={styles.pic} height={20} src={imageUrl('token_tag.png')} width={20} />
      <span style={{ color: '#4865E8' }}>{totalToken}</span>
    </div>
    // <Tooltip
    //   placement={'bottom'}
    //   title={
    //     <Flexbox width={150}>
    //       <Flexbox horizontal justify={'space-between'}>
    //         <span>{t('tokenDetails.systemRole')}</span>
    //         <span>{format(systemRoleToken)}</span>
    //       </Flexbox>
    //       <Flexbox horizontal justify={'space-between'}>
    //         <span>{t('tokenDetails.tools')}</span>
    //         <span>{format(toolsToken)}</span>
    //       </Flexbox>
    //       <Flexbox horizontal justify={'space-between'}>
    //         <span>{t('tokenDetails.chats')}</span>
    //         <span>{format(chatsToken)}</span>
    //       </Flexbox>
    //       <Flexbox horizontal justify={'space-between'}>
    //         <span>{t('tokenDetails.used')}</span>
    //         <span>{format(totalToken)}</span>
    //       </Flexbox>
    //       <Flexbox horizontal justify={'space-between'} style={{ marginTop: 8 }}>
    //         <span>{t('tokenDetails.total')}</span>
    //         <span>{format(maxTokens)}</span>
    //       </Flexbox>
    //       <Flexbox horizontal justify={'space-between'}>
    //         <span>{t('tokenDetails.rest')}</span>
    //         <span>{format(maxTokens - totalToken)}</span>
    //       </Flexbox>
    //     </Flexbox>
    //   }
    // >
    //   <TokenTag
    //     displayMode={'used'}
    //     maxValue={maxTokens}
    //     style={{ marginLeft: 8 }}
    //     text={{
    //       overload: t('tokenTag.overload'),
    //       remained: t('tokenTag.remained'),
    //       used: t('tokenTag.used'),
    //     }}
    //     value={totalToken}
    //   />
    // </Tooltip>
  );
});

export default Token;
