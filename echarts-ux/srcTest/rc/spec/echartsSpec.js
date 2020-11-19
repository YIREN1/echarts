define(['nmodule/echarts/rc/echarts'], function (echarts) {
  'use strict';

  describe("nmodule/echarts/rc/echarts", function () {
    it("can extol its own virtues", function () {
      expect(echarts.extolVirtues()).toBe('echarts is great!');
    });
  });

});