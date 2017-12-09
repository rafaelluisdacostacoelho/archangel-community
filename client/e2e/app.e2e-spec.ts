import { ArchangelCommunity.ClientPage } from './app.po';

describe('archangel-community.client App', () => {
  let page: ArchangelCommunity.ClientPage;

  beforeEach(() => {
    page = new ArchangelCommunity.ClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
