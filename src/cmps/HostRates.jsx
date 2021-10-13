import React from 'react'
import { connect } from 'react-redux'
import { HostCharts } from './HostCharts'

class _HostRates extends React.Component {

    render() {
        return (
            <div className="host-rates">
                <HostCharts />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

export const HostRates = connect(mapStateToProps)(_HostRates)