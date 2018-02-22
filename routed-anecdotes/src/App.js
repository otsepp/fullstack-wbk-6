import React from 'react'
import {ListGroup, ListGroupItem, Grid, Row, Col, Nav, Navbar, NavItem, Header, Brand, Alert} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

const Menu = ({anecdotes, addNew}) => {
	const style = {
		backgroundColor: 'AliceBlue',
		border: 'hidden',
		borderRadius: 5
	}
	return (
		<Router>
			<div>
				<Navbar style={style}>
					<Navbar.Header>
						<Navbar.Brand>Menu</Navbar.Brand>
					</Navbar.Header>
					<Nav>
						<NavItem><Link to="/">anecdotes</Link>&nbsp;</NavItem>
						<NavItem><Link to="/create">create new</Link>&nbsp;</NavItem>
						<NavItem><Link to="/about">about</Link>&nbsp;</NavItem>
					</Nav>
				</Navbar>
				
				<div>
					<Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
					<Route exact path="/anecdotes/:id" render={({match}) =>
						<Anecdote anecdote={anecdotes.find(a => a.id === match.params.id)}/>
					} />
					<Route exact path="/create" render={() => 
						<CreateNew addNew={addNew} />
						
					} />
					<Route exact path="/about" render={() => <About />} />
				</div>
			</div>
		</Router>
	)
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
		<ListGroup>
			{anecdotes.map(anecdote => 
				<ListGroupItem key={anecdote.id} >
					<Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
				</ListGroupItem>
			)}
		</ListGroup>
  </div>
)

const Anecdote = ({anecdote}) => {
	return (
		<div>
			<h3>{anecdote.content}</h3>
			<h4>{`by ${anecdote.author}`}</h4>
			<p>Votes: {anecdote.votes}</p>
		</div>
	)
}

const About = () => (
  <Grid className="show-grid">
		<Row>
			<h2>About anecdote app</h2>
    </Row>
		
		<Row className="show-grid">
			<Col xs={6} md={4}>
				<p>According to Wikipedia:</p>
			
				<em>
					An anecdote is a brief, revealing account of an individual person or an incident. 
					Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
					such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
					An anecdote is "a story with a point."
				</em>
			</Col>
			<Col xs={6} md={4}>
				<img src="https://martinfowler.com/img/mf-cologne.jpg" alt="Martin Fowler" />
			</Col>
		</Row>
			
		<Row className="show-grid">
			<p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
		</Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
			redirect: false
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
		
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
		
		this.setState({redirect: true})
  }

  render() {
		if (this.state.redirect) {
			return (
				<Redirect to="/" />
			)
		}
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button className="btn btn-primary">create</button>
        </form>
      </div>  
    )

  }
}

const Notification = ({notification}) => {
	const style = {
		borderStyle: 'solid',
		borderRadius: 5,
		color: 'green',
		padding: 6
	}
	
	if (notification === '') {
		return (
			<div></div>
		)
	}
		
	return (
		<Alert style={style} bsStyle="success">
			{notification}
		</Alert>
	)
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
			anecdotes: this.state.anecdotes.concat(anecdote),
			notification: 'Newanecdote addded!'
		})
		setTimeout(() => {
			this.setState({notification: ''})
		}, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
					<Notification notification={this.state.notification} />
					<Menu anecdotes={this.state.anecdotes} addNew={this.addNew}/>
					<Footer />
			</div>
    );
  }
}

export default App;
