---
title: ECharts学习笔记
date: 2018-10-22 13:46:34
tags: ECharts4.0
categories: ECharts
---
# ECharts学习笔记
## API
API分为 四大类
['echarts', 'echartsInstance', 'action', 'events']
  + echarts
    - init: Function \
    创建一个 ECharts 实例，返回 echartsInstance，不能在单个容器上初始化多个 ECharts 实例。

      > (dom, theme?, opts?) => echartsInstance
    
    - connect \
    多个图表实例实现联动。

    - disconnect \
    解除图表实例的联动，如果只需要移除单个实例，可以将通过将该图表实例 group 设为空。

    - dispose \
    销毁实例，实例销毁后无法再被使用。

    - getInstanceByDom \
    获取 dom 容器上的实例。

    - registerMap \
    注册可用的地图，必须在包括 geo 组件或者 map 图表类型的时候才能使用。

    - getMap \
    获取已注册的地图，返回的对象类型如下

    - registerTheme \
    注册主题，用于初始化实例的时候指定。

    - graphic \
    图形相关帮助方法。

      - clipPointsByRect 
      输入一组点，和一个矩形，返回被矩形截取过的点。

      - clipRectByRect 
      输入两个矩形，返回第二个矩形截取第一个矩形的结果。

      注意：如果矩形完全被截干净，会返回 undefined。

  + echartsInstance \
    通过 echarts.init 创建的实例。
    - group \
    图表的分组，用于`联动`

    - setOption !\
    设置图表实例的配置项以及数据，**`万能接口`**，所有参数和数据的修改都可以通过setOption完成，ECharts 会合并新的参数和数据，然后刷新图表。\
    如开启动画，ECharts 找到两组数据之间的差异然后通过合适的动画去表现数据的变化。

      注： ECharts 2.x 中的通过 `addData` , `setSeries` 方法设置配置项的方式将不再支持，在 ECharts 3 中统一使用`setOption`，可参考示例。
      
      ````
      chart.setOption(option, notMerge, lazyUpdate);
      
      chart.setOption(option, {
          notMerge: ...,
          lazyUpdate: ...,
          silent: ...
      });
      ````
    
    - getWidth \
    获取 ECharts 实例容器的宽度。
    () => number

    - getHeight \
    获取 ECharts 实例容器的高度。
    () => number

    - getDom \
    获取 ECharts 实例容器的 dom 节点。

    - getOption \
    获取当前实例中维护的option对象，返回的option对象中包含了用户多次setOption合并得到的配置项和数据，也记录了用户交互的状态 \
    例如图例的开关，数据区域缩放选择的范围等等。所以从这份 option 可以恢复或者得到一个新的一模一样的实例。 \
    注意：返回的 option 每个组件的属性值都统一是一个`数组`，不管setOption传进来的时候是单个组件的对象还是多个组件的数组。 \
    推荐通过setOption去修改部分配置。

    - resize \
    改变图表尺寸，在容器大小发生改变时需要手动调用。

    - dispatchAction \
    触发图表行为，例如图例开关`legendToggleSelect`, 数据区域缩放`dataZoom`，显示提示框`showTip`等等，更多见 `action` 和 `events` 的文档。

    - on \
    绑定事件处理函数。 \
    ECharts 中的事件有两种，1、鼠标事件，在鼠标点击某个图形上会触发， 2、调用 dispatchAction 后触发的事件。具体见 action 和 events 的文档。 \
    参数 [eventName, query]

    - off \
    解绑事件处理函数。 \
    参数 [eventName, handler]

    - convertToPixel \
    转换坐标系上的点到像素坐标值。

    - convertFromPixel \
    转换像素坐标值到逻辑坐标系上的点。是 convertToPixel 的逆运算。 

    - containPixel \
    判断给定的点是否在指定的坐标系或者系列上。

    - showLoading \
    显示加载动画效果。可以在加载数据前手动调用改接口显示加载动画，在数据加载完成后调用 hideLoading 隐藏加载动画。

    - hideLoading \
    隐藏动画加载效果。

    - getDataURL \
    导出图表图片，返回一个 base64 的 URL，可以设置为Image的src。

    - getConnectedDataURL \
    导出联动的图表图片，返回一个 base64 的 url，可以设置为Image的src。导出图片中每个图表的相对位置跟容器的相对位置有关。

    - appendData \
    此接口用于，在大数据量（百万以上）的渲染场景，分片加载数据和增量渲染。在大数据量的场景下（例如地理数的打点），就算数据使用二进制格式，也会有几十或上百兆，在互联网环境下，往往需要分片加载。appendData 接口提供了分片加载后增量渲染的能力，渲染新加如的数据块时不会清除原有已经渲染的部分。

    - clear \
    清空当前实例，会移除实例中所有的组件和图表。清空后调用 getOption 方法返回一个{}空对象。

    - isDisposed \
    当前实例是否已经被释放。

    - dispose \
    销毁实例，销毁后实例无法再被使用。

  + action \
  ECharts 中支持的图表行为，通过 dispatchAction 触发。 \
  注： 代码中的 ?: 表示该属性是可选的。EVENT: 是 action 对应触发的事件。

    - highlight \
    高亮指定的数据图形。 \
    通过`seriesName`或者`seriesIndex`指定系列。如果要再指定某个数据可以再指定`dataIndex`或者`name`。

    - downplay \
    取消高亮指定的数据图形。

    - legend \
    图例组件相关的行为，必须引入图例组件后才能使用。

      - legendSelect \
      选中图例。

      - legendUnSelect \
      取消选中图例。

      - legendToggleSelect \
      切换图例的选中状态。

      - legendScroll \
      控制图例的滚动。当 legend.type 为 'scroll' 时有效。

    - tooltip \
    提示框组件相关的行为，必须引入提示框组件后才能使用。

      - showTip \
      显示提示框。

      - hideTip \
      隐藏提示框。

    - dataZoom \
    数据区域缩放组件相关的行为，必须引入数据区域缩放组件后才能使用。

      - dataZoom \
      数据区域缩放。

    - visualMap \
    视觉映射组件相关的行为，必须引入视觉映射组件后才能使用。

      - selectDataRange \
      选取映射的数值范围。

    - timeline \
    时间轴组件相关的行为，必须引入时间轴组件后才能使用。

      - timelineChange \
      设置当前的时间点。

      - timelinePlayChange \
      切换时间轴的播放状态。

    - toolbox \
    工具栏组件相关的行为，必须引入工具栏组件后才能使用。

      - restore \
      重置 option。

    - pie \
    饼图相关的行为，必须引入饼图后才能使用。

      - pieSelect \
      选中指定的饼图扇形。

      - pieUnSelect \
      取消选中指定的饼图扇形。

      - pieToggleSelect \
      切换指定的饼图扇形选中状态。

    - geo \
    地图组件相关的行为，必须引入地图组件后才能使用。

      - geoSelect \
      选中指定的地图区域。

      - geoUnSelect \
      取消选中指定的地图区域。

      - geoToggleSelect \
      切换指定的地图区域选中状态。

    - map \
    地图图表相关的行为，必须引入地图图表后才能使用。

      - mapSelect \
      选中指定的地图区域。

      - mapUnSelect \
      取消选中指定的地图区域。

      - mapToggleSelect \
      切换指定的地图区域选中状态。

    - graph \
    关系图 相关的行为，必须引入 关系图 后才能使用。

      - focusNodeAdjacency \
      将指定的节点以及其所有邻接节点高亮。

      - unfocusNodeAdjacency \
      将指定的节点以及其所有邻接节点高亮。

    - brush \
    区域选择相关的行为。

      - brush \
      触发此 action 可向 echarts 中添加一个或多个选框

  + events \
  在 ECharts 中主要通过 on 方法添加事件处理函数，该文档描述了所有 ECharts 的事件列表。 \
  ECharts 中的事件分为两种，一种是鼠标事件，在鼠标点击某个图形上会触发，还有一种是 调用 dispatchAction 后触发的事件。

    - 鼠标事件 \
    鼠标事件包括`click`，`dblclick`，`mousedown`，`mouseup`，`mouseover`，`mouseout`，`globalout`，`contextmenu`。
    参见 [ECharts 中的事件和行为](http://echarts.baidu.com/tutorial.html)

    - legendselectchanged \
    ACTION: legendToggleSelect 切换图例选中状态后的事件。
    注：图例组件用户切换图例开关会触发该事件。

    - legendselected \
    ACTION: legendSelect 图例选中后的事件。

    - legendunselected \
    ACTION: legendUnSelect 图例取消选中后的事件。

    - legendscroll \
    ACTION: legendscroll 图例滚动事件。 

    - datazoom \
    ACTION: dataZoom  
    数据区域缩放后的事件。

    - datarangeselected \
    ACTION: selectDataRange 视觉映射组件中，range 值改变后触发的事件。

    - timelinechanged \
    ACTION: timelineChange 时间轴中的时间点改变后的事件。

    - timelineplaychanged \
    ACTION: timelinePlayChange 时间轴中播放状态的切换事件。

    - restore \
    ACTION: restore 重置 option 事件。

    - dataviewchanged \
    工具栏中数据视图的修改事件。

    - magictypechanged \
    工具栏中动态类型切换的切换事件。

    - geoselectchanged \
    ACTION: geoToggleSelect \
    geo 中地图区域切换选中状态的事件。

    - geoselected \
    ACTION: geoSelect \
    geo 中地图区域选中后的事件。

    - geounselected \
    ACTION: geoUnSelect  
    geo 中地图区域取消选中后的事件。

    - pieselectchanged \
    ACTION: pieToggleSelect
    series-pie 中饼图扇形切换选中状态的事件。

    - pieselected \
    ACTION: pieSelect
    series-pie 中饼图扇形选中后的事件。
    使用dispatchAction可触发此事件，用户点击不会触发此事件（用户点击事件请使用 pieselectchanged）。

    - pieunselected \
    ACTION: pieUnSelect
    series-pie 中饼图扇形取消选中后的事件。

    - mapselectchanged \
    ACTION: mapToggleSelect
    series-map 中地图区域切换选中状态的事件。  
    用户点击选中会触发该事件。

    - mapselected \
    ACTION: mapSelect
    series-map 中地图区域选中后的事件。


