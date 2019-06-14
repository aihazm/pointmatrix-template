export default function picassoDefinition({
  layout,
}) {
  if (!layout.qHyperCube) {
    throw new Error('Layout is missing a hypercube');
  }
  return {
    scales: {
      years: {
        data: {
          extract: { field: 'qDimensionInfo/0' }
        }
      },
      months: {
        data: {
          extract: { field: 'qDimensionInfo/1' }
        }
      },
      s: {
        data: {
          field: 'qMeasureInfo/0'
        }
      },
      col: {
        data: { field: 'qMeasureInfo/0' },
        type: 'color'
      },
    },
    components: [{
      key: 'y-axis',
      type: 'axis',
      scale: 'years',
      dock: 'left'
    }, {
      key: 'x-axis',
      type: 'axis',
      scale: 'months',
      dock: 'bottom'
    }, {
      key: 'p',
      type: 'point',
      data: {
        extract: {
          field: 'qDimensionInfo/1',
          props: {
            mm: { field: 'qDimensionInfo/1' },
            size: { field: 'qMeasureInfo/0' },
            group: { field: 'qDimensionInfo/0' }
          }
        }
      },
      settings: {
        x: { scale: 'months' },
        y: { scale: 'years', ref: 'group' },
        size: { scale: 's' },
        fill: { scale: 'col', ref: 'size' }
      }
    }]
  };
}
