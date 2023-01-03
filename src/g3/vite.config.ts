/*
 * Copyright (c) 2022-present, Okta, Inc. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant
 * to the Apache License, Version 2.0 (the "License.")
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
  ],
  define: {
    // VERSION: '"0.0.0"',
    // COMMITHASH: '"67f7d01358bee1853391565b300f196dc5291ce2"',
    DEBUG: true,
  },
  resolve: {
    alias: {
      '@okta/mocks': resolve(__dirname, '../../playground/mocks'),
      config: resolve(__dirname, '../config'),
      nls: resolve(__dirname, '../../packages/@okta/i18n/src/json'),
      okta: resolve(__dirname, '../../packages/@okta/courage-dist'),
      'okta-i18n-bundles': resolve(__dirname, '../util/Bundles.ts'),
      qtip: resolve(__dirname, '../../packages/@okta/qtip2/dist/jquery.qtip.js'),
      react: resolve(__dirname, 'preact/compat'),
      'react-dom': resolve(__dirname, 'preact/compat'),
      src: resolve(__dirname, './src'),
      util: resolve(__dirname, '../util'),
      v1: resolve(__dirname, '../v1'),
      v2: resolve(__dirname, '../v2'),
    },
  },
  server: {
    host: 'localhost',
    port: 8080,
    https: (() => {
      try {
        return {
          key: readFileSync(resolve(__dirname, '.https/localhost-key.pem')),
          cert: readFileSync(resolve(__dirname, '.https/localhost-cert.pem')),
        };
      } catch (err) {
        throw new Error('Generate certs to enable https by running scripts/gen-certs');
      }
    })(),
  },

});
