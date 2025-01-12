/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { FtrProviderContext } from '../../../ftr_provider_context';

export default function ({ getPageObject, getService }: FtrProviderContext) {
  const svlSecLandingPage = getPageObject('svlSecLandingPage');
  const svlSecNavigation = getService('svlSecNavigation');

  describe('landing page', function () {
    it('has serverless side nav', async () => {
      await svlSecNavigation.navigateToLandingPage();
      await svlSecLandingPage.assertSvlSecSideNavExists();
    });
  });
}
