"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            sources: [""],
            model: null,
            output: null,
            view: 0
        };
        return _this;
    }

    _createClass(App, [{
        key: "newSource",
        value: function newSource() {
            this.state.sources.push("");
            this.selectSource(this.state.sources.length - 1);
        }
    }, {
        key: "clearSource",
        value: function clearSource() {
            this.setContent(this.state.view, "");
        }
    }, {
        key: "closeSource",
        value: function closeSource() {
            this.state.sources.splice(this.state.view, 1);
            this.selectSource(0);
        }
    }, {
        key: "selectSource",
        value: function selectSource(index) {
            this.setState({
                view: index
            });
        }
    }, {
        key: "generateOutput",
        value: function generateOutput() {
            var model = this.state.model;
            if (!model) {
                model = buildModel(this.state.sources);
            }

            var output = generate(model, 10);

            this.setState({
                model: model,
                output: output
            });
        }
    }, {
        key: "closeModal",
        value: function closeModal() {
            this.setState({
                output: null
            });
        }
    }, {
        key: "setContent",
        value: function setContent(sourceIndex, value) {
            this.state.sources[sourceIndex] = value;
            this.setState({
                sources: this.state.sources,
                model: null
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

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
                    modalContent = React.createElement(
                        "div",
                        null,
                        React.createElement("textarea", { className: "form-control", rows: 10, value: text, readOnly: true }),
                        React.createElement("hr", null),
                        React.createElement(
                            "button",
                            { className: "btn btn-block", onClick: function onClick(e) {
                                    return _this2.generateOutput();
                                } },
                            "Generate More"
                        )
                    );
                } else {
                    modalTitle = "No Output";
                    modalContent = React.createElement(
                        "div",
                        null,
                        "I couldn't generate any output text. It might help to add more source text."
                    );
                }
            }

            var modal = null;
            if (modalTitle && modalContent) {
                modal = React.createElement(
                    "div",
                    { className: "overlay" },
                    React.createElement(
                        "div",
                        { className: "modal-container" },
                        React.createElement(
                            "div",
                            { className: "modal-all" },
                            React.createElement(
                                "div",
                                { className: "modal-title-bar" },
                                React.createElement(
                                    "div",
                                    { className: "modal-title noselect" },
                                    modalTitle
                                ),
                                React.createElement("img", { className: "modal-btn", src: "resources/close.svg", title: "Close", onClick: function onClick() {
                                        return _this2.closeModal();
                                    } })
                            ),
                            React.createElement(
                                "div",
                                { className: "modal-content-pane" },
                                modalContent
                            )
                        )
                    )
                );
            }

            var sidebarItems = [{
                name: "New Source Tab",
                icon: "resources/plus.svg",
                click: function click() {
                    return _this2.newSource();
                }
            }, {
                name: "Generate Output",
                icon: "resources/list.svg",
                click: function click() {
                    return _this2.generateOutput();
                }
            }];

            var views = [];
            for (var index = 0; index != this.state.sources.length; ++index) {
                views.push({
                    id: index,
                    text: "Source " + (1 + index),
                    smallText: "S " + (1 + index)
                });
            }

            var allowClear = this.state.sources[this.state.view] !== "";
            var allowClose = this.state.sources.length > 1;

            return React.createElement(
                "div",
                { className: "app" },
                modal,
                React.createElement(Sidebar, {
                    title: "Text Mixer",
                    blur: modal !== null,
                    items: sidebarItems
                }),
                React.createElement(
                    "div",
                    { className: modal !== null ? "page blur" : "page" },
                    React.createElement(
                        "div",
                        { className: "content scrollable" },
                        React.createElement(
                            "div",
                            { className: "col-lg-12 col-md-12 col-sm-12 col-xs-12" },
                            React.createElement(Selector, {
                                tabs: true,
                                options: views,
                                selectedID: this.state.view,
                                select: function select(optionID) {
                                    return _this2.selectSource(optionID);
                                }
                            }),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("textarea", { className: "form-control", rows: 10, placeholder: "enter text here", value: this.state.sources[this.state.view], onChange: function onChange(e) {
                                        return _this2.setContent(_this2.state.view, e.target.value);
                                    } }),
                                React.createElement("hr", null),
                                React.createElement(
                                    "div",
                                    { className: "btn-group btn-group-justified" },
                                    React.createElement(
                                        "div",
                                        { className: "btn-group" },
                                        React.createElement(
                                            "button",
                                            { className: "btn", disabled: !allowClear, onClick: function onClick(e) {
                                                    return _this2.clearSource();
                                                } },
                                            "Clear"
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "btn-group" },
                                        React.createElement(
                                            "button",
                                            { className: "btn", disabled: !allowClose, onClick: function onClick(e) {
                                                    return _this2.closeSource();
                                                } },
                                            "Close"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Selector = function (_React$Component) {
    _inherits(Selector, _React$Component);

    function Selector() {
        _classCallCheck(this, Selector);

        return _possibleConstructorReturn(this, (Selector.__proto__ || Object.getPrototypeOf(Selector)).apply(this, arguments));
    }

    _createClass(Selector, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var options = this.props.options.map(function (option) {
                return React.createElement(SelectorOption, {
                    key: option.id,
                    option: option,
                    selected: option.id === _this2.props.selectedID,
                    count: _this2.props.options.length,
                    select: function select(optionID) {
                        return _this2.props.select(optionID);
                    }
                });
            });

            return React.createElement(
                "div",
                { className: "selector" },
                options
            );
        }
    }]);

    return Selector;
}(React.Component);

var SelectorOption = function (_React$Component2) {
    _inherits(SelectorOption, _React$Component2);

    function SelectorOption() {
        _classCallCheck(this, SelectorOption);

        return _possibleConstructorReturn(this, (SelectorOption.__proto__ || Object.getPrototypeOf(SelectorOption)).apply(this, arguments));
    }

    _createClass(SelectorOption, [{
        key: "render",
        value: function render() {
            var _this4 = this;

            var width = "calc((100% - 1px) / " + this.props.count + ")";

            var style = "option noselect";
            if (this.props.selected) {
                style += " selected";
            }

            var smallText = this.props.option.text;
            if (this.props.option.smallText) {
                smallText = this.props.option.smallText;
            }

            return React.createElement(
                "div",
                { key: this.props.option.id, className: style, style: { width: width }, title: this.props.option.text, onClick: function onClick(e) {
                        return _this4.props.select(_this4.props.option.id);
                    } },
                React.createElement(
                    "div",
                    { className: "hidden-sm hidden-xs" },
                    this.props.option.text
                ),
                React.createElement(
                    "div",
                    { className: "hidden-lg hidden-md" },
                    smallText
                )
            );
        }
    }]);

    return SelectorOption;
}(React.Component);

var Sidebar = function (_React$Component3) {
    _inherits(Sidebar, _React$Component3);

    function Sidebar() {
        _classCallCheck(this, Sidebar);

        return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
    }

    _createClass(Sidebar, [{
        key: "render",
        value: function render() {
            var nav = [];
            this.props.items.forEach(function (item) {
                nav.push(React.createElement(SidebarLink, {
                    key: item.name,
                    item: item
                }));
            });

            var style = "sidebar";
            if (this.props.blur) {
                style += " blur";
            }

            return React.createElement(
                "div",
                { className: style, onClick: function onClick(event) {
                        return event.stopPropagation();
                    } },
                React.createElement(
                    "div",
                    { className: "title-text center noselect" },
                    this.props.title
                ),
                React.createElement("hr", null),
                nav
            );
        }
    }]);

    return Sidebar;
}(React.Component);

var SidebarLink = function (_React$Component4) {
    _inherits(SidebarLink, _React$Component4);

    function SidebarLink() {
        _classCallCheck(this, SidebarLink);

        return _possibleConstructorReturn(this, (SidebarLink.__proto__ || Object.getPrototypeOf(SidebarLink)).apply(this, arguments));
    }

    _createClass(SidebarLink, [{
        key: "render",
        value: function render() {
            var style = "link noselect";
            if (this.props.item.active) {
                style += " active";
            }

            return React.createElement(
                "div",
                { className: style, title: this.props.item.name, onClick: this.props.item.click },
                React.createElement("img", { className: "link-icon", src: this.props.item.icon }),
                React.createElement(
                    "div",
                    { className: "link-text" },
                    this.props.item.name
                )
            );
        }
    }]);

    return SidebarLink;
}(React.Component);
