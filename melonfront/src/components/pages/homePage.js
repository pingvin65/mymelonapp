import React from 'react';
import { Redirect } from 'react-router-dom';

import API from '../../api/api';

import { AppContext } from '../../appContext';
import Status from '../error/messages/status';
import Contacts from './content/contacts';
import MelonPagation from './helper/pagination';

class HomePage extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            melondata: localStorage.getItem('melondata'),
            isLogin: false,
            loginError: false,
            contacts: '',
            conres: '',
            status: '',
            pagination: null,
            setOffset: null,
            setLimit: null

        }
        this.getAllData = this.getAllData.bind(this);
        this.getDataonClikPagination = this.getDataonClikPagination.bind(this);
    }


    getAllData() {
        const offset = (this.state.setOffset === null) ? '' : 'offset='+ this.state.setOffset;
        const limit = (this.state.setLimit === null) ? '' : 'limit='+ this.state.setLimit; 
        let parametars = '';
        if(offset === '' && limit === ''){
            parametars = '';
        }
        else if(offset !== '' && limit !== ''){
            parametars = '?' + limit + '&' + offset;
        } else{
            parametars = '?' + limit  +  offset;
        }
         
        API.get(`contacts/${parametars}`, { headers: { Authorization: `Token ${this.state.melondata}` } })
            .then(res => {
                const data = res.data;
                this.setState({
                    isLogin: true, 
                    contacts: data.results, 
                    status: res.status, 
                    pagination: {
                        count: data.count,
                        pages: data.pages,
                        offset: data.offset,
                        limit: data.limit,
                        first: data.first,
                        last: data.last,
                        previous: data.previous,
                        next: data.next,
                    },
                    setOffset: null,
                    setLimit: null
                });
            }).catch(error => {
                console.log(error);
                this.setState({ 
                    contacts: '', 
                    conres: '', 
                    loginError: true, 
                    status: error.toString(),
                    setOffset: null,
                    setLimit: null
                });
            });
    }


    componentDidMount() {
        if(this.props.isLogin){
            this.getAllData();
        }
    }

    getDataonClikPagination(setLimit=null, setOffset=null){
        if(setLimit !== null || setOffset !== null){
            this.setState({
                setLimit: setLimit,
                setOffset: setOffset
            },
            this.getAllData
            )
        }

    }

    render() {
   console.log(this.state.isLogin);
   
        
        if (this.props.isLogin === false) {
            return <Redirect to={{pathname:'/login', state:{ message: "You need to log in"}}} />;
        }
        return (
            <div>
                <h2>Contacts</h2>
                <Status status={this.state.status} page={'home'}/>
                <MelonPagation dataPagation={this.state.pagination} trigerGetData={this.getDataonClikPagination}/>
                <Contacts contacts={this.state.contacts} />
                <MelonPagation dataPagation={this.state.pagination} trigerGetData={this.getDataonClikPagination}/>
            </div>
        )
    }
}
export default HomePage;
