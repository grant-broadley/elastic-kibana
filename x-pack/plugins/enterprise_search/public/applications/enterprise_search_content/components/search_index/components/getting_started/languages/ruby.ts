/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import { Languages, LanguageDefinition } from '@kbn/search-api-panels';

import { docLinks } from '../../../../../../shared/doc_links';

export const rubyDefinition: LanguageDefinition = {
  buildSearchQuery: `client.search(index: 'books', q: 'snow')`,
  configureClient: ({ url, apiKey }) => `client = ElasticsearchServerless::Client.new(
  api_key: '${apiKey}',
  url: '${url}'
)
`,
  docLink: docLinks.clientsRubyOverview,
  github: {
    label: i18n.translate('xpack.enterpriseSearch.languages.ruby.githubLink', {
      defaultMessage: 'elasticsearch-ruby',
    }),
    link: 'https://github.com/elastic/elasticsearch-ruby',
  },
  iconType: 'ruby.svg',
  id: Languages.RUBY,
  ingestData: `documents = [
  { index: { _index: 'books', data: {name: "Snow Crash", "author": "Neal Stephenson", "release_date": "1992-06-01", "page_count": 470} } },
  { index: { _index: 'books', data: {name: "Revelation Space", "author": "Alastair Reynolds", "release_date": "2000-03-15", "page_count": 585} } },
  { index: { _index: 'books', data: {name: "1984", "author": "George Orwell", "release_date": "1985-06-01", "page_count": 328} } },
  { index: { _index: 'books', data: {name: "Fahrenheit 451", "author": "Ray Bradbury", "release_date": "1953-10-15", "page_count": 227} } },
  { index: { _index: 'books', data: {name: "Brave New World", "author": "Aldous Huxley", "release_date": "1932-06-01", "page_count": 268} } },
  { index: { _index: 'books', data: {name: "The Handmaid's Tale", "author": "Margaret Atwood", "release_date": "1985-06-01", "page_count": 311} } }
]
client.bulk(body: documents)`,
  ingestDataIndex: '',
  installClient: `$ gem install elasticsearch -v x.x.x`,
  name: i18n.translate('xpack.enterpriseSearch.languages.ruby', {
    defaultMessage: 'Ruby',
  }),
  testConnection: `client.info`,
};
