class Selector extends React.Component {
    render() {
        var options = this.props.options.map(option => {
            return (
                <SelectorOption
                    key={option.id}
                    option={option}
                    selected={option.id === this.props.selectedID}
                    count={this.props.options.length}
                    select={optionID => this.props.select(optionID)}
                />
            );
        });

        return (
            <div className="selector">
                {options}
            </div>
        );
    }
}

class SelectorOption extends React.Component {
    click(e) {
        e.stopPropagation();
        this.props.select(this.props.option.id);
    }

    render() {
        var width = "calc((100% - 1px) / " + this.props.count + ")";

        var style = "option noselect";
        if (this.props.selected) {
            style += " selected";
        }

        var smallText = this.props.option.text;
        if (this.props.option.smallText) {
            smallText = this.props.option.smallText;
        }

        return (
            <div key={this.props.option.id} className={style} style={{ width: width }} title={this.props.option.text} onClick={e => this.click(e)}>
                <div className="hidden-sm hidden-xs">{this.props.option.text}</div>
                <div className="hidden-lg hidden-md">{smallText}</div>
            </div>
        );
    }
}