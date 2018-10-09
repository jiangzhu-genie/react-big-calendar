import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import BackgroundWrapper from './BackgroundWrapper'
import NoopWrapper from './NoopWrapper'

export default class TimeSlotGroup extends Component {
  static propTypes = {
    renderSlot: PropTypes.func,
    group: PropTypes.array.isRequired,
    resource: PropTypes.any,
    components: PropTypes.object,
    getters: PropTypes.object,
  }

  render() {
    const {
      renderSlot,
      resource,
      group,
      getters,
      components: {
        timeSlotWrapper: Wrapper = BackgroundWrapper,
        timeSlotGroupWrapper: TimeSlotGroupWrapper = NoopWrapper,
      } = {},
    } = this.props

    return (
      <TimeSlotGroupWrapper {...this.props}>
        <div className="rbc-timeslot-group">
          {group.map((value, idx) => {
            const slotProps = getters ? getters.slotProp(value) : {}
            return (
              <Wrapper key={idx} value={value} resource={resource}>
                <div
                  {...slotProps}
                  className={cn('rbc-time-slot', slotProps.className)}
                >
                  {renderSlot && renderSlot(value, idx)}
                </div>
              </Wrapper>
            )
          })}
        </div>
      </TimeSlotGroupWrapper>
    )
  }
}
