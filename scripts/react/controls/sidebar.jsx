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