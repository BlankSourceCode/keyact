import { css } from "glamor";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { loadStatsAction } from "../model/actions/statsActions";
import { generateNewLessonAction, updateFocusAction, updateLastLetterAction } from "../model/actions/typingActions";
import { IAppState } from "../model/state";
import "./global.css";
import Paragraph from "./paragraph";
import Statistics from "./statistics";

interface IConnectedProps {
    paragraph: string;
    typedKeys: string;
    hasDocumentFocus: boolean;
    isTypingComplete: boolean;
}

interface IOwnProps {
}

interface IDispatchProps {
    generateParagraphAction: () => void;
    loadStatsAction: () => void;
    updateFocus: (hasFocus: boolean) => void;
    updateLastLetter: (l: string) => void;
}

type IKeyduxAppProps = IConnectedProps & IDispatchProps & IOwnProps;

const rootStyle = css({
    alignItems: "stretch",
    color: "#1e1e1e",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    fontSize: "12px",
    fontWeight: "normal",
    height: "100%",
    margin: "0",
    width: "100%",
});

class KeyduxApp extends React.PureComponent<IKeyduxAppProps> {
    public render() {
        return (
            <div {...rootStyle} tabIndex={0} >
                <Paragraph />
                <Statistics />
            </div>
        );
    }

    public componentWillMount() {
        document.addEventListener("focusin", this.handleFocusIn);
        document.addEventListener("focusout", this.handleFocusOut);
        document.addEventListener("keydown", this.handleKeyDown);

        this.props.loadStatsAction();
        this.props.generateParagraphAction();
    }

    public componentWillUnmount() {
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
        hasDocumentFocus: state.typing.hasFocus,
        isTypingComplete: state.typing.isTypingComplete,
        paragraph: state.typing.paragraph,
        typedKeys: state.typing.typedKeys,
        ...ownProps,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAppState>): IDispatchProps {
    return {
        generateParagraphAction: () => dispatch(generateNewLessonAction() as any),
        loadStatsAction: () => dispatch(loadStatsAction() as any),
        updateFocus: (e) => dispatch(updateFocusAction(e)),
        updateLastLetter: (l) => dispatch(updateLastLetterAction(l)),
    };
}

export default connect<IConnectedProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(KeyduxApp);
