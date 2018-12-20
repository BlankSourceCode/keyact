import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { IAppState } from "../model/state";
import Word from "./word";
import { css } from "glamor";

interface IConnectedProps {
    paragraph: string,
    typedKeys: string,
    wordsWPM: number[],
    accuracy: number,
    wpm: number,
    hasDocumentFocus: boolean,
    isTypingComplete: boolean,
}

interface IOwnProps {
}

interface IDispatchProps {
}

type IParagraphProps = IConnectedProps & IDispatchProps & IOwnProps;

const containerStyle = css({
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    margin: "auto",
    marginTop: "180px",
});

const statsContainerStyle = css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignSelf: "flex-end",
    fontSize: "20px",
    marginBottom: "10px",
    color: "#333333",
});

const statsStyle = css({
    marginLeft: "20px",
});

const paragraphStyle = css({
    position: "relative",
    flex: 0,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    margin: "auto",
    width: "800px",
    height: "330px",
    color: "#333333",
    backgroundColor: "#FFFFFF",
    borderRadius: "6px",
    boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.14)",
    padding: "15px 10px",
    fontSize: "42px",
    fontWeight: "normal",
    lineHeight: "1em",
});

const paragraphNoFocusStyle = css({
    color: "#CCCCCC",
});

const messageStyle = css({
    position: "absolute",
    bottom: "-5px",
    color: "#333333",
    textAlign: "center",
    width: "100%",
    fontSize: "20px"
});

class Paragraph extends React.PureComponent<IParagraphProps> {
    render() {
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
                    { showDone ? <div {...messageStyle}>Done. Type 'Enter' to restart.</div> : null }
                    { showActivate ? <div {...messageStyle}>Click to activate...</div> : null }
                </div>
            </div>
        )
    }

    private buildWPM() {
        return <span>speed: {this.props.wpm.toFixed(0)}<sup> wpm</sup></span>;
    }

    private buildAccuracy() {
        return <span>accuracy: {this.props.accuracy.toFixed(2)}%<sup></sup></span>;
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
                        wpm={i < this.props.typedKeys.length ? this.getWPM(wordIndex): 0}
                        hasCursor={i - word.length - 1 < cursorIndex} />
                );

                // Add the space
                children.push(
                    <Word
                        key={children.length}
                        word=" "
                        typedWord={typedLetter}
                        wpm={0}
                        hasCursor={i === cursorIndex}
                    />
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
                    hasCursor={this.props.paragraph.length - word.length - 1 < cursorIndex} />
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
}

function mapStateToProps(state: IAppState, ownProps: IOwnProps): IConnectedProps & IOwnProps {
    return {
        paragraph: state.typing.paragraph,
        typedKeys: state.typing.typedKeys,
        wordsWPM: state.typing.wordsWPM.toJS(),
        accuracy: state.typing.accuracy,
        wpm: state.typing.wpm,
        hasDocumentFocus: state.typing.hasFocus,
        isTypingComplete: state.typing.isTypingComplete,
        ...ownProps
    };
}

function mapDispatchToProps(dispatch: Dispatch<IAppState>): IDispatchProps {
    dispatch;
    return {
    };
}

export default connect<IConnectedProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(Paragraph);