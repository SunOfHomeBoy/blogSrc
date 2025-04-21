---
title: 2025年4月21日 学习笔记
date: 2025年4月21日
update:
tags: 笔记
categories: note
---

```tsx
/*
 * @Description: 关联性分析散点图组件
 * @Date: 2025-04-16 15:42:15
 * @FilePath: \LL_HighWayMonitor_FG\src\view\OperationalMonitoring\components\LayoutsF\ScatterChart.tsx
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as math from 'mathjs'
import * as echarts from 'echarts'

interface ScatterChartProps {
  direction: 'lanzhou' | 'lintao'
}

/**
 * 散点图组件
 *
 * 使用ECharts生成散点图，并绘制趋势线。
 *
 * @param direction 方向参数，可选值为'lanzhou'或其他值，用于控制散点颜色
 */
const ScatterChart: React.FC<ScatterChartProps> = ({ direction }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  /** 散点数据State */
  const [scatterData, setScatterData] = useState<[number, number][]>([])
  /** 拟合参数与曲线数据State */
  const [fittedCurve, setFittedCurve] = useState<[number, number][]>([])
  const [, /* _modelParams */ setModelParams] = useState({})

  /** mock 数据 */
  const generateData = useCallback(() => {
    /* 区间数据 */
    const intervalDataList = [
      { x: 100, y: 75 },
      { x: 200, y: 70 },
      { x: 300, y: 65 },
      { x: 400, y: 60 },
      { x: 500, y: 55 },
      { x: 550, y: 36 },
      { x: 560, y: 36 },
      { x: 580, y: 35 },
      { x: 600, y: 35 },
      { x: 650, y: 45 },
      { x: 500, y: 25 },
      { x: 400, y: 15 },
      { x: 300, y: 10 },
    ]
    /* 根据区间数据生成随机散点 */
    const data: [number, number][] = []
    intervalDataList.forEach((point) => {
      // 为每个区间点生成50个随机散点
      for (let i = 0; i < 100; i++) {
        const randomX = point.x + (Math.random() * 100 - 50) /*  | 1 */ // x坐标 ±50范围内随机
        const randomY = point.y + (Math.random() * 20 - 10) /*  | 1 */ // y坐标 ±15范围内随机
        // 确保数据在有效范围内
        if (randomX >= 0 && randomX <= 800 && randomY >= 0 && randomY <= 80) {
          data.push([randomX, randomY])
        }
      }
    })

    return data
  }, [])

  /** 初始化图表 */
  const initChart = useCallback(() => {
    /** 非空校验 */
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current, 'dark')
    chartInstance.current = chart

    const option = {
      backgroundColor: 'transparent',
      grid: {
        left: 60,
        right: 40,
        top: 40,
        bottom: 60,
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params: { value: [number, number] }) {
          return `流量: ${params.value[0].toFixed(0)}辆/10小时<br/>速度: ${params.value[1].toFixed(2)}km/h`
        },
      },
      xAxis: {
        type: 'value',
        name: '流量(辆/10小时)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: 800,
        splitLine: {
          lineStyle: {
            color: '#0A2E4D',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#0A2E4D',
          },
        },
      },
      yAxis: {
        type: 'value',
        name: '速度(km/h)',
        nameLocation: 'middle',
        nameGap: 40,
        min: 0,
        max: 80,
        splitLine: {
          lineStyle: {
            color: '#0A2E4D',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#0A2E4D',
          },
        },
      },
      series: [
        {
          type: 'scatter',
          data: scatterData, // 使用已生成的数据
          symbolSize: 8,
          itemStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: direction === 'lanzhou' ? '#0183F2' : '#1FD8A9',
                },
                {
                  offset: 1,
                  color: '#4B82B3',
                  // color: direction === 'lanzhou' ? 'rgba(0,167,231,0.2)' : 'rgba(32,217,170,0.2)',
                },
              ],
            },
          },
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 36.48,
                lineStyle: {
                  color: '#ff4d4f',
                  type: 'dashed',
                },
                label: {
                  formatter: '36.48km/h',
                  position: 'end',
                },
              },
              {
                xAxis: 550,
                lineStyle: {
                  color: '#FFD700',
                  type: 'dashed',
                },
                label: {
                  formatter: '550辆/10小时',
                  position: 'end',
                },
              },
            ],
          },
          markArea: {
            silent: true,
            itemStyle: {
              color: 'rgba(0, 156, 255, 0.1)',
              borderWidth: 2, // 添加边框宽度
              borderColor: '#009CFF', // 添加边框颜色
            },
            data: [
              [
                {
                  name: '亚饱和区域',
                  xAxis: 550,
                  yAxis: 25,
                },
                {
                  xAxis: 800,
                  yAxis: 55,
                },
              ],
            ],
          },
        },
        {
          name: `趋势拟合曲线`,

          type: 'line',
          data: fittedCurve,

          smooth: true, // 使曲线平滑
          showSymbol: false, // 不显示数据点
          lineStyle: {
            color: '#f0f', // 黑色
            type: 'dashed', // 虚线
            width: 2,
          },
          tooltip: {
            show: false, // 不在 tooltip 中显示趋势线信息
          },
        },
      ],
    }

    chart.setOption(option)

    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.dispose()
    }
  }, [fittedCurve, direction, scatterData])

  /**
   * 二次函数拟合(最小二乘法，使用 mathjs 解矩阵方程) - 拟合流量 q = f(v)
   * @param {Array} dataList 输入数据，格式为 [[flow: number, speed: number]]
   * @returns {Object} 拟合结果，包含曲线数据和参数
   */
  const fitQuadratic = (dataList: [number, number][]) => {
    /* 数据校验：至少需要 3 个数据点 */
    if (dataList.length < 3) {
      throw new Error('二次函数拟合需要至少 3 个数据点')
    }

    /** [流量, 速度] */
    const xy: [number[], number[]] = [[], []]
    /** 提取流量(q: quantity of flow) 和 速度(v: velocity) 数据 */
    const [qData, vData] = dataList.reduce(([q, v], [flow, speed]) => [q.concat(flow), v.concat(speed)], xy)
    /** 数据点数量 */
    const n = vData.length

    // 计算各项求和（基于速度 v 作为自变量）
    /** 速度一维求和 */
    const sumV = vData.reduce((acc, val) => acc + val, 0)
    /** 速度平方求和 */
    const sumV2 = vData.reduce((acc, val) => acc + val ** 2, 0)
    /** 速度立方求和 */
    const sumV3 = vData.reduce((acc, val) => acc + val ** 3, 0)
    /** 速度四次方求和 */
    const sumV4 = vData.reduce((acc, val) => acc + val ** 4, 0)
    /** 流量一维求和 */
    const sumQ = qData.reduce((acc, val) => acc + val, 0)
    /** 速度与流量乘积求和 */
    const sumVQ = vData.reduce((acc, val, index) => acc + val * qData[index], 0)
    /** 速度平方与流量乘积求和 */
    const sumV2Q = vData.reduce((acc, val, index) => acc + val ** 2 * qData[index], 0)

    /** 构建 系数矩阵 A (基于速度 v) */
    const A = math.matrix([
      [sumV4, sumV3, sumV2],
      [sumV3, sumV2, sumV],
      [sumV2, sumV, n],
    ])
    /** 常数项向量 B (基于流量 q) */
    const B = math.matrix([sumV2Q, sumVQ, sumQ])

    /* 异常处理: 处理矩阵不可逆的情况（行列式为 0） */
    if (math.det(A) === 0) {
      throw new Error('系数矩阵不可逆，无法求解唯一解')
    }

    // 解线性方程组 A·X = B, 求解参数 [a, b, c]
    const X = math.multiply(math.inv(A), B)
    /*
     * 解释二次函数拟合参数 a、b、c 的含义:
     * a: 二次项系数,控制抛物线开口方向和宽窄
     * b: 一次项系数,控制抛物线轴的偏移
     * c: 常数项,控制抛物线在y轴上的截距
     *
     * 拟合方程: q = a*v² + b*v + c
     * q: 流量(辆/10小时)
     * v: 速度(km/h)
     */
    const [a, b, c] = X.toArray().map((val) => Number(val.toString().slice(0, 8))) // 保留6位小数

    // 生成拟合曲线数据（速度范围：取所有v的最小值到最大值，步长1）
    const minSpeed = Math.min(...vData)
    const maxSpeed = Math.max(...vData)
    const curveData: [number, number][] = []
    for (let v = minSpeed; v <= maxSpeed; v += 1) {
      // 步长调整为1，使曲线更平滑
      const predictedFlow = a * v ** 2 + b * v + c
      // 确保预测流量在合理范围内（例如，不小于0）
      if (predictedFlow >= 0) {
        curveData.push([predictedFlow, v]) // ECharts 需要 [x, y] 即 [flow, speed]
      }
    }
    // 对曲线数据按流量排序，确保绘制时是连续的
    curveData.sort((p1, p2) => p1[0] - p2[0])

    return {
      params: { a, b, c }, // 拟合参数：q = a*v² + b*v + c
      curve: curveData, // 拟合曲线数据（ECharts 所需的 [flow, speed] 数组）
      error: null, // 错误信息（无错误时为 null）
    }
  }

  // 示例用法
  // const data = [{ flow: 200, speed: 65 }, { flow: 400, speed: 50 }, { flow: 600, speed: 35 }];
  // try {
  //   const result = fitQuadratic(data);
  //   console.log('拟合参数:', result.params);
  //   console.log('拟合曲线数据:', result.curve);
  // } catch (error) {
  //   console.error('拟合失败:', error.message);
  // }

  /** 模拟 异步请求数据 回调函数 */
  const fetchScatterData = useCallback(() => {
    /** 1. 通过 props 更新数据 */
    /** 2. 模拟 异步数据 */
    setTimeout(() => {
      const _fetchScatterData = generateData()
      setScatterData(_fetchScatterData)
    }, 0)
  }, [generateData])

  /* 数据拟合逻辑 */
  useEffect(() => {
    /** 非空校验 */
    if (scatterData.length < 3) return

    const fitted = fitQuadratic(scatterData)
    // debugger
    setFittedCurve(fitted.curve)
    setModelParams(fitted.params)
  }, [scatterData])

  /* 初始化图表逻辑 */
  useEffect(() => {
    /** 非空校验 */
    if (scatterData.length < 3 || fittedCurve.length === 0) return

    const cleanup = initChart()
    return () => cleanup && cleanup()
  }, [initChart, scatterData, fittedCurve])

  /* 首次加载时请求数据 */
  useEffect(() => {
    fetchScatterData()
  }, [fetchScatterData])

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
}

export default ScatterChart
```
