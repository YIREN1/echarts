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
    let days = ['Sunday', 'Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday'];
    let data = [];
    for (let i of _.range(7)) {
      for (let j of _.range(24)) {
        data.push([i, j, 0]);
      }
    }
    console.log(data);
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
    // start time
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

            console.log(cur.getDisplay('timestamp').split(' ')[1].split(':')[0]);
          },
        },
      })
      .then(function (result) {
        let option = {
          series: [{ ...myChart.getOption().series[0], data: formatSeriesData(that.data) }],
        };
        // console.log(option);
        myChart.setOption(option);
      });
  };

  return Bar3dWidget;
});
