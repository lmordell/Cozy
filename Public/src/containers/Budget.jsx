import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PieChart from 'react-simple-pie-chart'
import { getUsers } from '../actions/actions_users'
import { getBills } from '../actions/actions_billing'
import { Link } from 'react-router'
import Navbar from '../components/Navbar'

class Budget extends Component{
	constructor(props){
		super(props)
	}

	componentWillMount(){
		this.props.getUsers(sessionStorage.getItem('house_id'))
		this.props.getBills(sessionStorage.getItem('house_id'))
	}
	render () {
		let total = 0
		let userPercent = sessionStorage.getItem('pay_percentage')
		let devisor = userPercent ? 100 / userPercent : 0
		//PieChart logic
		let array = []
		for (let key in this.props.users){
			array.push(this.props.users[key])
		}
		let test = array.map(item => {
			if(item.pay_percentage)return {color: 'cadetblue', value: parseInt(item.pay_percentage)}
		})

		const colors = ['#540D6E', '#EE4266', '#FFD23F', '#3BCEAC', '#0EAD69', '#3FA7D6', '#EE6352', '#FAC05E', '#59CD90', '#F79D84']
		test.forEach((item, index) => test[index].color = colors[index] || 'cadetblue')

		return (
      <div>
			<Navbar />
			<div style={{height: '500px', width: '500px', position: 'absolute', right: '0px', padding: '10px' }}>
			<PieChart
			slices={test}

			/>
			</div>
			<h2>House Budget</h2>
			<h3>percentages</h3>
			{sessionStorage.getItem('admin') === 'true' ? <Link to='/updatePercentage'><button>edit percentages</button></Link> : null}
			{(() => {
				let array = []
				for (let key in this.props.users){
					array.push(this.props.users[key])
				}
				return array
			})().map((item, index) => <div key={item.user_name}><span style={{color: test[index].color}}>&#9679;</span>{` ${item.user_name} : ${item.pay_percentage}%`}</div>)
			}
			<br />
      <h3>bill breakdown</h3>
			{sessionStorage.getItem('admin') === 'true' ? <Link to='/updateBills'><button>edit bills</button></Link> : null}
			{(() => {
				let array = []
				for (let key in this.props.bills){
					array.push(this.props.bills[key])
				}
				return array
			})().map(bill => {
				total += parseInt(bill.amount_due_in_cents)
				return	<div key={bill.id}>{`${bill.bill_name} Amount : ${bill.amount_due_in_cents / 100}`}</div>
			})
			}

      <h3>Your Monthly Total</h3>
			<div>Total: $ {(total / 100) / devisor}
			</div>
      </div>
    )
	}
}

function mapStateToProps({users, bills}){
	return {users, bills}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({getUsers, getBills}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Budget)
