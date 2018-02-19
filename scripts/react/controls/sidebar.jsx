class Sidebar extends React.Component {
    render() {
        try {
            var nav = [];
            var hrIndex = 0;
            this.props.items.forEach(item => {
                if (item === null) {
                    nav.push(
                        <hr key={hrIndex} />
                    );
                    hrIndex += 1;
                } else {
                    nav.push(
                        <SidebarLink
                            key={item.name}
                            item={item}
                            mode={this.props.mode}
                        />
                    );
                }
            });

            var style = "sidebar";
            if (this.props.mode === "mini") {
                style += " mini";
            } else {
                style += " full";
            }

            if (this.props.blur) {
                style += " blur";
            }

            return (
                <div className={style} onClick={event => event.stopPropagation()}>
                    <div className="menu-button" onClick={() => this.props.toggleSidebar()}>
                        <img className="image" src="resources/menu.svg" />
                    </div>
                    <hr />
                    {nav}
                </div>
            );
        } catch (ex) {
            log(ERROR_RENDERING, ex);
            return null;
        }
    }
}

class SidebarLink extends React.Component {
    render() {
        try {
            var style = "link noselect";
            if (this.props.item.active) {
                style += " active";
            }
            if (this.props.item.noInvert) {
                style += " noinvert";
            }

            var text = null;
            if (this.props.mode === "full") {
                text = (
                    <div className="link-text">{this.props.item.name}</div>
                );
            }

            return (
                <div className={style} title={this.props.item.name} onClick={this.props.item.click}>
                    <img className="link-icon" src={this.props.item.icon} />
                    {text}
                </div>
            );
        } catch (ex) {
            log(ERROR_RENDERING, ex);
            return null;
        }
    }
}