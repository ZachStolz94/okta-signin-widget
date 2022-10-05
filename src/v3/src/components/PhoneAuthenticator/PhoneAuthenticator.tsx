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
  Box,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { IdxMessage } from '@okta/okta-auth-js';
import { h } from 'preact';
import {
  useCallback,
  useEffect,
  useState,
} from 'preact/hooks';

import CountryUtil from '../../../../util/CountryUtil';
import { useWidgetContext } from '../../contexts';
import { useAutoFocus, useOnChange } from '../../hooks';
import {
  ChangeEvent,
  FormBag,
  UISchemaElementComponent,
  UISchemaElementComponentWithValidationProps,
} from '../../types';
import { getTranslation } from '../../util';
import { withFormValidationState } from '../hocs';

const PhoneAuthenticator: UISchemaElementComponent<UISchemaElementComponentWithValidationProps> = ({
  uischema,
  setTouched,
  error,
  setError,
  onValidateHandler,
}) => {
  const { data, dataSchemaRef } = useWidgetContext();
  const {
    translations = [],
    focus,
    options: {
      inputMeta: {
        name: fieldName,
        required,
        // @ts-ignore expose type from auth-js
        messages = {},
      },
      attributes,
    },
  } = uischema;
  const mainLabel = getTranslation(translations!, 'label');
  const extensionLabel = getTranslation(translations!, 'extension');
  const countryLabel = getTranslation(translations!, 'country');

  const countries = CountryUtil.getCountries() as Record<string, string>;
  const [phone, setPhone] = useState<string>('');
  // Sets US as default code
  const [phoneCode, setPhoneCode] = useState(`+${CountryUtil.getCallingCodeForCountry('US')}`);
  const [extension, setExtension] = useState<string>('');
  const [phoneChanged, setPhoneChanged] = useState<boolean>(false);
  const methodType = data['authenticator.methodType'];
  const showExtension = methodType === 'voice';
  const onChangeHandler = useOnChange(uischema);
  const focusRef = useAutoFocus<HTMLSelectElement>(focus);

  const formatPhone = (
    phoneNumber: string,
    code: string,
    ext: string,
  ): string => {
    if (showExtension && ext.trim()) {
      return `${code}${phoneNumber}x${ext}`;
    }
    return `${code}${phone}`;
  };

  const validate = useCallback((dataBag: FormBag['data']) => {
    const fullPhoneNumber = dataBag[fieldName];
    const errorMessage: IdxMessage = {
      class: 'ERROR',
      message: '',
      i18n: { key: 'model.validation.field.blank' },
    };
    const isValid = !!fullPhoneNumber && !!phone;
    return isValid ? undefined : [errorMessage];
  }, [phone, fieldName]);

  useEffect(() => {
    dataSchemaRef.current![fieldName].validate = validate;
  }, [dataSchemaRef, fieldName, messages.value, validate]);

  useEffect(() => {
    const formattedPhone = formatPhone(phone, phoneCode, extension);
    onChangeHandler(formattedPhone);
    onValidateHandler?.(setError, formattedPhone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneCode, phone, extension, showExtension]);

  useEffect(() => {
    if (phoneChanged) {
      setTouched?.(true);
    }
  }, [phoneChanged, setTouched]);

  const renderExtension = () => (
    showExtension && (
      <Box width={0.25}>
        <InputLabel htmlFor="phoneExtension">{extensionLabel}</InputLabel>
        <OutlinedInput
          value={extension}
          type="text"
          name="extension"
          id="phoneExtension"
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setExtension(e.currentTarget.value);
          }}
          inputProps={{
            'data-se': 'extension',
            autocomplete: 'tel-extension',
          }}
        />
      </Box>
    )
  );

  const renderCountrySelect = () => (
    <Box marginBottom={4}>
      <InputLabel
        id="countryLabel"
        required
        htmlFor="countryList"
      >
        {countryLabel}
      </InputLabel>
      <Select
        id="countryList"
        labelId="countryLabel"
        native
        onChange={(e: SelectChangeEvent<string>) => {
          const selectTarget = (
            e?.target as SelectChangeEvent['target'] & { value: string; name: string; }
          );
          setPhoneCode(`+${CountryUtil.getCallingCodeForCountry(selectTarget.value)}`);
        }}
        inputRef={focusRef}
        inputProps={{
          'data-se': 'countryList',
          autocomplete: 'tel-country-code',
        }}
      >
        {
          Object.entries(countries).map(([code, name]) => (
            <option
              key={code}
              value={code}
              // Sets US as default code
              selected={code === 'US'}
            >
              {name}
            </option>
          ))
        }
      </Select>
    </Box>
  );

  return (
    <Box>
      { renderCountrySelect() }
      <Box
        display="flex"
        flexWrap="wrap"
      >
        <Box
          width={showExtension ? 0.7 : 1}
          marginRight={showExtension ? 2 : 0}
        >
          <InputLabel
            htmlFor={fieldName}
            required={required}
          >
            {mainLabel}
          </InputLabel>
          <OutlinedInput
            type="tel"
            name={fieldName}
            id={fieldName}
            error={error !== undefined}
            onBlur={() => {
              setTouched?.(true);
              onValidateHandler?.(setError);
            }}
            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              // Set new phone value without phone code
              setPhone(e.currentTarget.value);
              setPhoneChanged(true);
            }}
            startAdornment={(
              <InputAdornment
                component="span"
                position="start"
              >
                {phoneCode}
              </InputAdornment>
            )}
            fullWidth
            inputProps={{
              'data-se': fieldName,
              'aria-describedby': error && `${fieldName}-error`,
              ...attributes,
            }}
          />
          {!!error && (
            <FormHelperText
              id={`${fieldName}-error`}
              role="alert"
              data-se={`${fieldName}-error`}
              error
            >
              {error}
            </FormHelperText>
          )}
        </Box>
        { renderExtension() }
      </Box>
    </Box>
  );
};

export default withFormValidationState(PhoneAuthenticator);
