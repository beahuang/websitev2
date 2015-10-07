var React = require('react');

var App = React.createClass({
    showLeft: function() {
        this.refs.dev.show();
    },
    showRight: function() {
        this.refs.des.show();
    },
    render: function() {
        return (
            <div>
                <Nav showLeft={this.showLeft} showRight={this.showRight}></Nav>
                <MainPanel></MainPanel>
                <Panel ref="dev" alignment="left" id="devPanel">
                    <Project hash="first-page">First Page</Project>
                    <Project hash="second-page">Second Page</Project>
                    <Project hash="third-page">Third Page</Project>
                </Panel>

                <Panel ref="des" alignment="right" id="desPanel">
                    <Project hash="first-page">First Page</Project>
                    <Project hash="second-page">Second Page</Project>
                    <Project hash="third-page">Third Page</Project>
                </Panel>
            </div>
        );
    }
});

var Nav = React.createClass({
    render: function() {
        return (
            <nav>
                <ul>
                    <li className="devbtn" onClick={this.props.showLeft}><a>Code</a></li>
                    <li className="desbtn" onClick={this.props.showRight}><a>Design</a></li>
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
    },

    hide: function() {
        this.setState({ visible: false });
    },

    render: function() {
        return (
            <div className="panel">
                <div className={(this.state.visible ? "visible " : "") + this.props.alignment + " " + this.props.id}><button className="close" onClick={this.hide}></button>{this.props.children}</div>
            </div>
        );
    }
});

var Project = React.createClass({
    navigate: function(hash) {
        window.location.hash = hash;
    },

    render: function() {
        return <div className="project" onClick={this.navigate.bind(this, this.props.hash)}>{this.props.children}</div>;
    }
});

var MainPanel = React.createClass({
    render: function(){
        return (
            <section id="mainPanel">
                <Header></Header>
                <Social></Social>
                <Form></Form>
            </section>
        );
    }
});
var Header = React.createClass({
    render: function(){
        return (
            <header>
                <h1>Beatrice Huang</h1>
                <div className="logoContainer">
                    <h3>Developer</h3>
                    <span className="logo"><img src="dist/images/me.png"/></span>
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