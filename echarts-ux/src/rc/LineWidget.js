/**
 * A module defining `LineWidget`.
 *
 * @module nmodule/echarts/rc/LineWidget
 */
define([
  'nmodule/webEditors/rc/fe/baja/BaseEditor',
  'bajaux/mixin/subscriberMixIn',
  'jquery',
  'Promise',
  'hbs!nmodule/echarts/rc/LineWidgetTemplate',
  'nmodule/echarts/rc/lib/echarts.min',
  'css!nmodule/echarts/rc/echarts',
], function (BaseEditor, subscriberMixin, $, Promise, LineWidgetTemplate, echarts) {
  'use strict';


  /**
   * A demonstration Widget. This builds a list of buttons from the slots of a
   * Complex value, allowing the user to select a slot.
   *
   * @class
   * @extends module:nmodule/webEditors/rc/fe/baja/BaseEditor
   * @alias module:nmodule/echarts/rc/LineWidget
   */
  var LineWidget = function LineWidget() {
    /** remember to call super constructor. Javascript won't do this for you */
    BaseEditor.apply(this, arguments);
    subscriberMixin(this);
  };

  //extend and set up prototype chain
  LineWidget.prototype = Object.create(BaseEditor.prototype);
  LineWidget.prototype.constructor = LineWidget;

  /**
   * Do initial setup of the DOM for the widget. This will set up the DOM's
   * structure and create a space where the buttons will go.
   *
   * @param {jQuery} element the DOM element into which to load this widget
   */
  LineWidget.prototype.doInitialize = function (dom) {
    var that = this;

    dom.html(LineWidgetTemplate({}));
    var myChart = echarts.init(document.getElementById('main'));
    that.myChart = myChart;
    // specify chart configuration item and data
    var option = {
      title: {
        text: 'ECharts histroy example',
      },
      tooltip: {},
      legend: {
        data: ['Color'],
      },
      xAxis: {
        data: [],
      },
      yAxis: {
        type: 'category',
      },
      series: [],
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);
  };

  LineWidget.prototype.doLoad = async function (table) {
    var that = this;
    let myChart = that.myChart;
    let option = {
      xAxis: {
        data: [],
      },
      yAxis: {},
    };

    let serie = {
      data: [],
      type: 'line',
      name: 'Color',
    };
    let cursors = await table.cursor({ limit: 50 });
    // bajascript api
    cursors.each((cursor) => {
      console.count('data');
      let value = cursor.getDisplay('value');
      // todo: bad code
      if (!option.yAxis.type && typeof value === 'string') {
        option.yAxis.type = 'category';
      }
      let time = cursor.getDisplay('timestamp');
      option.xAxis.data.push(time);
      // 0 is hard-coded
      serie.data.push(value);
      // console.log(cursor.getDisplay('timestamp'));
    });
    let newSeries = [...myChart.getOption().series];
    newSeries.push(serie);
    // let barSerie = { ...serie, type: 'bar' };
    // newSeries.push(barSerie);
    option.series = newSeries;
    myChart.setOption(option);
  };

  return LineWidget;
});
