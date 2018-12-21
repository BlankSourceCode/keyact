import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { IAppState } from "../model/state";
import Paragraph from "./paragraph"
import Statistics from "./statistics"
import "./global.css";
import { generateNewLessonAction, updateLastLetterAction, updateFocusAction } from '../model/actions/typingActions';
import { css } from "glamor";
import { loadStatsAction } from '../model/actions/statsActions';

interface IConnectedProps {
    paragraph: string,
    typedKeys: string,
    hasDocumentFocus: boolean,
    isTypingComplete: boolean,
}

interface IOwnProps {
}

interface IDispatchProps {
    updateFocus: (hasFocus: boolean) => void;
    updateLastLetter: (l: string) => void;
    generateParagraphAction: () => void;
    loadStatsAction: () => void;
}

type IKeyduxAppProps = IConnectedProps & IDispatchProps & IOwnProps;

const rootStyle = css({
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "stretch",
    margin: "0",
    height: "100%",
    width: "100%",
    fontSize: "12px",
    fontWeight: "normal",
    color: "#1e1e1e",
});

class KeyduxApp extends React.PureComponent<IKeyduxAppProps> {
    render() {
        return (
            <div {...rootStyle} tabIndex={0} >
                <Paragraph />
                <Statistics />
            </div>
        )
    }

    componentWillMount() {
        document.addEventListener("focusin", this.handleFocusIn);
        document.addEventListener("focusout", this.handleFocusOut);
        document.addEventListener("keydown", this.handleKeyDown);

        this.props.loadStatsAction();
        this.props.generateParagraphAction();
    }


    componentWillUnmount() {
        document.removeEventListener("focusin", this.handleFocusIn);
        document.removeEventListener("focusout", this.handleFocusOut);
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    private handleKeyDown = (evt: KeyboardEvent) => {
        // Allow me to quickly open the devtools
        if (evt.key === "F12") {
            return;
        }

        evt.preventDefault();
        evt.stopPropagation();

        if (this.props.hasDocumentFocus) {
            // We ignore all keys except backspace when the user is at the end of a paragraph.
            // Backspace should be processed so they can go back and fix any mistakes.
            // We wait for the enter key to reset so that the user can look at their stats.
            if (this.props.isTypingComplete && evt.key !== "Backspace") {
                if (evt.key === "Enter") {
                    this.props.generateParagraphAction();
                }
            } else {
                this.props.updateLastLetter(evt.key);
            }
        }
    }

    private handleFocusIn = (_evt: FocusEvent) => {
        this.props.updateFocus(true);
    }

    private handleFocusOut = (_evt: FocusEvent) => {
        this.props.updateFocus(false);
        
    }
}

function mapStateToProps(state: IAppState, ownProps: IOwnProps): IConnectedProps & IOwnProps {
    return {
        paragraph: state.typing.paragraph,
        typedKeys: state.typing.typedKeys,
        hasDocumentFocus: state.typing.hasFocus,
        isTypingComplete: state.typing.isTypingComplete,
        ...ownProps
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAppState>): IDispatchProps {
    return {
        updateFocus: e => dispatch(updateFocusAction(e)),
        updateLastLetter: l => dispatch(updateLastLetterAction(l)),
        generateParagraphAction: () => dispatch(generateNewLessonAction() as any /* Not sure why the thunk typing is not working */),
        loadStatsAction: () => dispatch(loadStatsAction() as any /* Not sure why the thunk typing is not working */),
    };
}

export default connect<IConnectedProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(KeyduxApp);
