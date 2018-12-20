import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { IAppState } from "../model/state";
import { css } from "glamor";
import { CartesianGrid, XAxis, YAxis, Scatter, ScatterChart } from 'recharts';

interface IConnectedProps {
    wpm: number[],
    accuracy: number[],
}

interface IOwnProps {
}

interface IDispatchProps {
}

type IStatisticsProps = IConnectedProps & IDispatchProps & IOwnProps;

const containerStyle = css({
    display: "flex",
    flexDirection: "column",
    flexWrap: "no-wrap",
    margin: "auto",
});

class Statistics extends React.PureComponent<IStatisticsProps> {
    render() {
        return (
            <div {...containerStyle}>
                {this.buildChart()}
            </div>
        )
    }

    buildChart() {
        const data: any[] = [];
        for (let i = 0; i < this.props.wpm.length; i++) {
            data.push({
                x: i,
                y: this.props.wpm[i]
            });
        }
        
        if (data.length === 0) {
            return null;
        }

        return (
            <ScatterChart width={600} height={200} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                <CartesianGrid stroke='#f5f5f5'/>
                <XAxis dataKey="x"/>
                <YAxis dataKey="y"/>
                <Scatter data={data} lineType='fitting' line fill='#8884d8' />
            </ScatterChart>
        )
    }
}

function mapStateToProps(state: IAppState, ownProps: IOwnProps): IConnectedProps & IOwnProps {
    return {
        wpm: state.stats.wpm.toJS(),
        accuracy: state.stats.accuracy.toJS(),
        ...ownProps
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAppState>): IDispatchProps {
    dispatch;
    return {
    };
}

export default connect<IConnectedProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(Statistics);