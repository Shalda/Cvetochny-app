import {CommonAppModule} from './common-app.module';

describe('CommonAppModule', () => {
  let commonModule: CommonAppModule;

  beforeEach(() => {
    commonModule = new CommonAppModule();
  });

  it('should create an instance', () => {
    expect(commonModule).toBeTruthy();
  });
});
