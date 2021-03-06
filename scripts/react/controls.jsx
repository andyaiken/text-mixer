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
            <div key={this.props.option.id} className={style} style={{ width: width }} title={this.props.option.text} onClick={e => this.props.select(this.props.option.id)}>
                <div className="hidden-sm hidden-xs">{this.props.option.text}</div>
                <div className="hidden-lg hidden-md">{smallText}</div>
            </div>
        );
    }
}

class Sidebar extends React.Component {
    render() {
        var nav = [];
        this.props.items.forEach(item => {
            nav.push(
                <SidebarLink
                    key={item.name}
                    item={item}
                />
            );
        });

        var style = "sidebar";
        if (this.props.blur) {
            style += " blur";
        }

        return (
            <div className={style} onClick={event => event.stopPropagation()}>
                <div className="title-text center noselect">
                    {this.props.title}
                </div>
                <hr />
                {nav}
            </div>
        );
    }
}

class SidebarLink extends React.Component {
    render() {
        var style = "link noselect";
        if (this.props.item.active) {
            style += " active";
        }

        return (
            <div className={style} title={this.props.item.name} onClick={this.props.item.click}>
                <img className="link-icon" src={this.props.item.icon} />
                <div className="link-text">{this.props.item.name}</div>
            </div>
        );
    }
}