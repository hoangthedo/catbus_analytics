import I18n from 'i18n!analysis_report.components'
import React from 'react'
import {View} from '@instructure/ui-layout'
import Pagination, {PaginationButton} from '@instructure/ui-pagination/lib/components/Pagination'
import Spinner from '@instructure/ui-elements/lib/components/Spinner'

export default class RootAccountTable extends React.Component {
    props

    state = {
        currentPage: 0,
        rootAccounts: [],
        totalPages: ENV.ANALYTICS.ROOT_ACCOUNT_PAGES,
        openLoading: false
    }

    componentDidMount() {
        this.getRootAccountsList(1)
    }

    getRootAccountsList = (page) => {
        this.setState({openLoading: true})
        $.get(`/api/v1/accounts/${ENV.ANALYTICS.ACCOUNT_ID}/analytics/root_accounts`, {page: page}, (data) => {
            this.setState({
                rootAccounts: data,
                openLoading: false
            })
        })
    }

    renderHeadTable = () => {
        return (
            <thead>
                <tr>
                    <th style={centerAlign}>{I18n.t('root_account.account_id', "Account ID")}</th>
                    <th>{I18n.t('root_account.school_name', 'School Name')}</th>
                    <th>{I18n.t('root_account.email', 'Email')}</th>
                    <th>{I18n.t('root_account.domain', 'Domain')}</th>
                    <th>{I18n.t('root_account.date_created', 'Date created')}</th>
                    <th></th>
                </tr>
            </thead>
        )
    }

    renderBodyTable = () => {
        return (
            <tbody>
                {this.state.rootAccounts.map((account) => {
                    return this.renderRowTable(account)
                })}
            </tbody>
        )
    }

    renderRowTable = (account) => {
        return (
            <tr>
                <td style={centerAlign}>{account.id}</td>
                <td style={nowrap}>{account.name}</td>
                <td>{account.email.map((email) => {return(<div>{email}</div>)})}</td>
                <td style={nowrap}>{account.domain.map((domain) => {return(<div>{domain}</div>)})}</td>
                <td style={nowrap}>{account.created_at}</td>
                <td><a style={styleA}>{I18n.t('root_account.detail', 'Detail')}</a></td>
            </tr>
        )
    }

    renderPagination = () => {
        return (
            <Pagination 
                variant="compact" 
                labelNext={I18n.t('root_account.next', 'Next')}
                labelPrev={I18n.t('root_account.previous', 'Previous')} 
            >
                {Array.from(Array(this.state.totalPages)).map((v, i) => (
                    <PaginationButton onClick={this.setPage.bind(this, i)} key={i + 1} current={this.state.currentPage === i}>
                    {i + 1}
                    </PaginationButton>
                ))}
            </Pagination>
        )
    }

    setPage (page) {
        this.getRootAccountsList(page + 1)
        this.setState({ currentPage: page })
    }

    render() {
        return (
            <View margin="0 large">
                <h3>{I18n.t('root_account.account_list', 'Accounts list')}</h3>
                {this.state.openLoading ? 
                    <div style={{textAlign: 'center'}}><Spinner title={I18n.t('root_account.loading', 'Loading')} /></div> 
                : (
                    <div>
                        <div style={reponsive}>
                            <table
                                className="ic-Table ic-Table--striped"
                            >
                                {this.renderHeadTable()}
                                {this.renderBodyTable()}
                            </table>
                        </div>
                        <div style={{margin: '0.75rem'}}>
                            {this.renderPagination()}
                        </div>
                    </div>
                )}
            </View>
        )
      }
}

const styleA = {
    textDecoration: 'none', 
    cursor: 'pointer'
}

const centerAlign = {
    textAlign: 'center'
}

const reponsive = {
    width: '100%',
    overflowX: 'auto'
}

const nowrap = {
    whiteSpace: 'nowrap'
}