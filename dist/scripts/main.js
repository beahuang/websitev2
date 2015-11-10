(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var App = require('./views.jsx');
React.render(React.createElement(App, null), document.getElementById('container'));

},{"./views.jsx":2}],2:[function(require,module,exports){
var App = React.createClass({displayName: "App",
	mixins: [ReactFireMixin],
	getInitialState: function() {
		return {
			devProjects: [],
			desProjects: [],
			about: []
		};
	},
	componentWillMount: function() {
		var firebaseRef = new Firebase("https://flickering-fire-8802.firebaseio.com/devProjects");
		this.bindAsArray(firebaseRef, "devProjects");
		var firebaseRef2 = new Firebase("https://flickering-fire-8802.firebaseio.com/desProjects");
		this.bindAsArray(firebaseRef2, "desProjects");
		var firebaseRef3 = new Firebase("https://flickering-fire-8802.firebaseio.com/about");
		this.bindAsArray(firebaseRef3, "about");
	},
	showLeft: function() {
		this.refs.dev.show();
		this.refs.main.slideRight();
	},
	showRight: function() {
		this.refs.des.show();
		this.refs.main.slideLeft();
	},
	showTop: function() {
		this.refs.about.show();
		this.refs.main.slideDown();
	},
	reset: function() {
		this.refs.main.reset();
		this.refs.dev.hide();
		this.refs.des.hide();
		this.refs.about.hide();
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(Nav, {showLeft: this.showLeft, showRight: this.showRight, reset: this.reset}), 
				React.createElement(Panel, {ref: "about", alignment: "top", id: "aboutPanel"}, 
					React.createElement(About, {about: this.state.about})
				), 
				React.createElement(MainPanel, {ref: "main", onClick: "{this.reset}"}, 
					React.createElement(Header, {showTop: this.showTop, reset: this.reset}), 
					React.createElement(Social, null), 
					React.createElement(Form, null)
				), 
				React.createElement(Panel, {ref: "dev", alignment: "left", id: "devPanel"}, 
					React.createElement(Project, {projects: this.state.devProjects})
				), 
				React.createElement(Panel, {ref: "des", alignment: "right", id: "desPanel"}, 
					React.createElement(Project, {projects: this.state.desProjects})
				)
			)
		);
	}
});

var Nav = React.createClass({displayName: "Nav",
	getInitialState: function() {
		return {
			direction: ""
		};
	},
	devOpen: function() {
		if(this.state.direction == "right") {
			this.setState({direction: ""});
			this.props.reset();
		} else {
			this.setState({direction: "right"});
			this.props.showLeft();
		}
	},
	desOpen: function() {
		if(this.state.direction == "left") {
			this.setState({direction: ""});
			this.props.reset();
		} else {
			this.setState({direction: "left"});
			this.props.showRight();
		}
	},
	render: function() {
		return (
			React.createElement("nav", null, 
				React.createElement("ul", null, 
					React.createElement("li", {className: (this.state.direction) + " devbtn", onClick: this.devOpen}, React.createElement("a", null, "Code")), 
					React.createElement("li", {className: (this.state.direction) + " desbtn", onClick: this.desOpen}, React.createElement("a", null, "Design"))
				)
			)
		);
	}
});

var Panel = React.createClass({displayName: "Panel",
	getInitialState: function() {
		return {
			visible: false
		};
	},

	show: function() {
		this.setState({ visible: true });
		document.body.className = "panel-open";
	},

	hide: function() {
		this.setState({ visible: false });
		document.body.className = "";
	},

	returnTitle: function() {
		if (this.props.id == "devPanel") {
			return React.createElement("h2", {className: "title"}, "Code Projects")
		} else if (this.props.id == "desPanel") {
			return React.createElement("h2", {className: "title"}, "Design Projects")
		}
	},

	render: function() {
		return (
			React.createElement("div", {className: "panel"}, 
				React.createElement("div", {className: (this.state.visible ? "visible " : "") + this.props.alignment + " " + this.props.id}, 
					this.returnTitle(), 
					this.props.children
				)
			)
		);
	}
});

var Project = React.createClass({displayName: "Project",
	render: function() {
	  var createProject = function(project, i) {

  		if (project.link) {
  			var href = project.link
  			var show = true
  		}

		return (
			React.createElement("div", {className: "project", key: i}, 
				React.createElement("img", {className: "teaser-img", src: project.image.image1}), 
				React.createElement("div", {className: "project-desc"}, 
					React.createElement("h3", null, project.name), 
					React.createElement("p", {className: "desc-text"}, project.description), 
					React.createElement("p", {className: "desc-tags"}, React.createElement("b", null, "Technology:"), " ", project.technology), 
					React.createElement("a", {className: show ? "btn show" : "hide", href: href, target: "_blank"}, "See More")
				)
			)
		);
	  };
	  return React.createElement("ul", null, this.props.projects.map(createProject));
	}
});

var About = React.createClass({displayName: "About",
	// render: function() {
	// 	return (
	// 		<div className="about">
	// 			<h2>{this.props.about}</h2>
	// 			<img/>
	// 			<p>I'm a web developer and a designer pursuing a degree in Computer Science and Interactive Media at Northeastern Unviersity but I'm currently studying abroad in Melbourne, Australia. I believe that any project can be 100x better with a good design. The best way to learn is by doing, so please drop me a message at huang.be@husky.neu.edu if you have a cool project you'd like to share!</p>
	// 		</div>
	// 	);
	// }
	render: function() {
	  var createAbout = function(about, i) {
		return (
			React.createElement("div", {className: "about-wrapper", key: "i"}, 
				React.createElement("h2", null, about.tagline), 
				React.createElement("p", null, about.description), 
				React.createElement("p", null, about.technology)
			)
		);
	  };
	  return React.createElement("div", {className: "about"}, this.props.about.map(createAbout));
	}
});

var MainPanel = React.createClass({displayName: "MainPanel",
	getInitialState: function() {
		return {
			getMovement: ""
		}
	},
	slideLeft: function() {
		this.setState({getMovement:"slideLeft"})
	},
	slideRight: function(){
		this.setState({getMovement:"slideRight"})
	},
	slideDown: function(){
		this.setState({getMovement:"slideDown"})
	},
	reset: function() {
		this.setState({getMovement:""})
	},
	render: function(){
		return (
			React.createElement("section", {id: "mainPanel", className: this.state.getMovement}, 
				this.props.children
			)
		);
	}
});
var Header = React.createClass({displayName: "Header",
	getInitialState: function() {
		return {
			aboutVisible: false
		};
	},
	aboutOpen: function() {
		if(this.state.aboutVisible) {
			this.setState({aboutVisible: false});
			this.props.reset();
		} else {
			this.setState({aboutVisible: true});
			this.props.showTop();
		}
	},
	render: function(){
		return (
			React.createElement("header", null, 
				React.createElement("h1", null, "Beatrice Huang"), 
				React.createElement("div", {className: "logoContainer"}, 
					React.createElement("h3", null, "Developer"), 
					React.createElement("span", {className: (this.state.aboutVisible ? "about-visible " : "") + "logo", onClick: this.aboutOpen}, React.createElement("img", {src: "dist/images/me.png"})), 
					React.createElement("h3", null, "Designer")
				), 
				React.createElement("span", {className: "resume"}, 
					React.createElement("a", {href: "dist/resume.pdf", className: "btn"}, "Resume")
				)
			)
		);
	}
});
var Social = React.createClass({displayName: "Social",
	render: function(){
		return (
			React.createElement("section", {className: "social"}, 
				React.createElement("ul", null, 
					React.createElement("a", {href: "mailto:huang.be@husky.neu.edu"}, React.createElement("li", {className: "icon-email"})), 
					React.createElement("a", {href: "http://www.linkedin.com/pub/beatrice-huang/7b/627/1b9", target: "_blank"}, 
						React.createElement("li", {className: "icon-linkedin"})
					), 
					React.createElement("a", {href: "https://github.com/beahuang", target: "_blank"}, 
						React.createElement("li", {className: "icon-github"})
					)
				)
			)
		);
	}
});
var Form = React.createClass({displayName: "Form",
	render: function(){
		return (
			React.createElement("section", {className: "contact-form"}, 
				React.createElement("form", {action: "//formspree.io/huang.be@husky.neu.edu", 
					  method: "POST"}, 
					React.createElement("h3", null, "Get in touch!"), 
					React.createElement("p", null, "Interested in working together? Send me a message!"), 
					React.createElement("input", {type: "text", name: "name", placeholder: "NAME"}), 
					React.createElement("input", {type: "email", name: "_replyto", placeholder: "EMAIL"}), 
					React.createElement("input", {type: "text", name: "_gotcha", className: "hidden"}), 
					React.createElement("textarea", {type: "text", name: "message", placeholder: "SEND ME A MESSAGE!"}), 
					React.createElement("button", {type: "submit", value: "Send", className: "btn"}, "Submit")
				)
			)
		);
	}
});

module.exports = App;

},{}]},{},[1]);
