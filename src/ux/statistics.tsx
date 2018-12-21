import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { IAppState } from "../model/state";
import { css } from "glamor";
import { CartesianGrid, XAxis, YAxis, Scatter, ScatterChart, Tooltip } from 'recharts';
import { ILessonStats } from 'src/model/store/statsState';

interface IConnectedProps {
    lessonStats: ILessonStats[],
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
        for (let i = 0; i < this.props.lessonStats.length; i++) {
            data.push({
                x: i,
                y: this.props.lessonStats[i].wpm,
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
                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            </ScatterChart>
        )
    }
}

function mapStateToProps(state: IAppState, ownProps: IOwnProps): IConnectedProps & IOwnProps {
    return {
        lessonStats: state.stats.lessonStats.toJS(),
        ...ownProps
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAppState>): IDispatchProps {
    dispatch;
    return {
    };
}

export default connect<IConnectedProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(Statistics);