/**
 * A module defining `Bar3dWidget`.
 *
 * @module nmodule/echarts/rc/Bar3dWidget
 */
define([
  'baja!',
  'nmodule/webEditors/rc/fe/baja/BaseEditor',
  'bajaux/mixin/subscriberMixIn',
  'jquery',
  'Promise',
  'underscore',
  'hbs!nmodule/echarts/rc/Bar3dWidgetTemplate',
  'nmodule/echarts/rc/lib/echarts.min',
  'nmodule/echarts/rc/lib/echarts-gl.min',
  'css!nmodule/echarts/rc/echarts',
], function (baja, BaseEditor, subscriberMixin, $, Promise, _, Bar3dWidgetTemplate, echarts) {
  'use strict';

  /**
   * A demonstration Widget. This builds a list of buttons from the slots of a
   * Complex value, allowing the user to select a slot.
   *
   * @class
   * @extends module:nmodule/webEditors/rc/fe/baja/BaseEditor
   * @alias module:nmodule/echarts/rc/Bar3dWidget
   */
  let Bar3dWidget = function Bar3dWidget() {
    /** remember to call super constructor. Javascript won't do this for you */
    BaseEditor.apply(this, arguments);
    subscriberMixin(this);
  };

  //extend and set up prototype chain
  Bar3dWidget.prototype = Object.create(BaseEditor.prototype);
  Bar3dWidget.prototype.constructor = Bar3dWidget;

  /**
   * Do initial setup of the DOM for the widget. This will set up the DOM's
   * structure and create a space where the buttons will go.
   *
   * @param {jQuery} element the DOM element into which to load this widget
   */
  Bar3dWidget.prototype.doInitialize = function (dom) {
    let that = this;
    console.log('Bar3dWidget Initializing...');
    dom.html(Bar3dWidgetTemplate({}));
    let myChart = echarts.init(document.getElementById('main'));
    that.myChart = myChart;

    let hours = [
      '12a',
      '1a',
      '2a',
      '3a',
      '4a',
      '5a',
      '6a',
      '7a',
      '8a',
      '9a',
      '10a',
      '11a',
      '12p',
      '1p',
      '2p',
      '3p',
      '4p',
      '5p',
      '6p',
      '7p',
      '8p',
      '9p',
      '10p',
      '11p',
    ];
    let days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

    let data = [
      [0, 0, 5],
      [0, 1, 1],
      [0, 2, 0],
      [0, 3, 0],
      [0, 4, 0],
      [0, 5, 0],
      [0, 6, 0],
      [0, 7, 0],
      [0, 8, 0],
      [0, 9, 0],
      [0, 10, 0],
      [0, 11, 2],
      [0, 12, 4],
      [0, 13, 1],
      [0, 14, 1],
      [0, 15, 3],
      [0, 16, 4],
      [0, 17, 6],
      [0, 18, 4],
      [0, 19, 4],
      [0, 20, 3],
      [0, 21, 3],
      [0, 22, 2],
      [0, 23, 5],
      [1, 0, 7],
      [1, 1, 0],
      [1, 2, 0],
      [1, 3, 0],
      [1, 4, 0],
      [1, 5, 0],
      [1, 6, 0],
      [1, 7, 0],
      [1, 8, 0],
      [1, 9, 0],
      [1, 10, 5],
      [1, 11, 2],
      [1, 12, 2],
      [1, 13, 6],
      [1, 14, 9],
      [1, 15, 11],
      [1, 16, 6],
      [1, 17, 7],
      [1, 18, 8],
      [1, 19, 12],
      [1, 20, 5],
      [1, 21, 5],
      [1, 22, 7],
      [1, 23, 2],
      [2, 0, 1],
      [2, 1, 1],
      [2, 2, 0],
      [2, 3, 0],
      [2, 4, 0],
      [2, 5, 0],
      [2, 6, 0],
      [2, 7, 0],
      [2, 8, 0],
      [2, 9, 0],
      [2, 10, 3],
      [2, 11, 2],
      [2, 12, 1],
      [2, 13, 9],
      [2, 14, 8],
      [2, 15, 10],
      [2, 16, 6],
      [2, 17, 5],
      [2, 18, 5],
      [2, 19, 5],
      [2, 20, 7],
      [2, 21, 4],
      [2, 22, 2],
      [2, 23, 4],
      [3, 0, 7],
      [3, 1, 3],
      [3, 2, 0],
      [3, 3, 0],
      [3, 4, 0],
      [3, 5, 0],
      [3, 6, 0],
      [3, 7, 0],
      [3, 8, 1],
      [3, 9, 0],
      [3, 10, 5],
      [3, 11, 4],
      [3, 12, 7],
      [3, 13, 14],
      [3, 14, 13],
      [3, 15, 12],
      [3, 16, 9],
      [3, 17, 5],
      [3, 18, 5],
      [3, 19, 10],
      [3, 20, 6],
      [3, 21, 4],
      [3, 22, 4],
      [3, 23, 1],
      [4, 0, 1],
      [4, 1, 3],
      [4, 2, 0],
      [4, 3, 0],
      [4, 4, 0],
      [4, 5, 1],
      [4, 6, 0],
      [4, 7, 0],
      [4, 8, 0],
      [4, 9, 2],
      [4, 10, 4],
      [4, 11, 4],
      [4, 12, 2],
      [4, 13, 4],
      [4, 14, 4],
      [4, 15, 14],
      [4, 16, 12],
      [4, 17, 1],
      [4, 18, 8],
      [4, 19, 5],
      [4, 20, 3],
      [4, 21, 7],
      [4, 22, 3],
      [4, 23, 0],
      [5, 0, 2],
      [5, 1, 1],
      [5, 2, 0],
      [5, 3, 3],
      [5, 4, 0],
      [5, 5, 0],
      [5, 6, 0],
      [5, 7, 0],
      [5, 8, 2],
      [5, 9, 0],
      [5, 10, 4],
      [5, 11, 1],
      [5, 12, 5],
      [5, 13, 10],
      [5, 14, 5],
      [5, 15, 7],
      [5, 16, 11],
      [5, 17, 6],
      [5, 18, 0],
      [5, 19, 5],
      [5, 20, 3],
      [5, 21, 4],
      [5, 22, 2],
      [5, 23, 0],
      [6, 0, 1],
      [6, 1, 0],
      [6, 2, 0],
      [6, 3, 0],
      [6, 4, 0],
      [6, 5, 0],
      [6, 6, 0],
      [6, 7, 0],
      [6, 8, 0],
      [6, 9, 0],
      [6, 10, 1],
      [6, 11, 0],
      [6, 12, 2],
      [6, 13, 1],
      [6, 14, 3],
      [6, 15, 4],
      [6, 16, 0],
      [6, 17, 0],
      [6, 18, 0],
      [6, 19, 0],
      [6, 20, 1],
      [6, 21, 2],
      [6, 22, 2],
      [6, 23, 6],
    ];
    this.data = data;

    let option = {
      tooltip: {},
      visualMap: {
        max: 20,
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026',
          ],
        },
      },
      xAxis3D: {
        type: 'category',
        data: hours,
      },
      yAxis3D: {
        type: 'category',
        data: days,
      },
      zAxis3D: {
        type: 'value',
      },
      grid3D: {
        boxWidth: 200,
        boxDepth: 80,
        viewControl: {
          // projection: 'orthographic'
        },
        light: {
          main: {
            intensity: 1.2,
            shadow: true,
          },
          ambient: {
            intensity: 0.3,
          },
        },
      },
      series: [
        {
          type: 'bar3D',
          data: formatSeriesData(data),
          shading: 'lambert',

          label: {
            textStyle: {
              fontSize: 16,
              borderWidth: 1,
            },
          },

          emphasis: {
            label: {
              textStyle: {
                fontSize: 20,
                color: '#900',
              },
            },
            itemStyle: {
              color: '#900',
            },
          },
        },
      ],
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);
  };

  function formatSeriesData(data) {
    return data.map(function (item) {
      return {
        value: [item[1], item[0], item[2]],
      };
    });
  }

  Bar3dWidget.prototype.doLoad = function (table) {
    let that = this;
    // -.-
    let myChart = that.myChart;
    let ord = table.$tableData.req.o;
    let bql = ord.toString();
    let index = 0;
    let rollupMethod = 'max';
    let timeRange = 'lastMonth';
    bql += `?period=${timeRange}`;
    // hourly
    let interval = 60 * 60 * 1000;
    bql += `|bql:history:HistoryRollup.rollup(baja:RelTime '${interval}')`;
    console.log(bql);

    baja.Ord.make(bql)
      .get({
        cursor: {
          limit: 168,
          each: (cur) => {
            that.data[index][2] = cur.getDisplay(rollupMethod);
            index++;
          },
        },
      })
      .then(function (result) {
        // console.log(that.data);
        let option = {
          series: [{ ...myChart.getOption().series[0], data: formatSeriesData(that.data) }],
        };
        console.log(option)
        myChart.setOption(option);
      });
  };

  return Bar3dWidget;
});
