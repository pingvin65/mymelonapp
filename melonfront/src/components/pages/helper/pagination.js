import React from 'react';
import { Pagination } from 'react-bootstrap';
import { getParams } from './helpers';
class MelonPagation extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            count: null,
            pages: null,
            offset: null,
            limit: null,
            first: null,
            last: null,
            previous: null,
            next: null,
        }
        this.pagation = this.pagation.bind(this);
        this.onCliickPagation = this.onCliickPagation.bind(this);
        this.onClickFirstPrevNextLast = this.onClickFirstPrevNextLast.bind(this);
        this.schemaPagation = this.schemaPagation.bind(this);
    }

    onCliickPagation(limit, offset, active) {
        if (active) {
            this.props.trigerGetData(limit, offset)
        }
    }
    onClickFirstPrevNextLast(url) {
        const params = getParams(url);
        if (params !== null) {
            this.props.trigerGetData(params.limit, params.offset)
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.dataPagation) !== JSON.stringify(this.props.dataPagation)) {
            this.setState(this.props.dataPagation);
        }
    }
    schemaPagation(active, pages) {
        const spages = 3;
        const exspages = 2;
        let lpage = pages - active - spages;
        let fpage = active - spages;
        let start, end, midstrat, midend = 0;
        let itemlist = []
        if (pages >= 15) {
            if (pages - active >= 2 * spages && active - spages > spages) {
                start = active - spages;
                end = active + spages;
                (start % 2 === 0) ? midstrat = Math.floor(start / 2) : midstrat = Math.floor(start / 2) + 1;
                ((pages - end) % 2 === 0) ? midend = Math.floor(end + (pages - end) / 2) : midend = Math.floor(end + (pages - end) / 2) + 1;
            } else if (active - spages > spages) {
                start = fpage + lpage - exspages + 1;
                end = pages;
                (start % 2 === 0) ? midstrat = Math.floor(start / 2) : midstrat = Math.floor(start / 2) + 1;
                midend = 0
            } else {
                start = 1;
                end = active + spages - fpage + exspages;
                midstrat = 0;
                ((pages - end) % 2 === 0) ? midend = Math.floor(end + (pages - end) / 2) : midend = Math.floor(end + (pages - end) / 2) + 1;
            }
            if (midstrat !== 0) itemlist.push({ name: 'ellipsis', number: midstrat });
            for (let i = start; i <= end; i++) {
                itemlist.push({ name: 'item', number: i });
            }
            if (midend !== 0) itemlist.push({ name: 'ellipsis', number: midend });
        } else {
            for (let i = 1; i <= pages; i++) {
                itemlist.push({ name: 'item', number: i });
            }
        }
        return itemlist;
    }

    pagation() {
        let itemslist = []
        if (this.state.count > 1) {
            let active = 1;
            if (this.state.offset % this.state.limit > 0) {
                active = Math.floor(this.state.offset / this.state.limit) + 2;
            } else {
                active = Math.floor(this.state.offset / this.state.limit) + 1;
            }
            const start = this.state.offset % this.state.limit;
            let items = [];
            items.push(<Pagination.First key={'f0'}
                disabled={(this.state.first === null) ? true : false}
                onClick={() => this.onClickFirstPrevNextLast(this.state.first)}
            />);
            items.push(<Pagination.Prev key={'p0'}
                disabled={(this.state.previous === null) ? true : false}
                onClick={() => this.onClickFirstPrevNextLast(this.state.previous)}
            />);
            itemslist = this.schemaPagation(active, this.state.pages);

            for (let i = 0; i < itemslist.length; i++) {
                let number = itemslist[i].number;
                let name = itemslist[i].name;
                if (name === 'item') {
                    items.push(
                        <Pagination.Item key={number} active={number === active} className="pag-ellipsis"
                            onClick={() => this.onCliickPagation(this.state.limit,
                                start + (number - 1) * this.state.limit,
                                (active === number) ? false : true)}>
                            {number}
                        </Pagination.Item>,
                    );
                } else {
                    items.push(
                        <Pagination.Ellipsis key={number} className="pag-ellipsis"
                            onClick={() => this.onCliickPagation(this.state.limit,
                                start + (number - 1) * this.state.limit,
                                (active === number) ? false : true)} />
                    );
                }
            }
            items.push(<Pagination.Next key={'n0'}
                disabled={(this.state.next === null) ? true : false}
                onClick={() => this.onClickFirstPrevNextLast(this.state.next)}
            />);
            items.push(<Pagination.Last key={'l0'}
                disabled={(this.state.last === null) ? true : false}
                onClick={() => this.onClickFirstPrevNextLast(this.state.last)}
            />);
            return items;
        }
        return null
    }

    render() {

        return (
            <div className="pagination-scroll container2">
                <Pagination className="d-flex justify-content-center"><this.pagation /></Pagination>
            </div>
        );
    }
}
export default MelonPagation;