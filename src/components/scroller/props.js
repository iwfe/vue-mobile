export default {
  fool: {
    type: String,
    default: 'normal'
  },
  height: String,
  lockX: Boolean,
  lockY: Boolean,
  scrollbarX: Boolean,
  scrollbarY: Boolean,
  bounce: {
    type: Boolean,
    default: true
  },
  useOriginScroll: {
    type: Boolean,
    default: false
  },
  useTransition: {
    type: Boolean,
    default: true
  },
  preventDefault: {
    type: Boolean,
    default: true
  },
  stopPropagation: Boolean,
  boundryCheck: {
    type: Boolean,
    default: true
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  usePulldown: {
    type: Boolean,
    default: false
  },
  usePullup: {
    type: Boolean,
    default: false
  },
  pulldownConfig: {
    type: Object,
    default () {
      return {}
    }
  },
  pullupConfig: {
    type: Object,
    default () {
      return {}
    }
  },
  pulldownStatus: {
    type: String,
    default: 'default',
    twoWay: true
  },
  pullupStatus: {
    type: String,
    default: 'default',
    twoWay: true
  },
  enableHorizontalSwiping: {
    type: Boolean,
    default: false
  }
}
