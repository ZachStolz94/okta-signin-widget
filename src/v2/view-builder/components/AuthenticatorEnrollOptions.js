/*!
 * Copyright (c) 2020, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
import { ListView, loc, View, createButton } from 'okta';
import { FORMS as RemediationForms } from '../../ion/RemediationConstants';
import skipAll from './SkipOptionalEnrollmentButton';
import hbs from 'handlebars-inline-precompile';

const AuthenticatorRow = View.extend({
  className: 'authenticator-row clearfix',
  template: hbs`
    <div class="authenticator-icon-container">
      <div class="factor-icon authenticator-icon {{iconClassName}}"></div>
    </div>
    <div class="authenticator-description">
      <h3 class="authenticator-label no-translate">{{label}}</h3>
      {{#if description}}
        <p class="authenticator-description--text">{{description}}</p>
      {{/if}}
      {{#if authenticatorUsageText}}
        <p class="authenticator-usage-text">{{authenticatorUsageText}}</p>
      {{/if}}
      <div class="authenticator-button" {{#if buttonDataSeAttr}}data-se="{{buttonDataSeAttr}}"{{/if}}></div>
    </div>
  `,
  children: function() {
    return [[createButton({
      className: 'button select-factor',
      title: function() {
        return loc('oie.enroll.authenticator.button.text', 'login');
      },
      click: function() {
        this.model.trigger('selectAuthenticator', this.model.get('value'));
      }
    }), '.authenticator-button']];
  },
  minimize: function() {
    this.$el.addClass('authenticator-row-min');
  },
  getTemplateData() {
    let authenticatorUsageText;
    const allowedFor = this.model.get('relatesTo').allowedFor;

    if (allowedFor) {
      switch (allowedFor) {
      case 'any':
        authenticatorUsageText = loc('oie.enroll.authenticator.usage.text.access.recovery', 'login');
        break;
      case 'recovery':
        authenticatorUsageText = loc('oie.enroll.authenticator.usage.text.recovery', 'login');
        break;
      case 'sso':
        authenticatorUsageText = loc('oie.enroll.authenticator.usage.text.access', 'login');
        break;
      default:
        break;
      }
    }

    return {
      authenticatorUsageText,
      iconClassName: this.model.get('iconClassName'),
      label: this.model.get('label'),
      description: this.model.get('description'),
      buttonDataSeAttr: this.model.get('buttonDataSeAttr'),
    };
  },
});

export default ListView.extend({

  className: 'authenticator-enroll-list authenticator-list',

  item: AuthenticatorRow,

  itemSelector: '.list-content',

  initialize: function() {
    this.listenTo(this.collection,'selectAuthenticator', function(data) {
      this.model.set(this.options.name, data);
      this.options.appState.trigger('saveForm', this.model);
    });
    this.hasOptionalFactors = this.options.appState.hasRemediationObject(RemediationForms.SKIP);
    if (this.hasOptionalFactors) {
      this.add(skipAll);
    }
  },

  template: hbs`<div class="list-content"> <div class="authenticator-list-title"> {{title}} </div> </div>`,

  getTemplateData() {
    // presence of the skip remediation form tells us that the authenticators are all optional
    const title = this.hasOptionalFactors? loc('oie.setup.optional', 'login'):loc('oie.setup.required', 'login');

    return {
      title
    };
  }

});
