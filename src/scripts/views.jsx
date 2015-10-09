var App = React.createClass({
	mixins: [ReactFireMixin],
	getInitialState: function() {
		return {
			devProjects: [],
			desProjects: []
		};
	},
	componentWillMount: function() {
		var firebaseRef = new Firebase("https://flickering-fire-8802.firebaseio.com/devProjects");
		this.bindAsArray(firebaseRef, "devProjects");
		var firebaseRef2 = new Firebase("https://flickering-fire-8802.firebaseio.com/desProjects");
		this.bindAsArray(firebaseRef2, "desProjects");
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
			<div>
				<Nav showLeft={this.showLeft} showRight={this.showRight} reset={this.reset}></Nav>
				<Panel ref="about" alignment="top" id="aboutPanel"></Panel>
				<MainPanel ref="main" onClick="{this.reset}">
					<Header showTop={this.showTop} reset={this.reset}></Header>
					<Social></Social>
					<Form></Form>
				</MainPanel>
				<Panel ref="dev" alignment="left" id="devPanel">
					<Project projects={this.state.devProjects}></Project>
				</Panel>
				<Panel ref="des" alignment="right" id="desPanel">
					<Project projects={this.state.desProjects}></Project>
				</Panel>
			</div>
		);
	}
});

var Nav = React.createClass({
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
			<nav>
				<ul>
					<li className={(this.state.direction) + " devbtn"} onClick={this.devOpen}><a>Code</a></li>
					<li className={(this.state.direction) + " desbtn"} onClick={this.desOpen}><a>Design</a></li>
				</ul>
			</nav>
		);
	}
});

var Panel = React.createClass({
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

	render: function() {
		return (
			<div className="panel">
				<div className={(this.state.visible ? "visible " : "") + this.props.alignment + " " + this.props.id}>{this.props.children}</div>
			</div>
		);
	}
});

var Project = React.createClass({
	render: function() {
	  var createProject = function(project, i) {
		return (
			<div className="project" key={i}>
				<p>{project.name}</p>
				<p>{project.image.image1}</p>
				<p>{project.description}</p>
				<p>{project.technology}</p>
				<p>{project.link}</p>
			</div>
		);
	  };
	  return <ul>{this.props.projects.map(createProject)}</ul>;
	}
});

var MainPanel = React.createClass({
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
			<section id="mainPanel" className={this.state.getMovement}>
				{this.props.children}
			</section>
		);
	}
});
var Header = React.createClass({
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
			<header>
				<h1>Beatrice Huang</h1>
				<div className="logoContainer">
					<h3>Developer</h3>
					<span className={(this.state.aboutVisible ? "about-visible " : "") + "logo"} onClick={this.aboutOpen}><img src="dist/images/me.png"/></span>
					<h3>Designer</h3>
				</div>
				<span className="resume">
					<a href="dist/resume.pdf" className="btn">Resume</a>
				</span>
			</header>
		);
	}
});
var Social = React.createClass({
	render: function(){
		return (
			<section className="social">
				<ul>
					<a href="google.com"><li className="icon-email"></li></a>
					<a href="google.com"><li className="icon-linkedin"></li></a>
					<a href="google.com"><li className="icon-github"></li></a>
				</ul>
			</section>
		);
	}
});
var Form = React.createClass({
	render: function(){
		return (
			<section className="contact-form">
				<form action="//formspree.io/huang.be@husky.neu.edu"
					  method="POST">
					<h3>Get in touch!</h3>
					<p>Interested in working together? Send me a message!</p>
					<input type="text" name="name" placeholder="NAME"/>
					<input type="email" name="_replyto" placeholder="EMAIL"/>
					<input type="text" name="_gotcha" className="hidden"/>
					<textarea type="text" name="message" placeholder="SEND ME A MESSAGE!"></textarea>
					<button type="submit" value="Send" className="btn">Submit</button>
				</form>
			</section>
		);
	}
});

module.exports = App;