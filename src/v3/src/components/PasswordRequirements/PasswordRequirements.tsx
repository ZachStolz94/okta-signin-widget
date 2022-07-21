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

import {
  Box, List, Text,
} from '@okta/odyssey-react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { loc } from 'okta';
import { h } from 'preact';
import {
  useCallback,
  useEffect,
  useState,
} from 'preact/hooks';

import { useWidgetContext } from '../../contexts';
import {
  PasswordRequirementsElement,
  PasswordRequirementStatus,
  PasswordValidation,
  UISchemaElementComponent,
  Undefinable,
} from '../../types';
import { validatePassword } from '../../util';
import PasswordRequirementItem from './PasswordRequirementItem';
import {
  buildPasswordRequirementListItems,
} from './passwordRequirementsData';

const PasswordRequirements: UISchemaElementComponent<{
  uischema: PasswordRequirementsElement
}> = ({ uischema }) => {
  const { data } = useWidgetContext();
  const {
    id,
    data: passwordRequirements,
    userInfo,
    fieldKey,
    validationDelayMs,
  } = uischema.options as PasswordRequirementsElement['options'];
  const password = get(data, fieldKey);
  const items = buildPasswordRequirementListItems(passwordRequirements);

  const [passwordValidations, setPasswordValidations] = useState<PasswordValidation>({});

  const getPasswordStatus = (
    ruleKey: string,
    passwordValidation: PasswordValidation,
  ): Undefinable<PasswordRequirementStatus> => {
    if (!passwordValidation) {
      return undefined;
    }

    const ruleValue = passwordValidation[ruleKey];
    if (ruleValue) {
      return 'complete';
    }
    if (ruleValue === false) {
      return 'incomplete';
    }
    return 'info';
  };

  const onValidatePassword = (pw: string): void => {
    if (!passwordRequirements) {
      setPasswordValidations({});
      return;
    }

    const validations = validatePassword(pw, userInfo, passwordRequirements);
    if (!Object.keys(validations).length) {
      setPasswordValidations({});
      return;
    }
    setPasswordValidations(validations);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const passwordValidationHandler = useCallback(
    debounce(onValidatePassword, validationDelayMs), [validationDelayMs],
  );

  useEffect(() => {
    passwordValidationHandler((password ?? '') as string);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return items?.length > 0 ? (
    // @ts-ignore OKTA-471233
    <Box data-se="password-authenticator--rules">
      {/* @ts-ignore OKTA-471233 */}
      <Box marginBottom="s">
        <Text as="span">{loc('password.complexity.requirements.header', 'login')}</Text>
      </Box>
      <List
        id={id}
        listType="unordered"
        unstyled
      >
        {items.map(({ ruleKey, label }) => (
          <List.Item key={label}>
            <PasswordRequirementItem
              status={getPasswordStatus(ruleKey, passwordValidations)}
              text={label}
            />
          </List.Item>
        ))}
      </List>
    </Box>
  ) : null;
};

export default PasswordRequirements;
