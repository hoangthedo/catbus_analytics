import I18n from 'i18n!analysis_report.components'
import React from 'react'
import {View} from '@instructure/ui-layout'
import PropTypes from 'prop-types'

export default class SubAccountTable extends React.Component {
    static propTypes = {
        sub_accounts: PropTypes.arrayOf(PropTypes.object)
    }

    renderHeadTable = () => {
        return (
            <thead>
                <tr>
                    <th style={centerAlign}>{I18n.t('sub_account_table.id', "Account ID")}</th>
                    <th>{I18n.t('sub_account_table.name', 'Name')}</th>
                    <th>{I18n.t('sub_account_table.admin', 'Admin')}</th>
                    <th style={centerAlign}>{I18n.t('sub_account_table.admins', 'Admins')}</th>
                    <th style={centerAlign}>{I18n.t('sub_account_table.courses', 'Courses')}</th>
                </tr>
            </thead>
        )
    }

    renderBodyTable = () => {
        return (
            <tbody>
                {this.props.sub_accounts.map((account) => {
                    return this.renderRowTable(account)
                })}
            </tbody>
        )
    }

    renderRowTable = (account) => {
        return (
            <tr>
                <td style={centerAlign}>{account.id}</td>
                <td>{account.name}</td>
                <td>{account.users[0]}</td>
                <td style={centerAlign}>{account.users.length}</td>
                <td style={centerAlign}>{account.courses.length}</td>
            </tr>
        )
    }

    render() {
        return (
            <View margin="0 large">
                <div style={reponsive}>
                    <h3 style={title}>{I18n.t('sub_account_table.sub_account_list', 'Sub Accounts')}</h3>
                    {this.props.sub_accounts.length > 0 ?
                        <table
                        className="ic-Table ic-Table--striped"
                        >
                            {this.renderHeadTable()} 
                            {this.renderBodyTable()}
                        </table>
                    : <div style={centerAlign}>{I18n.t('sub_account_table.empty', 'Empty')}</div>
                    }
                </div>
            </View>
        )
      }
}

const centerAlign = {
    textAlign: 'center'
}

const reponsive = {
    width: '100%',
    overflowX: 'auto',
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)'
}

const title = {
    margin: '10px 30px'
}

const paddingLeft = {
    paddingLeft: '50px'
}