class App extends React.Component {
    constructor() {
        super();

        this.state = {
            sources: [""],
            output: null,
            view: 0,
            showSidebar: false
        };
    }

    toggleSidebar() {
        this.setState({
            showSidebar: !this.state.showSidebar
        });
    }

    newSource() {
        this.state.sources.push("");
        this.selectSource(this.state.sources.length - 1);
    }

    selectSource(index) {
        this.setState({
            view: index
        });
    }

    generateOutput() {
        var output = generate(this.state.sources);

        this.setState({
            output: output
        });
    }

    closeModal() {
        this.setState({
            output: null
        });
    }

    setContent(sourceIndex, value) {
        this.state.sources[sourceIndex] = value;
        this.setState(this.state);
    }

    nudgeValue(source, name, delta) {
        var value = source[name] + delta;
        this.changeValue(source, name, value);
    }

    changeValue(source, name, value) {
        if (source) {
            source[name] = value;
        }
        this.setState(this.state);
    }

    render() {
        var modal = null;
        if (this.state.output) {
            var lines = [];
            for (var index = 0; index != this.state.output.length; ++index) {
                var line = this.state.output[index];
                lines.push(
                    <div key={index}>
                        {line}
                    </div>
                );
            }
            modal = (
                <div className="overlay">
                    <div className="modal-container">
                        <div className="modal-title-bar">
                            <div className="modal-title noselect">Output</div>
                            <img className="modal-btn" src="resources/close.svg" title="Close" onClick={() => this.closeModal()} />
                        </div>
                        <div className="modal-content-pane">
                            {lines}
                        </div>
                    </div>
                </div>
            );
        }

        var sidebarItems = [
            {
                name: "New Source",
                icon: "resources/plus.svg",
                click: () => this.newSource()
            },
            {
                name: "Generate Output",
                icon: "resources/party.svg",
                click: () => this.generateOutput()
            }
        ];

        var sidebarFull = null;
        var sidebarMini = null;
        if (this.state.showSidebar) {
            sidebarFull = (
                <div className="overlay" onClick={() => this.toggleSidebar()}>
                    <Sidebar
                        mode="full"
                        items={sidebarItems}
                        options={this.state.options}
                        toggleSidebar={() => this.toggleSidebar()}
                    />
                </div>
            );
        }
        sidebarMini = (
            <Sidebar
                mode="mini"
                blur={modal !== null}
                items={sidebarItems}
                options={this.state.options}
                toggleSidebar={() => this.toggleSidebar()}
            />
        );

        var views = [];
        for (var index = 0; index != this.state.sources.length; ++index) {
            views.push(
                {
                    id: index,
                    text: "Source " + (1 + index),
                    smallText: "S " + (1 + index)
                }
            );
        }

        var content = (
            <div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Selector
                        tabs={true}
                        options={views}
                        selectedID={this.state.view}
                        select={optionID => this.selectSource(optionID)}
                    />
                    <div>
                        <textarea className="form-control" rows={10} placeholder="text" value={this.state.sources[this.state.view]} onChange={e => this.setContent(this.state.view, e.target.value)} />
                    </div>
                </div>
            </div>
        );

        return (
            <div className="app">
                {sidebarFull}
                {modal}
                {sidebarMini}
                <div className={this.state.showSidebar ? "page blur" : "page"}>
                    <div className="content scrollable">{content}</div>
                </div>
            </div>
        );
    }
}