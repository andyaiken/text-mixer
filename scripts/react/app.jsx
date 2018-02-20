class App extends React.Component {
    constructor() {
        super();

        this.state = {
            sources: [""],
            output: null,
            view: 0
        };
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
        this.setState({
            sources: this.state.sources
        });
    }

    render() {
        var modalTitle = null;
        var modalContent = null;

        if (this.state.output) {
            var text = "";
            for (var index = 0; index != this.state.output.length; ++index) {
                var line = this.state.output[index];
                if (text) {
                    text += "\n";
                }
                text += line;
            }
            if (text) {
                modalTitle = "Output";
                modalContent = (
                    <textarea className="form-control" rows={10} value={text} readOnly />
                );
            } else {
                modalTitle = "No Output";
                modalContent = (
                    <div>
                        I couldn't generate any output text. It might help to add more source text.
                    </div>
                );
            }
        }

        var modal = null;
        if (modalTitle && modalContent) {
            modal = (
                <div className="overlay">
                    <div className="modal-container">
                        <div className="modal-all">
                            <div className="modal-title-bar">
                                <div className="modal-title noselect">{modalTitle}</div>
                                <img className="modal-btn" src="resources/close.svg" title="Close" onClick={() => this.closeModal()} />
                            </div>
                            <div className="modal-content-pane">{modalContent}</div>
                        </div>
                    </div>
                </div>
            );
        }

        var sidebarItems = [
            {
                name: "New Source Tab",
                icon: "resources/plus.svg",
                click: () => this.newSource()
            },
            {
                name: "Generate Output",
                icon: "resources/list.svg",
                click: () => this.generateOutput()
            }
        ];

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

        return (
            <div className="app">
                {modal}
                <Sidebar
                    title="Text Mixer"
                    blur={modal !== null}
                    items={sidebarItems}
                />
                <div className={modal !== null ? "page blur" : "page"}>
                    <div className="content scrollable">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <Selector
                                tabs={true}
                                options={views}
                                selectedID={this.state.view}
                                select={optionID => this.selectSource(optionID)}
                            />
                            <div>
                                <textarea className="form-control" rows={10} placeholder="enter text here" value={this.state.sources[this.state.view]} onChange={e => this.setContent(this.state.view, e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}