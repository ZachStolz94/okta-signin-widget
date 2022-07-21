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

import { Box } from '@okta/odyssey-react';
import { withTheme } from '@okta/odyssey-react-theme';
import { h } from 'preact';

import { useWidgetContext } from '../../contexts';
import { useOnSubmit } from '../../hooks';
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
      idxMethodParams,
      description,
      ctaLabel,
      dataSe,
    },
  } = uischema;
  const { idxTransaction } = useWidgetContext();
  const onSubmitHandler = useOnSubmit();

  const onClick: ClickHandler = async () => {
    const { name: step } = idxTransaction!.nextStep!;
    onSubmitHandler({
      params: idxMethodParams,
      includeData: true,
      step,
    });
  };

  return (
    // @ts-ignore OKTA-471233
    <Box
      display="flex"
      padding="s"
      hoverBorderColor="primary"
      borderColor="display"
      borderRadius="base"
      boxShadow="default"
      className={style.authButton}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
    >
      { authenticationKey && <AuthCoin authenticatorKey={authenticationKey} /> }
      {/* @ts-ignore OKTA-471233 */}
      <Box className={style.infoSection}>
        {/* @ts-ignore OKTA-471233 */}
        <Box className={style.title}>
          {label}
        </Box>
        {description && (
          // @ts-ignore OKTA-471233
          <Box className={style.description}>
            {description}
          </Box>
        )}
        {/* @ts-ignore OKTA-471233 */}
        <Box
          className={style.actionName}
          data-se={dataSe}
        >
          {ctaLabel}
          <ArrowRight />
        </Box>
      </Box>
    </Box>
  );
};
export default withTheme(theme, style)(AuthenticatorButton);
