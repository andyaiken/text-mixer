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
            output: null,
            view: 0,
            showSidebar: false
        };
        return _this;
    }

    _createClass(App, [{
        key: "toggleSidebar",
        value: function toggleSidebar() {
            this.setState({
                showSidebar: !this.state.showSidebar
            });
        }
    }, {
        key: "newSource",
        value: function newSource() {
            this.state.sources.push("");
            this.selectSource(this.state.sources.length - 1);
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
            var output = generate(this.state.sources);

            this.setState({
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
            this.setState(this.state);
        }
    }, {
        key: "nudgeValue",
        value: function nudgeValue(source, name, delta) {
            var value = source[name] + delta;
            this.changeValue(source, name, value);
        }
    }, {
        key: "changeValue",
        value: function changeValue(source, name, value) {
            if (source) {
                source[name] = value;
            }
            this.setState(this.state);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var modal = null;
            if (this.state.output) {
                var lines = [];
                for (var index = 0; index != this.state.output.length; ++index) {
                    var line = this.state.output[index];
                    lines.push(React.createElement(
                        "div",
                        { key: index },
                        line
                    ));
                }
                modal = React.createElement(
                    "div",
                    { className: "overlay" },
                    React.createElement(
                        "div",
                        { className: "modal-container" },
                        React.createElement(
                            "div",
                            { className: "modal-title-bar" },
                            React.createElement(
                                "div",
                                { className: "modal-title noselect" },
                                "Output"
                            ),
                            React.createElement("img", { className: "modal-btn", src: "resources/close.svg", title: "Close", onClick: function onClick() {
                                    return _this2.closeModal();
                                } })
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-content-pane" },
                            lines
                        )
                    )
                );
            }

            var sidebarItems = [{
                name: "New Source",
                icon: "resources/plus.svg",
                click: function click() {
                    return _this2.newSource();
                }
            }, {
                name: "Generate Output",
                icon: "resources/party.svg",
                click: function click() {
                    return _this2.generateOutput();
                }
            }];

            var sidebarFull = null;
            var sidebarMini = null;
            if (this.state.showSidebar) {
                sidebarFull = React.createElement(
                    "div",
                    { className: "overlay", onClick: function onClick() {
                            return _this2.toggleSidebar();
                        } },
                    React.createElement(Sidebar, {
                        mode: "full",
                        items: sidebarItems,
                        options: this.state.options,
                        toggleSidebar: function toggleSidebar() {
                            return _this2.toggleSidebar();
                        }
                    })
                );
            }
            sidebarMini = React.createElement(Sidebar, {
                mode: "mini",
                blur: modal !== null,
                items: sidebarItems,
                options: this.state.options,
                toggleSidebar: function toggleSidebar() {
                    return _this2.toggleSidebar();
                }
            });

            var views = [];
            for (var index = 0; index != this.state.sources.length; ++index) {
                views.push({
                    id: index,
                    text: "Source " + (1 + index),
                    smallText: "S " + (1 + index)
                });
            }

            var content = React.createElement(
                "div",
                null,
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
                        React.createElement("textarea", { className: "form-control", rows: 10, placeholder: "text", value: this.state.sources[this.state.view], onChange: function onChange(e) {
                                return _this2.setContent(_this2.state.view, e.target.value);
                            } })
                    )
                )
            );

            return React.createElement(
                "div",
                { className: "app" },
                sidebarFull,
                modal,
                sidebarMini,
                React.createElement(
                    "div",
                    { className: this.state.showSidebar ? "page blur" : "page" },
                    React.createElement(
                        "div",
                        { className: "content scrollable" },
                        content
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

            try {
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
            } catch (ex) {
                log(ERROR_RENDERING, ex);
                return null;
            }
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
        key: "click",
        value: function click(e) {
            e.stopPropagation();
            this.props.select(this.props.option.id);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            try {
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
                            return _this4.click(e);
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
            } catch (ex) {
                log(ERROR_RENDERING, ex);
                return null;
            }
        }
    }]);

    return SelectorOption;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_React$Component) {
    _inherits(Sidebar, _React$Component);

    function Sidebar() {
        _classCallCheck(this, Sidebar);

        return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
    }

    _createClass(Sidebar, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            try {
                var nav = [];
                var hrIndex = 0;
                this.props.items.forEach(function (item) {
                    if (item === null) {
                        nav.push(React.createElement("hr", { key: hrIndex }));
                        hrIndex += 1;
                    } else {
                        nav.push(React.createElement(SidebarLink, {
                            key: item.name,
                            item: item,
                            mode: _this2.props.mode
                        }));
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

                return React.createElement(
                    "div",
                    { className: style, onClick: function onClick(event) {
                            return event.stopPropagation();
                        } },
                    React.createElement(
                        "div",
                        { className: "menu-button", onClick: function onClick() {
                                return _this2.props.toggleSidebar();
                            } },
                        React.createElement("img", { className: "image", src: "resources/menu.svg" })
                    ),
                    React.createElement("hr", null),
                    nav
                );
            } catch (ex) {
                log(ERROR_RENDERING, ex);
                return null;
            }
        }
    }]);

    return Sidebar;
}(React.Component);

var SidebarLink = function (_React$Component2) {
    _inherits(SidebarLink, _React$Component2);

    function SidebarLink() {
        _classCallCheck(this, SidebarLink);

        return _possibleConstructorReturn(this, (SidebarLink.__proto__ || Object.getPrototypeOf(SidebarLink)).apply(this, arguments));
    }

    _createClass(SidebarLink, [{
        key: "render",
        value: function render() {
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
                    text = React.createElement(
                        "div",
                        { className: "link-text" },
                        this.props.item.name
                    );
                }

                return React.createElement(
                    "div",
                    { className: style, title: this.props.item.name, onClick: this.props.item.click },
                    React.createElement("img", { className: "link-icon", src: this.props.item.icon }),
                    text
                );
            } catch (ex) {
                log(ERROR_RENDERING, ex);
                return null;
            }
        }
    }]);

    return SidebarLink;
}(React.Component);
