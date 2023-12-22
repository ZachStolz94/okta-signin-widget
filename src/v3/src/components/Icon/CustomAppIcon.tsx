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

import { FunctionComponent, h } from 'preact';

import { IconProps } from '../../types';

export const CustomAppIcon: FunctionComponent<IconProps> = ({ name, description }: IconProps) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={name}
    role="img"
  >
    <title id={name}>{description}</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M 23.97 10.5 L 24.03 10.5 C 24.323 10.5 24.505 10.5 24.663 10.512 C 26.792 10.679 28.485 12.474 28.642 14.732 C 28.654 14.9 28.654 15.093 28.654 15.403 L 28.654 20.778 L 33.5 20.778 L 33.5 33.742 C 33.5 34.267 33.5 34.701 33.473 35.054 C 33.445 35.421 33.384 35.758 33.232 36.075 C 32.996 36.566 32.619 36.965 32.156 37.216 C 31.857 37.377 31.539 37.441 31.193 37.471 C 30.86 37.5 30.452 37.5 29.956 37.5 L 18.044 37.5 C 17.548 37.5 17.14 37.5 16.807 37.471 C 16.461 37.441 16.143 37.377 15.844 37.216 C 15.381 36.965 15.004 36.566 14.768 36.075 C 14.616 35.758 14.555 35.421 14.527 35.054 C 14.5 34.701 14.5 34.267 14.5 33.742 L 14.5 20.778 L 19.346 20.778 L 19.346 15.403 C 19.346 15.093 19.346 14.9 19.358 14.732 C 19.515 12.474 21.208 10.679 23.337 10.512 C 23.495 10.5 23.677 10.5 23.97 10.5 Z M 27.423 15.435 L 27.423 20.778 L 20.577 20.778 L 20.577 15.435 C 20.577 15.083 20.577 14.942 20.585 14.828 C 20.697 13.215 21.907 11.933 23.427 11.814 C 23.535 11.806 23.668 11.805 24 11.805 C 24.332 11.805 24.465 11.806 24.572 11.814 C 26.093 11.933 27.303 13.215 27.415 14.828 C 27.423 14.942 27.423 15.083 27.423 15.435 Z M 15.731 22.083 L 15.731 33.715 C 15.731 34.274 15.731 34.654 15.754 34.948 C 15.776 35.234 15.816 35.38 15.865 35.482 C 15.983 35.728 16.171 35.928 16.403 36.053 C 16.499 36.105 16.637 36.147 16.907 36.17 C 17.184 36.194 17.542 36.195 18.069 36.195 L 29.931 36.195 C 30.458 36.195 30.816 36.194 31.093 36.17 C 31.363 36.147 31.501 36.105 31.597 36.053 C 31.829 35.928 32.017 35.728 32.135 35.482 C 32.184 35.38 32.224 35.234 32.246 34.948 C 32.269 34.654 32.269 34.274 32.269 33.715 L 32.269 22.083 L 15.731 22.083 Z"
      fill="#22307C"
      class="siwFillPrimaryDark"
    />
    <circle
      cx="24"
      cy="29"
      r="2.5"
      stroke="#A7B5EC"
    />
  </svg>
);
