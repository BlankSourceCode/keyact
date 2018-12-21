import { css } from "glamor";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { IAppState } from "../model/state";
import Word from "./word";

interface IConnectedProps {
    accuracy: number;
    hasDocumentFocus: boolean;
    isTypingComplete: boolean;
    paragraph: string;
    typedKeys: string;
    wordsCorrection: number[];
    wordsWPM: number[];
    wpm: number;
}

interface IOwnProps {
}

interface IDispatchProps {
}

type IParagraphProps = IConnectedProps & IDispatchProps & IOwnProps;

const containerStyle = css({
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    flexWrap: "no-wrap",
    margin: "auto",
    marginTop: "180px",
});

const statsContainerStyle = css({
    alignSelf: "flex-end",
    color: "#333333",
    display: "flex",
    flexDirection: "row",
    flexShrink: 0,
    flexWrap: "nowrap",
    fontSize: "20px",
    marginBottom: "10px",
});

const statsStyle = css({
    marginLeft: "20px",
});

const paragraphStyle = css({
    alignContent: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: "6px",
    boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.14)",
    color: "#333333",
    display: "flex",
    flex: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: "42px",
    fontWeight: "normal",
    height: "330px",
    lineHeight: "1em",
    margin: "auto",
    padding: "15px 10px",
    position: "relative",
    width: "800px",
});

const paragraphNoFocusStyle = css({
    color: "#CCCCCC",
});

const messageStyle = css({
    bottom: "-5px",
    color: "#333333",
    fontSize: "20px",
    position: "absolute",
    textAlign: "center",
    width: "100%",
});

class Paragraph extends React.PureComponent<IParagraphProps> {
    public render() {
        let wordsStyle = paragraphStyle;
        if (!this.props.hasDocumentFocus) {
            wordsStyle = { ...paragraphNoFocusStyle, ...paragraphStyle };
        }

        const showDone = this.props.hasDocumentFocus && this.props.isTypingComplete;
        const showActivate = !this.props.hasDocumentFocus;

        return (
            <div {...containerStyle}>
                <div {...statsContainerStyle}>
                    <div {...statsStyle}>
                        {this.buildWPM()}
                    </div>
                    <div {...statsStyle}>
                        {this.buildAccuracy()}
                    </div>
                </div>
                <div {...wordsStyle}>
                    {this.buildWords()}
                    {showDone ? <div {...messageStyle}>Done. Type 'Enter' to restart.</div> : null}
                    {showActivate ? <div {...messageStyle}>Click to activate...</div> : null}
                </div>
            </div>
        );
    }

    private buildWPM() {
        return <span>speed: {this.props.wpm.toFixed(0)}<sup> wpm</sup></span>;
    }

    private buildAccuracy() {
        return <span>accuracy: {this.props.accuracy.toFixed(2)}%<sup/></span>;
    }

    private buildWords() {
        const children = [];

        const cursorIndex = this.props.typedKeys.length;
        let wordIndex = 0;
        let word = "";
        let typedWord = "";

        for (let i = 0; i < this.props.paragraph.length; i++) {
            const expectedLetter = this.props.paragraph[i];
            const typedLetter = (i < this.props.typedKeys.length ? this.props.typedKeys[i] : "");

            if (expectedLetter === " ") {
                // Add the word
                children.push(
                    <Word
                        key={children.length}
                        word={word}
                        typedWord={typedWord}
                        wpm={i < this.props.typedKeys.length ? this.getWPM(wordIndex) : 0}
                        hasCursor={i - word.length - 1 < cursorIndex}
                        correctionCount={this.getCorrectionCount(wordIndex)}
                    />,
                );

                // Add the space
                children.push(
                    <Word
                        key={children.length}
                        word=" "
                        typedWord={typedLetter}
                        wpm={0}
                        hasCursor={i === cursorIndex}
                        correctionCount={0}
                    />,
                );

                // Reset the strings
                word = "";
                typedWord = "";
                wordIndex++;
            } else {
                word += expectedLetter;
                typedWord += (typedLetter !== null ? typedLetter : "");
            }
        }

        // Add the final word
        if (word !== "") {
            children.push(
                <Word
                    key={children.length}
                    word={word}
                    typedWord={typedWord}
                    wpm={this.getWPM(wordIndex)}
                    hasCursor={this.props.paragraph.length - word.length - 1 < cursorIndex}
                    correctionCount={this.getCorrectionCount(wordIndex)}
                />,
            );
        }

        return children;
    }

    private getWPM(wordIndex: number) {
        if (wordIndex < this.props.wordsWPM.length) {
            return this.props.wordsWPM[wordIndex];
        } else {
            return 0;
        }
    }

    private getCorrectionCount(wordIndex: number) {
        if (wordIndex < this.props.wordsCorrection.length) {
            return this.props.wordsCorrection[wordIndex];
        } else {
            return 0;
        }
    }
}

function mapStateToProps(state: IAppState, ownProps: IOwnProps): IConnectedProps & IOwnProps {
    return {
        accuracy: state.typing.accuracy,
        hasDocumentFocus: state.typing.hasFocus,
        isTypingComplete: state.typing.isTypingComplete,
        paragraph: state.typing.paragraph,
        typedKeys: state.typing.typedKeys,
        wordsCorrection: state.typing.wordsCorrection.toJS(),
        wordsWPM: state.typing.wordsWPM.toJS(),
        wpm: state.typing.wpm,
        ...ownProps,
    };
}

function mapDispatchToProps(_dispatch: Dispatch<IAppState>): IDispatchProps {
    return {
    };
}

export default connect<IConnectedProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(Paragraph);
