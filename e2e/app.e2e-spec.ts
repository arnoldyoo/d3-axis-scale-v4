import { D3AxisScaleV4Page } from './app.po';

describe('d3-axis-scale-v4 App', () => {
  let page: D3AxisScaleV4Page;

  beforeEach(() => {
    page = new D3AxisScaleV4Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
