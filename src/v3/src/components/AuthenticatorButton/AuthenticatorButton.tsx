/*
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Box } from '@mui/material';
import * as Tokens from '@okta/odyssey-design-tokens';
import { withTheme } from '@okta/odyssey-react-theme';
import { h } from 'preact';

import { useWidgetContext } from '../../contexts';
import { useOnSubmit } from '../../hooks';
import { useTranslation } from '../../lib/okta-i18n';
import {
  AuthenticatorButtonElement,
  ClickHandler,
  UISchemaElementComponent,
} from '../../types';
import AuthCoin from '../AuthCoin/AuthCoin';
import ArrowRight from './arrow-right.svg';
import { theme } from './AuthenticatorButton.theme';
import style from './styles.module.css';

const AuthenticatorButton: UISchemaElementComponent<{
  uischema: AuthenticatorButtonElement
}> = ({ uischema }) => {
  const {
    label,
    options: {
      key: authenticationKey,
      actionParams,
      description,
      descriptionParams: descrParams,
      ctaLabel,
      dataSe,
    },
  } = uischema;
  const { t } = useTranslation();
  const { idxTransaction } = useWidgetContext();
  const onSubmitHandler = useOnSubmit();
  const descriptionParams = descrParams?.map((param: string) => t(param));

  const onClick: ClickHandler = async () => {
    const { name: step } = idxTransaction!.nextStep!;
    onSubmitHandler({
      params: actionParams,
      includeData: true,
      step,
    });
  };

  return (
    <Box
      display="flex"
      padding={2}
      border={1}
      borderColor="grey.200"
      borderRadius={Tokens.BorderRadiusBase}
      boxShadow={Tokens.ShadowScale0}
      className={style.authButton}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
    >
      { authenticationKey && <AuthCoin authenticatorKey={authenticationKey} /> }
      <Box className={style.infoSection}>
        <Box className={style.title}>
          {label}
        </Box>
        {description && (
          <Box className={style.description}>
            {t(description, descriptionParams)}
          </Box>
        )}
        <Box
          className={style.actionName}
          data-se={dataSe}
        >
          {t(ctaLabel)}
          <ArrowRight />
        </Box>
      </Box>
    </Box>
  );
};
export default withTheme(theme, style)(AuthenticatorButton);
