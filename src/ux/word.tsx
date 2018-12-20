import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { IAppState } from "../model/state";
import { css } from "glamor";

interface IConnectedProps {
    hasDocumentFocus: boolean,
    isTypingComplete: boolean,
}

interface IOwnProps {
    word: string,
    typedWord: string,
    wpm: number,
    hasCursor: boolean,
}

interface IDispatchProps {
}

type IWordProps = IConnectedProps & IDispatchProps & IOwnProps;

const containerStyle = css({
    position: "relative",
});

const wordContainerStyle = css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    borderTop: "2px solid transparent",
    borderRadius: "6px",
    padding:"2px 0 2px 0",
});

const activeWordStyle = css({
    borderTop: "2px solid #ccc",
});

const wpmStyle = css({
    position: "relative",
    fontSize: "10px",
    lineHeight: "15px",
    textAlign: "right",
});

const letterStyle = css({
    flex: 0,
    textAlign: "center",
    height: "1em",
    borderBottom: "4px solid transparent",
    margin: "1px",
    borderRadius: "2px",
    position: "relative",
});

const activeLetterStyle = css({
    borderBottom: "4px solid #3c4858",
    animation: "blink-cursor 0.75s steps(1, end) infinite",
});

const correctLetterStyle = css({
    color: "#0e630e",
    backgroundColor: "#e7fbd3",
});

const incorrectLetterStyle = css({
    color: "#0e630e",
    backgroundColor: "#FFC0CB",
});

const fadeAnimation = (css as any).keyframes({ 
    "0%": { opacity: 1 },
    "100%": { opacity: 0 },
});

const incorrectAnimationLetterStyle = css({
    animation: `${fadeAnimation} 1s forwards`,
    backgroundColor: "#FFC0CB",
    color: "#0e630e",
    left: 0,
    position: "absolute",
});

class Word extends React.PureComponent<IWordProps> {
    render() {
        let wordStyle = wordContainerStyle;
        if (this.props.hasCursor && this.props.typedWord.length < this.props.word.length) {
            wordStyle = { ...wordStyle, ...activeWordStyle };
        }

        return (
            <div {...containerStyle}>
                {this.buildWPM()}
                <div {...wordStyle}>
                    {this.buildWord()}
                </div>
            </div>
        )
    }

    private buildWPM() {
        if (!this.props.isTypingComplete ||
            this.props.word === " " || 
            !this.props.hasCursor || 
            this.props.wpm <= 0 ||
            this.props.word !== this.props.typedWord) {
            return <div {...wpmStyle}>&nbsp;</div>;
        } else {
            return <div {...wpmStyle}>{`${this.props.wpm}wpm`}</div>;
        }
    }

    private buildWord() {
        const letters = [];
        for (let i = 0; i < this.props.word.length; i++) {
            // Get the letter to display and what the user actually typed
            const expectedLetter = this.props.word[i];
            const visualLetter = (expectedLetter === " " ? "\u00a0" : expectedLetter);
            const actualLetter = (i < this.props.typedWord.length ? this.props.typedWord[i] : "");

            const styles = this.getStyles(
                expectedLetter,
                actualLetter,
                this.props.hasCursor && i === this.props.typedWord.length);

            let wrongLetter = null;
            if (actualLetter !== "" && expectedLetter !== actualLetter)
            {
                wrongLetter = 
                    <span {...incorrectAnimationLetterStyle}>
                        {actualLetter}
                    </span>
            }

            letters.push(
                <span
                    key={i}
                    {...styles}>
                    {visualLetter}
                    {wrongLetter}
                </span>
            );
        }

        return letters;
    }

    private getStyles(expected: string, actual: string, isActiveCursor: boolean) {
        // Change the style if the user typed a correct/incorrect letter
        let typedStyle = {};
        if (actual !== "") {
            typedStyle = (actual === expected ? correctLetterStyle : incorrectLetterStyle);
        }

        let activeStyle = {};
        if (isActiveCursor && this.props.hasDocumentFocus) {
            activeStyle = activeLetterStyle;
        }

        return { ...letterStyle, ...typedStyle, ...activeStyle };
    }

}

function mapStateToProps(state: IAppState, ownProps: IOwnProps): IConnectedProps & IOwnProps {
    state;
    return {
        ...ownProps,
        hasDocumentFocus: state.typing.hasFocus,
        isTypingComplete: state.typing.isTypingComplete,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAppState>): IDispatchProps {
    dispatch;
    return {
    };
}

export default connect<IConnectedProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(Word);